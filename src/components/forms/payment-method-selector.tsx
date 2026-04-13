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
    <div className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
      <h3 className="font-serif text-2xl text-[var(--color-ivory)]">Payment Method</h3>
      <p className="mt-2 text-sm text-[var(--color-sand)]">Methods are config-driven and can be enabled or disabled by admin settings.</p>
      <div className="mt-4 space-y-3">
        {methods.map((method) => (
          <label key={method.id} className={`block rounded-xl border p-4 ${method.enabled ? 'border-[var(--color-gold-soft)]' : 'border-zinc-700 opacity-50'}`}>
            <input
              checked={selected === method.id}
              className="mr-3"
              disabled={!method.enabled}
              name="paymentMethod"
              onChange={() => onSelect(method.id)}
              type="radio"
              value={method.id}
            />
            <span className="font-medium text-[var(--color-ivory)]">{method.label}</span>
            <p className="mt-1 text-xs text-[var(--color-sand)]">{method.description}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
