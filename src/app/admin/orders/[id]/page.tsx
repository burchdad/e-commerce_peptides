import Link from 'next/link';
import { redirect } from 'next/navigation';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { getOrderRequestRecord } from '@/lib/services/order-requests';
import { currency } from '@/lib/utils/format';

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
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-serif text-2xl text-[var(--color-text)]">Customer Info</h2>
          <dl className="mt-4 grid gap-3 text-sm text-[var(--color-text)]">
            <Detail label="Name" value={order.customerName} />
            <Detail label="Email" value={order.email} />
            <Detail label="Phone" value={order.phone} />
            <Detail label="Address" value={`${order.shippingAddress}, ${order.city}, ${order.state} ${order.postalCode}, ${order.country}`} />
            <Detail label="Payment Preference" value={order.paymentMethodLabel} />
          </dl>
        </section>

        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-serif text-2xl text-[var(--color-text)]">Acknowledgements</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-text)]">
            <li>Information accurate: {order.acknowledgements.informationAccurate ? 'Yes' : 'No'}</li>
            <li>Terms accepted: {order.acknowledgements.termsAccepted ? 'Yes' : 'No'}</li>
            <li>Verification accepted: {order.acknowledgements.verificationAccepted ? 'Yes' : 'No'}</li>
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-serif text-2xl text-[var(--color-text)]">Items Ordered</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
              <tr>
                <th className="py-2 pr-3">Item</th>
                <th className="py-2 pr-3">Qty</th>
                <th className="py-2 pr-3">Unit</th>
                <th className="py-2 pr-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={`${item.productName}-${item.sku ?? 'item'}`} className="border-t border-[var(--color-border)]">
                  <td className="py-2 pr-3">{item.productName}</td>
                  <td className="py-2 pr-3">{item.quantity}</td>
                  <td className="py-2 pr-3">{currency(item.unitPrice)}</td>
                  <td className="py-2 pr-3">{currency(item.unitPrice * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-serif text-2xl text-[var(--color-text)]">Order Timeline</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-text)]">
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
    <dt className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">{label}</dt>
    <dd className="mt-1">{value}</dd>
  </div>
);

const TimelineItem = ({ label, value }: { label: string; value?: string }) => (
  <li className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-2 last:border-b-0">
    <span className="text-[var(--color-muted)]">{label}</span>
    <span>{value ? new Date(value).toLocaleString() : '—'}</span>
  </li>
);