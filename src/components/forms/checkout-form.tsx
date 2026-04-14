'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { CheckoutSummary } from '@/components/commerce/checkout-summary';
import { LegalAcknowledgement } from '@/components/forms/legal-acknowledgement';
import { PaymentMethodSelector } from '@/components/forms/payment-method-selector';
import { useCart } from '@/context/cart-context';
import { paymentMethods, products } from '@/lib/data/site';
import type { OrderAcknowledgements } from '@/lib/types';

const defaultAcknowledgements: OrderAcknowledgements = {
  informationAccurate: false,
  termsAccepted: false,
  verificationAccepted: false,
};

const defaultFormState = {
  customerName: '',
  email: '',
  phone: '',
  shippingAddress: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
  notes: '',
};

const stepLabels = ['Customer Info', 'Address', 'Acknowledgements', 'Payment Preference', 'Review & Submit'];

export const CheckoutForm = () => {
  const router = useRouter();
  const { resolveItems, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);
  const [selectedMethod, setSelectedMethod] = useState(
    paymentMethods.find((method) => method.enabled)?.id ?? '',
  );
  const [acknowledgements, setAcknowledgements] = useState(defaultAcknowledgements);

  const resolved = useMemo(() => resolveItems(products), [resolveItems]);

  const updateField = (field: keyof typeof defaultFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const validateStep = () => {
    if (step === 0 && (!formState.customerName || !formState.email || !formState.phone)) {
      setMessage('Complete customer information before continuing.');
      return false;
    }

    if (
      step === 1 &&
      (!formState.shippingAddress || !formState.city || !formState.state || !formState.postalCode || !formState.country)
    ) {
      setMessage('Complete the shipping address before continuing.');
      return false;
    }

    if (step === 2 && !Object.values(acknowledgements).every(Boolean)) {
      setMessage('Complete all required acknowledgements before continuing.');
      return false;
    }

    if (step === 3 && !selectedMethod) {
      setMessage('Select a payment preference before continuing.');
      return false;
    }

    setMessage('');
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) {
      return;
    }

    setStep((current) => Math.min(current + 1, stepLabels.length - 1));
  };

  const previousStep = () => {
    setMessage('');
    setStep((current) => Math.max(current - 1, 0));
  };

  const onSubmit = async () => {
    if (resolved.length === 0) {
      setMessage('Your cart is empty.');
      return;
    }

    if (!validateStep()) {
      return;
    }

    setSubmitting(true);
    setMessage('');

    const response = await fetch('/api/order-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formState,
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

    const payload = await response.json();

    clearCart();
    router.push(`/order-confirmation?order=${encodeURIComponent(payload.orderReference)}`);
  };

  if (resolved.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_12px_30px_rgba(17,17,17,0.06)]">
        <p className="text-[var(--color-muted)]">Your cart is currently empty.</p>
        <Link className="btn-primary mt-4 inline-block" href="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          {stepLabels.map((label, index) => {
            const isActive = index === step;
            const isComplete = index < step;

            return (
              <div
                key={label}
                className={`rounded-xl border px-4 py-3 text-xs uppercase tracking-[0.16em] transition ${isActive ? 'border-[var(--color-gold)] bg-white text-[var(--color-text)] shadow-[0_8px_20px_rgba(17,17,17,0.05)]' : isComplete ? 'border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-text)]' : 'border-[var(--color-border)] bg-transparent text-[var(--color-muted)]'}`}
              >
                <span className="block text-[10px] text-[var(--color-gold)]">Step {index + 1}</span>
                <span className="mt-1 block">{label}</span>
              </div>
            );
          })}
        </div>

        {step === 0 ? (
          <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_10px_24px_rgba(17,17,17,0.05)]">
            <h2 className="font-serif text-2xl text-[var(--color-text)]">Customer Info</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input className="input" placeholder="Full Name" value={formState.customerName} onChange={(event) => updateField('customerName', event.target.value)} />
              <input className="input" placeholder="Email" type="email" value={formState.email} onChange={(event) => updateField('email', event.target.value)} />
              <input className="input md:col-span-2" placeholder="Phone" value={formState.phone} onChange={(event) => updateField('phone', event.target.value)} />
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_10px_24px_rgba(17,17,17,0.05)]">
            <h2 className="font-serif text-2xl text-[var(--color-text)]">Address</h2>
            <div className="mt-5 space-y-4">
              <textarea className="input min-h-24" placeholder="Shipping Address" value={formState.shippingAddress} onChange={(event) => updateField('shippingAddress', event.target.value)} />
              <div className="grid gap-4 md:grid-cols-3">
                <input className="input" placeholder="City" value={formState.city} onChange={(event) => updateField('city', event.target.value)} />
                <input className="input" placeholder="State" value={formState.state} onChange={(event) => updateField('state', event.target.value)} />
                <input className="input" placeholder="Postal Code" value={formState.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} />
              </div>
              <input className="input" placeholder="Country" value={formState.country} onChange={(event) => updateField('country', event.target.value)} />
              <textarea className="input min-h-20" placeholder="Order Notes (optional)" value={formState.notes} onChange={(event) => updateField('notes', event.target.value)} />
            </div>
          </div>
        ) : null}

        {step === 2 ? <LegalAcknowledgement value={acknowledgements} onChange={setAcknowledgements} /> : null}

        {step === 3 ? <PaymentMethodSelector methods={paymentMethods} selected={selectedMethod} onSelect={setSelectedMethod} /> : null}

        {step === 4 ? (
          <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_10px_24px_rgba(17,17,17,0.05)]">
            <h2 className="font-serif text-2xl text-[var(--color-text)]">Review & Submit</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-4 text-sm text-[var(--color-muted)]">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">Customer</p>
                <p className="mt-2 text-[var(--color-text)]">{formState.customerName}</p>
                <p className="mt-1">{formState.email}</p>
                <p className="mt-1">{formState.phone}</p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-4 text-sm text-[var(--color-muted)]">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">Shipping</p>
                <p className="mt-2 text-[var(--color-text)]">{formState.shippingAddress}</p>
                <p className="mt-1">{formState.city}, {formState.state} {formState.postalCode}</p>
                <p className="mt-1">{formState.country}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[var(--color-muted)]">Selected payment preference: {paymentMethods.find((method) => method.id === selectedMethod)?.label ?? 'Not selected'}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {step > 0 ? (
            <button className="btn-secondary" type="button" onClick={previousStep} disabled={submitting}>
              Back
            </button>
          ) : null}
          {step < stepLabels.length - 1 ? (
            <button className="btn-primary" type="button" onClick={nextStep}>
              Continue
            </button>
          ) : (
            <button className="btn-primary" type="button" onClick={onSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Order Request'}
            </button>
          )}
        </div>

        {message ? <p className="text-sm text-red-600">{message}</p> : null}
      </div>

      <CheckoutSummary items={resolved} />
    </div>
  );
};
