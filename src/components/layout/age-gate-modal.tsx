'use client';

import { useState } from 'react';

const STORAGE_KEY = 'noir-axis-age-gate-v1';

export const AgeGateModal = () => {
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem(STORAGE_KEY);
  });

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setOpen(false);
  };

  const exit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 px-4">
      <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">Entry Confirmation</p>
        <h2 className="mt-3 font-serif text-3xl text-[var(--color-ivory)]">Research Access Required</h2>
        <p className="mt-4 text-sm text-[var(--color-sand)]">
          By entering this site, you confirm that you are at least 21 years of age and understand that all products sold are intended for research purposes only.
        </p>
        <p className="mt-2 text-sm text-[var(--color-sand)]">You also acknowledge and accept the site disclaimer terms.</p>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full bg-[var(--color-gold)] px-5 py-3 text-xs uppercase tracking-[0.15em] text-[var(--color-ink)]" onClick={accept}>I Agree and Enter</button>
          <button className="flex-1 rounded-full border border-[var(--color-gold)] px-5 py-3 text-xs uppercase tracking-[0.15em] text-[var(--color-gold)]" onClick={exit}>Exit Site</button>
        </div>
      </div>
    </div>
  );
};
