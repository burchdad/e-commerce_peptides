'use client';
'use client';

import { useState } from 'react';

const STORAGE_KEY = 'pv-age-gate-v2';
const EXPIRY_DAYS = 30;
const MIN_AGE = 18;

const isVerified = (): boolean => {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const { expires } = JSON.parse(raw) as { expires: number };
    return Date.now() < expires;
  } catch {
    return false;
  }
};

const storeVerification = () => {
  const expires = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ verified: true, expires }));
};

const calculateAge = (dob: string): number => {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

export const AgeGateModal = () => {
  const [open, setOpen] = useState(() => !isVerified());
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!dob) {
      setError('Please enter your date of birth.');
      return;
    }
    const age = calculateAge(dob);
    if (isNaN(age) || age < 0) {
      setError('Please enter a valid date of birth.');
      return;
    }
    if (age < MIN_AGE) {
      setError(`You must be at least ${MIN_AGE} years old to access this site.`);
      return;
    }
    storeVerification();
    setOpen(false);
  };

  const exit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className="w-full max-w-md rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-8 shadow-2xl"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">Age Verification Required</p>
        <h2 id="age-gate-title" className="mt-3 font-serif text-3xl text-[var(--color-ivory)]">
          Confirm Your Age
        </h2>
        <p className="mt-4 text-sm text-[var(--color-sand)]">
          This site is restricted to individuals {MIN_AGE} years of age or older. All products are
          intended for research purposes only.
        </p>

        <div className="mt-6">
          <label htmlFor="dob" className="block text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => { setDob(e.target.value); setError(''); }}
            max={new Date().toISOString().split('T')[0]}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.35)] px-4 py-3 text-sm text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)] [color-scheme:dark]"
          />
          {error && (
            <p role="alert" className="mt-2 text-xs text-red-400">{error}</p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleContinue}
            className="flex-1 rounded-full bg-[var(--color-gold)] px-5 py-3 text-xs uppercase tracking-[0.15em] text-[var(--color-ink)] transition hover:brightness-110"
          >
            Continue
          </button>
          <button
            onClick={exit}
            className="flex-1 rounded-full border border-[var(--color-border)] px-5 py-3 text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            Exit Site
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] text-[var(--color-muted)]">
          Verification is stored locally for {EXPIRY_DAYS} days.
        </p>
      </div>
    </div>
  );
};
