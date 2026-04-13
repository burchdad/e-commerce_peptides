'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export const AdminLoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') || '');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError('Invalid admin credentials.');
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <form className="space-y-4 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6" onSubmit={onSubmit}>
      <input className="input" name="password" placeholder="Admin Password" type="password" required />
      <button className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)] disabled:opacity-60" disabled={loading} type="submit">
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
};
