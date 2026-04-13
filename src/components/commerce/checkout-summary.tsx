import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const CheckoutSummary = ({ items }: { items: Array<{ product: Product; quantity: number }> }) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const includesKit = items.some((item) => item.product.includesComplimentaryKit);

  return (
    <aside className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
      <h3 className="font-serif text-2xl text-[var(--color-ivory)]">Order Summary</h3>
      <ul className="mt-4 space-y-3 text-sm text-[var(--color-sand)]">
        {items.map((item) => (
          <li key={item.product.id} className="flex justify-between gap-3">
            <span>{item.product.name} × {item.quantity}</span>
            <span>{currency(item.product.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-[var(--color-gold-soft)] pt-4">
        <p className="flex justify-between text-[var(--color-ivory)]"><span>Subtotal</span><strong>{currency(subtotal)}</strong></p>
      </div>
      {includesKit ? (
        <p className="mt-4 rounded-lg border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-3 text-xs uppercase tracking-[0.12em] text-[var(--color-gold)]">
          Complimentary research kit included with peptide purchase.
        </p>
      ) : null}
    </aside>
  );
};
