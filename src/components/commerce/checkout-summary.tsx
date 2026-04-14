import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const CheckoutSummary = ({ items }: { items: Array<{ product: Product; quantity: number }> }) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <aside className="premium-surface-deep rounded-[1.4rem] p-6">
      <h3 className="font-serif text-2xl text-[var(--color-text)]">Order Summary</h3>
      <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
        {items.map((item) => (
          <li key={item.product.id} className="flex justify-between gap-3">
            <span>{item.product.name} × {item.quantity}</span>
            <span>{currency(item.product.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-[var(--color-border)] pt-4">
        <p className="flex justify-between text-[var(--color-text)]"><span>Subtotal</span><strong>{currency(subtotal)}</strong></p>
      </div>
      <p className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-3 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
        Orders are subject to review and confirmation.
      </p>
    </aside>
  );
};
