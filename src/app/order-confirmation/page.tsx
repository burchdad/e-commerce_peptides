import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-10 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]">Order Request Received</p>
      <h1 className="mt-3 font-serif text-5xl text-[var(--color-ivory)]">Thank You</h1>
      <p className="mx-auto mt-4 max-w-2xl text-[var(--color-sand)]">Your order request has been submitted. We will contact you with payment and processing details after review.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" href="/shop">Continue Shopping</Link>
        <Link className="rounded-full border border-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]" href="/account">Order Lookup</Link>
      </div>
    </div>
  );
}
