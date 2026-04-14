import type { PaymentMethod } from '@/lib/types';

export const PaymentMethodSelector = ({
  methods,
  selected,
  onSelect,
}: {
  methods: PaymentMethod[];
  selected: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="premium-surface-soft rounded-[1.4rem] p-6">
      <h3 className="font-serif text-2xl text-[var(--color-text)]">Payment Preference</h3>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Select how you would prefer to receive payment instructions after order review.</p>
      <div className="mt-4 space-y-3">
        {methods.map((method) => (
          <label key={method.id} className={`block rounded-xl border p-4 transition ${method.enabled ? 'border-[var(--color-border)] bg-[var(--color-bg-soft)] hover:border-[var(--color-gold)]' : 'border-[var(--color-border)] opacity-50'}`}>
            <input
              checked={selected === method.id}
              className="mr-3 accent-[var(--color-gold)]"
              disabled={!method.enabled}
              name="paymentMethod"
              onChange={() => onSelect(method.id)}
              type="radio"
              value={method.id}
            />
            <span className="font-medium text-[var(--color-text)]">{method.label}</span>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{method.description}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
