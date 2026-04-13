'use client';

type Props = {
  value: {
    age21Plus: boolean;
    researchUseOnly: boolean;
    noMedicalRelationship: boolean;
    termsAccepted: boolean;
  };
  onChange: (next: Props['value']) => void;
};

export const LegalAcknowledgement = ({ value, onChange }: Props) => {
  const update = (key: keyof Props['value']) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5 text-sm text-[var(--color-sand)]">
      <p className="mb-4 font-serif text-xl text-[var(--color-ivory)]">Required Acknowledgements</p>
      <label className="mb-3 flex gap-2"><input type="checkbox" checked={value.age21Plus} onChange={() => update('age21Plus')} /> I confirm I am at least 21 years old.</label>
      <label className="mb-3 flex gap-2"><input type="checkbox" checked={value.researchUseOnly} onChange={() => update('researchUseOnly')} /> I understand all products are for research-use purposes only.</label>
      <label className="mb-3 flex gap-2"><input type="checkbox" checked={value.noMedicalRelationship} onChange={() => update('noMedicalRelationship')} /> I understand this business does not provide medical or pharmacy services.</label>
      <label className="flex gap-2"><input type="checkbox" checked={value.termsAccepted} onChange={() => update('termsAccepted')} /> I accept the Terms & Conditions and Research Disclaimer.</label>
    </div>
  );
};
