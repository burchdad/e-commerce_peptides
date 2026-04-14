import Link from 'next/link';

import { getOrderRequestRecord } from '@/lib/services/order-requests';
import { currency } from '@/lib/utils/format';

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderReference } = await searchParams;
  const order = orderReference ? await getOrderRequestRecord(orderReference) : null;

  return (
    <div className="rounded-[1.8rem] border border-[var(--color-border)] bg-white p-8 shadow-[0_16px_40px_rgba(17,17,17,0.08)] md:p-10">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]">Order Request Received</p>
      <h1 className="mt-3 font-serif text-4xl text-[var(--color-text)] md:text-5xl">Thank You</h1>
      <p className="mt-4 max-w-2xl text-[var(--color-muted)]">Your order request has been received. Further instructions will be provided after review.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Order ID</p>
          <p className="mt-2 font-serif text-3xl text-[var(--color-text)]">{order?.orderReference ?? orderReference ?? 'Pending'}</p>
          {order ? <p className="mt-4 text-sm text-[var(--color-muted)]">Preferred payment follow-up: {order.paymentMethodLabel}</p> : null}
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-serif text-2xl text-[var(--color-text)]">Items</h2>
          {order ? (
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              {order.items.map((item) => (
                <li key={`${item.productName}-${item.sku ?? 'item'}`} className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-3 last:border-b-0 last:pb-0">
                  <span>{item.productName} × {item.quantity}</span>
                  <strong className="text-[var(--color-text)]">{currency(item.unitPrice * item.quantity)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-[var(--color-muted)]">Order details are still being prepared for display.</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" href="/shop">Continue Shopping</Link>
        <Link className="btn-secondary" href="/account">Order Lookup</Link>
      </div>
    </div>
  );
}
