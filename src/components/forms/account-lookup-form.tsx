'use client';

import { useState } from 'react';

type LookupResult = {
  orderReference: string;
  status: string;
  conversionStatus: string;
  createdAt: string;
  updatedAt: string;
  paymentMethodLabel: string;
};

export const AccountLookupForm = () => {
  const [email, setEmail] = useState('');
  const [orderReference, setOrderReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/account/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderReference }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error ?? 'Lookup failed. Please try again.');
        return;
      }

      setResult(payload as LookupResult);
    } catch {
      setError('Lookup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form
        className="max-w-xl space-y-4 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6"
        onSubmit={onSubmit}
      >
        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="input"
          name="orderRef"
          placeholder="Order Reference"
          required
          value={orderReference}
          onChange={(event) => setOrderReference(event.target.value)}
        />
        <button
          className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)] disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </form>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      {result ? (
        <div className="max-w-xl rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6 text-sm text-[var(--color-sand)]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">Order Found</p>
          <p className="mt-3"><strong className="text-[var(--color-text)]">Reference:</strong> {result.orderReference}</p>
          <p className="mt-1"><strong className="text-[var(--color-text)]">Status:</strong> {result.status}</p>
          <p className="mt-1"><strong className="text-[var(--color-text)]">Payment:</strong> {result.conversionStatus}</p>
          <p className="mt-1"><strong className="text-[var(--color-text)]">Method:</strong> {result.paymentMethodLabel}</p>
          <p className="mt-1"><strong className="text-[var(--color-text)]">Created:</strong> {new Date(result.createdAt).toLocaleString()}</p>
          <p className="mt-1"><strong className="text-[var(--color-text)]">Updated:</strong> {new Date(result.updatedAt).toLocaleString()}</p>
        </div>
      ) : null}
    </div>
  );
};
