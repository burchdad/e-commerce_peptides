'use client';

import { useState } from 'react';

import { businessConfig } from '@/lib/config/business-config';
import type { ConversionStatus, StoredOrderRequest } from '@/lib/types';

const statusActions = [
  { label: 'Mark Approved', status: 'approved' },
  { label: 'Mark Completed', status: 'completed' },
  { label: 'Cancel Order', status: 'cancelled' },
] as const;

export const AdminOrderActions = ({ order }: { order: StoredOrderRequest }) => {
  const [paymentInstructions, setPaymentInstructions] = useState(order.paymentInstructions ?? '');
  const [paymentLink, setPaymentLink] = useState(order.paymentLink ?? '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const updateStatus = async (
    status: 'pending' | 'reviewing' | 'approved' | 'payment-sent' | 'completed' | 'cancelled',
    conversionStatus?: ConversionStatus,
  ) => {
    setLoading(true);
    setMessage('');

    const response = await fetch(`/api/admin/orders/${encodeURIComponent(order.orderReference)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, conversionStatus, paymentInstructions, paymentLink }),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: 'Update failed.' }));
      setMessage(payload.error || 'Update failed.');
      return;
    }

    setMessage('Order updated. Refresh to view latest timeline and conversion data.');
  };

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
      <h2 className="font-serif text-2xl text-[var(--color-text)]">Actions</h2>
      <div className="mt-4 space-y-3">
        <textarea
          className="input min-h-24"
          placeholder="Payment instructions"
          value={paymentInstructions}
          onChange={(event) => setPaymentInstructions(event.target.value)}
        />
        <input
          className="input"
          placeholder="Payment link (optional)"
          value={paymentLink}
          onChange={(event) => setPaymentLink(event.target.value)}
        />
      </div>

      <div className="mt-4 grid gap-2">
        {businessConfig.enableManualPayments ? (
          <button
            className="btn-primary justify-start"
            disabled={loading}
            onClick={() => updateStatus('payment-sent')}
            type="button"
          >
            Send Payment Instructions
          </button>
        ) : null}

        <button
          className="btn-secondary justify-start"
          disabled={loading || order.conversionStatus === 'paid'}
          onClick={() => updateStatus(order.status, 'paid')}
          type="button"
        >
          {order.conversionStatus === 'paid' ? 'Payment Recorded' : 'Mark as Paid'}
        </button>

        {statusActions.map((action) => (
          <button
            key={action.status}
            className="btn-secondary justify-start"
            disabled={loading}
            onClick={() => updateStatus(action.status)}
            type="button"
          >
            {action.label}
          </button>
        ))}
      </div>

      {message ? <p className="mt-4 text-sm text-[var(--color-muted)]">{message}</p> : null}
    </section>
  );
};