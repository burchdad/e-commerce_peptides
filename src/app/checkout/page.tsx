import { CheckoutForm } from '@/components/forms/checkout-form';

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Checkout / Order Request</h1>
      <p className="max-w-2xl text-[var(--color-sand)]">Submit your order request with required legal acknowledgements. Payment instructions follow admin review.</p>
      <CheckoutForm />
    </div>
  );
}
