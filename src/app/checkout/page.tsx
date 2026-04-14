import { CheckoutForm } from '@/components/forms/checkout-form';

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Order Request</h1>
      <p className="max-w-2xl text-[var(--color-muted)]">Complete the structured intake flow below to submit your order for review. Payment preference is collected for follow-up only and no payment is processed here.</p>
      <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-text)]">
        Payment instructions will be sent after order confirmation.
      </p>
      <CheckoutForm />
    </div>
  );
}
