'use client';

import type { OrderAcknowledgements } from '@/lib/types';

type Props = {
  value: OrderAcknowledgements;
  onChange: (next: OrderAcknowledgements) => void;
};

export const LegalAcknowledgement = ({ value, onChange }: Props) => {
  const update = (key: keyof OrderAcknowledgements) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="premium-surface-soft rounded-[1.4rem] p-6 text-sm text-[var(--color-text)]">
      <p className="mb-4 font-serif text-2xl text-[var(--color-text)]">Required Acknowledgements</p>
      <label className="mb-4 flex gap-3 leading-6"><input className="mt-1 h-4 w-4 accent-[var(--color-gold)]" type="checkbox" checked={value.informationAccurate} onChange={() => update('informationAccurate')} /> I confirm all information provided is accurate.</label>
      <label className="mb-4 flex gap-3 leading-6"><input className="mt-1 h-4 w-4 accent-[var(--color-gold)]" type="checkbox" checked={value.termsAccepted} onChange={() => update('termsAccepted')} /> I agree to the terms and conditions.</label>
      <label className="flex gap-3 leading-6"><input className="mt-1 h-4 w-4 accent-[var(--color-gold)]" type="checkbox" checked={value.verificationAccepted} onChange={() => update('verificationAccepted')} /> I understand this order may require verification.</label>
    </div>
  );
};
