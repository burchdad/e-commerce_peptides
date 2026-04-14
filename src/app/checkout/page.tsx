import { CheckoutForm } from '@/components/forms/checkout-form';

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Order Request</h1>
      <p className="max-w-2xl text-[var(--color-muted)]">Complete the structured intake flow below to submit your order for review. Payment preference is collected for follow-up only and no payment is processed here.</p>
      <CheckoutForm />
    </div>
  );
}
