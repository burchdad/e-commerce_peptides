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
    <div className="premium-surface-deep rounded-[1.8rem] p-8 md:p-10">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg text-emerald-600">✓</span>
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]">Order Request Received</p>
      </div>
      <h1 className="mt-3 font-serif text-4xl text-[var(--color-text)] md:text-5xl">You&apos;re all set.</h1>
      <p className="mt-4 max-w-2xl text-[var(--color-muted)]">Your order has been received. Check your email — we&apos;ll send you full payment instructions and guide you through every step.</p>

      <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.22)] p-6">
        <h2 className="font-serif text-xl text-[var(--color-text)]">What happens next</h2>
        <ol className="mt-5 space-y-5">
          {[
            { step: '01', heading: 'Order confirmed', body: 'We have your order details and are reviewing your request now.' },
            { step: '02', heading: 'Check your email', body: 'Payment instructions will be sent to your inbox — usually within a few hours.' },
            { step: '03', heading: 'Complete payment', body: 'Follow the secure instructions to send payment via your chosen method.' },
            { step: '04', heading: 'Your order ships', body: 'Once payment is confirmed, your order is prepared and dispatched within 24–48 hours.' },
          ].map(({ step, heading, body }) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] text-xs font-bold text-white">{step}</span>
              <div>
                <p className="font-semibold text-[var(--color-text)]">{heading}</p>
                <p className="mt-0.5 text-sm text-[var(--color-muted)]">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Order ID</p>
          <p className="mt-2 font-serif text-3xl text-[var(--color-text)]">{order?.orderReference ?? orderReference ?? 'Pending'}</p>
          {order ? <p className="mt-4 text-sm text-[var(--color-muted)]">Preferred payment follow-up: {order.paymentMethodLabel}</p> : null}
        </div>

        <div className="premium-surface-soft rounded-2xl p-5">
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
