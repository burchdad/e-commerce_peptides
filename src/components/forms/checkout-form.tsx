'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';

import { CheckoutSummary } from '@/components/commerce/checkout-summary';
import { LegalAcknowledgement } from '@/components/forms/legal-acknowledgement';
import { PaymentMethodSelector } from '@/components/forms/payment-method-selector';
import { useCart } from '@/context/cart-context';
import { paymentMethods, products } from '@/lib/data/site';

const defaultAcknowledgements = {
  age21Plus: false,
  researchUseOnly: false,
  noMedicalRelationship: false,
  termsAccepted: false,
};

export const CheckoutForm = () => {
  const router = useRouter();
  const { resolveItems, clearCart } = useCart();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(
    paymentMethods.find((method) => method.enabled)?.id ?? '',
  );
  const [acknowledgements, setAcknowledgements] = useState(defaultAcknowledgements);

  const resolved = useMemo(() => resolveItems(products), [resolveItems]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (resolved.length === 0) {
      setMessage('Your cart is empty.');
      return;
    }
    if (!Object.values(acknowledgements).every(Boolean)) {
      setMessage('Please complete required acknowledgements.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    const form = Object.fromEntries(new FormData(event.currentTarget).entries());

    const response = await fetch('/api/order-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        paymentMethodId: selectedMethod,
        acknowledgements,
        items: resolved.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          sku: item.product.sku,
          unitPrice: item.product.price,
          quantity: item.quantity,
        })),
      }),
    });

    setSubmitting(false);

    if (!response.ok) {
      setMessage('Order request failed. Please review your information.');
      return;
    }

    clearCart();
    router.push('/order-confirmation');
  };

  if (resolved.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-8 text-center">
        <p className="text-[var(--color-sand)]">Your cart is currently empty.</p>
        <Link className="mt-4 inline-block rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" href="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" name="customerName" placeholder="Full Name" required />
          <input className="input" name="email" placeholder="Email" required type="email" />
          <input className="input" name="phone" placeholder="Phone" required />
          <input className="input" name="country" placeholder="Country" defaultValue="United States" required />
        </div>
        <textarea className="input min-h-24" name="shippingAddress" placeholder="Shipping Address" required />
        <div className="grid gap-4 md:grid-cols-3">
          <input className="input" name="city" placeholder="City" required />
          <input className="input" name="state" placeholder="State" required />
          <input className="input" name="postalCode" placeholder="Postal Code" required />
        </div>
        <textarea className="input min-h-20" name="notes" placeholder="Order Notes (optional)" />
        <PaymentMethodSelector methods={paymentMethods} selected={selectedMethod} onSelect={setSelectedMethod} />
        <LegalAcknowledgement value={acknowledgements} onChange={setAcknowledgements} />
        <button className="rounded-full bg-[var(--color-gold)] px-8 py-3 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)] disabled:opacity-60" disabled={submitting} type="submit">
          {submitting ? 'Submitting...' : 'Submit Order Request'}
        </button>
        {message ? <p className="text-sm text-[var(--color-sand)]">{message}</p> : null}
      </form>
      <CheckoutSummary items={resolved} />
    </div>
  );
};
