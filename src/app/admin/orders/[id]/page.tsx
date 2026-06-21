import Link from 'next/link';
import { redirect } from 'next/navigation';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { getOrderRequestRecord } from '@/lib/services/order-requests';
import { currency } from '@/lib/utils/format';
import { getOrderTotals } from '@/lib/utils/order-totals';

import { AdminOrderActions } from '@/components/admin/admin-order-actions';

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const order = await getOrderRequestRecord(id);

  if (!order) {
    return (
      <div className="space-y-4">
        <h1 className="section-title">Order Not Found</h1>
        <p className="text-[var(--color-muted)]">The requested order could not be located.</p>
        <Link className="btn-secondary" href="/admin/orders">Back to Orders</Link>
      </div>
    );
  }

  const totals = getOrderTotals(order);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="section-title">{order.orderReference}</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Status: <span className="capitalize">{order.status.replace('-', ' ')}</span></p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Conversion: <span className="capitalize">{order.conversionStatus}</span>
          </p>
          {order.needsFollowUp ? (
            <p className="mt-1 text-sm text-rose-600">
              Follow-up required{order.followUpAt ? ` since ${new Date(order.followUpAt).toLocaleString()}` : ''}.
            </p>
          ) : null}
        </div>
        <Link className="btn-secondary" href="/admin/orders">Back to Orders</Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
          <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Customer Info</h2>
          <dl className="mt-4 grid gap-3 text-sm text-[var(--color-ivory)]">
            <Detail label="Name" value={order.customerName} />
            <Detail label="Email" value={order.email} />
            <Detail label="Phone" value={order.phone} />
            <Detail label="Address" value={`${order.shippingAddress}, ${order.city}, ${order.state} ${order.postalCode}, ${order.country}`} />
            <Detail label="Shipping Method" value={order.shippingMethodLabel ?? 'Not captured'} />
            <Detail label="Payment Preference" value={order.paymentMethodLabel} />
          </dl>
        </section>

        <section className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
          <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Order Totals</h2>
          <dl className="mt-4 space-y-3 text-sm text-[var(--color-ivory)]">
            <SummaryRow label="Items Subtotal" value={currency(totals.subtotal)} />
            <SummaryRow
              label={order.discountCode ? `Discount (${order.discountCode})` : 'Discount'}
              value={totals.discountAmount > 0 ? `-${currency(totals.discountAmount)}` : currency(0)}
              valueClassName={totals.discountAmount > 0 ? 'text-green-300' : undefined}
            />
            <SummaryRow
              label={order.shippingMethodLabel ? `Shipping (${order.shippingMethodLabel})` : 'Shipping'}
              value={totals.shippingAmount > 0 ? currency(totals.shippingAmount) : 'Free / not charged'}
            />
            {totals.taxAmount > 0 ? <SummaryRow label="Sales Tax" value={currency(totals.taxAmount)} /> : null}
            <SummaryRow label="Grand Total" value={currency(totals.grandTotal)} strong />
          </dl>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
        <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Items Ordered</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-[var(--color-ivory)]">
            <thead className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
              <tr>
                <th className="py-2 pr-3">Item</th>
                <th className="py-2 pr-3">Qty</th>
                <th className="py-2 pr-3">Unit</th>
                <th className="py-2 pr-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={`${item.productName}-${item.sku ?? 'item'}`} className="border-t border-[var(--color-gold-soft)]">
                  <td className="py-2 pr-3">{item.variantName ? `${item.productName} (${item.variantName})` : item.productName}</td>
                  <td className="py-2 pr-3">{item.quantity}</td>
                  <td className="py-2 pr-3">{currency(item.unitPrice)}</td>
                  <td className="py-2 pr-3">{currency(item.unitPrice * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
        <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Acknowledgements</h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-ivory)]">
          <li>Information accurate: {order.acknowledgements.informationAccurate ? 'Yes' : 'No'}</li>
          <li>Terms accepted: {order.acknowledgements.termsAccepted ? 'Yes' : 'No'}</li>
          <li>Verification accepted: {order.acknowledgements.verificationAccepted ? 'Yes' : 'No'}</li>
          <li>Age confirmed: {order.acknowledgements.ageConfirmed ? 'Yes' : 'No'}</li>
          <li>Research disclaimer accepted: {order.acknowledgements.researchDisclaimerAccepted ? 'Yes' : 'No'}</li>
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
          <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Order Timeline</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-ivory)]">
            <TimelineItem label="Created" value={order.timeline.createdAt} />
            <TimelineItem label="Reviewed" value={order.timeline.reviewedAt} />
            <TimelineItem label="Approved" value={order.timeline.approvedAt} />
            <TimelineItem label="Payment Sent" value={order.timeline.paymentSentAt} />
            <TimelineItem label="Completed" value={order.timeline.completedAt} />
            <TimelineItem label="Cancelled" value={order.timeline.cancelledAt} />
            <TimelineItem label="Follow-up At" value={order.followUpAt} />
            <TimelineItem label="Updated" value={order.updatedAt} />
          </ul>
        </section>

        <AdminOrderActions order={order} />
      </div>
    </div>
  );
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">{label}</dt>
    <dd className="mt-1 break-words leading-relaxed text-[var(--color-ivory)]">{value}</dd>
  </div>
);

const SummaryRow = ({
  label,
  value,
  strong = false,
  valueClassName = '',
}: {
  label: string;
  value: string;
  strong?: boolean;
  valueClassName?: string;
}) => (
  <div className={`flex flex-wrap items-center justify-between gap-3 ${strong ? 'border-t border-[var(--color-gold-soft)] pt-3 text-base' : ''}`}>
    <dt className="text-[var(--color-gold)]">{label}</dt>
    <dd className={`${strong ? 'font-semibold text-[var(--color-ivory)]' : ''} ${valueClassName}`}>{value}</dd>
  </div>
);

const TimelineItem = ({ label, value }: { label: string; value?: string }) => (
  <li className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-gold-soft)] pb-2 last:border-b-0">
    <span className="text-[var(--color-gold)]">{label}</span>
    <span>{value ? new Date(value).toLocaleString() : '—'}</span>
  </li>
);
