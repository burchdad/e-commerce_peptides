import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const CheckoutSummary = ({
  items,
  pricing,
}: {
  items: Array<{ product: Product; variant: { id: string; name: string; price: number }; quantity: number }>;
  pricing: {
    subtotal: number;
    discountAmount: number;
    shippingAmount: number;
    taxAmount: number;
    total: number;
    appliedRule: { name: string } | null;
  };
}) => {
  return (
    <aside className="premium-surface-deep rounded-[1.4rem] p-6">
      <h3 className="font-serif text-2xl text-[var(--color-text)]">Order Summary</h3>
      <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
        {items.map((item) => (
          <li key={`${item.product.id}:${item.variant.id}`} className="flex justify-between gap-3">
            <span>{item.product.name} ({item.variant.name}) × {item.quantity}</span>
            <span>{currency(item.variant.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-[var(--color-border)] pt-4 space-y-1">
        <p className="flex justify-between text-[var(--color-text)]"><span>Subtotal</span><strong>{currency(pricing.subtotal)}</strong></p>
        {pricing.discountAmount > 0 ? (
          <p className="flex justify-between text-[var(--color-text)]">
            <span>Discount{pricing.appliedRule ? ` (${pricing.appliedRule.name})` : ''}</span>
            <strong className="text-green-400">-{currency(pricing.discountAmount)}</strong>
          </p>
        ) : null}
        <p className="flex justify-between text-[var(--color-text)]"><span>Shipping</span><strong>{pricing.shippingAmount > 0 ? currency(pricing.shippingAmount) : 'Free'}</strong></p>
        {pricing.taxAmount > 0 ? (
          <p className="flex justify-between text-[var(--color-text)]"><span>Sales Tax</span><strong>{currency(pricing.taxAmount)}</strong></p>
        ) : null}
        <p className="mt-2 flex justify-between border-t border-[var(--color-border)] pt-2 text-[var(--color-text)]"><span>Total</span><strong className="text-lg">{currency(pricing.total)}</strong></p>
      </div>
      <p className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-3 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
        Orders are subject to review and confirmation.
      </p>
    </aside>
  );
};
