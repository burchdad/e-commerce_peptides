'use client';

import { FormEvent, useState } from 'react';

export const ContactForm = () => {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);
    setMessage(response.ok ? 'Message sent. Our team will reply shortly.' : 'Unable to send message. Please try again.');

    if (response.ok) {
      event.currentTarget.reset();
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="input" name="name" placeholder="Name" required />
        <input className="input" name="email" placeholder="Email" required type="email" />
      </div>
      <input className="input" name="subject" placeholder="Subject" required />
      <textarea className="input min-h-32" name="message" placeholder="How can we help?" required />
      <button className="rounded-full bg-[var(--color-gold)] px-8 py-3 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)] disabled:opacity-60" disabled={submitting} type="submit">
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
      {message ? <p className="text-sm text-[var(--color-sand)]">{message}</p> : null}
    </form>
  );
};
