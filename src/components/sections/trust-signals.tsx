const badges = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: '3rd-Party Verified',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: 'Secure Checkout',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Discreet Shipping',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    label: '≥98% Purity Standard',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Fast Order Processing',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: 'Research-Use Only',
  },
];

const testimonials = [
  {
    quote: 'Ordering was straightforward and the product arrived faster than expected. The confirmation email was detailed and professional — exactly what I need for my lab records.',
    author: 'Verified Research Customer',
    detail: 'GLP-1 Protocol',
  },
  {
    quote: 'I appreciated the manual review step. It gave me confidence that my order was actually checked before payment was requested. No other supplier does this.',
    author: 'Verified Research Customer',
    detail: 'BPC-157 & Recovery Stack',
  },
  {
    quote: 'The complimentary kit made a real difference — all the accessories I needed were already included. Clean, discreet packaging and no surprises.',
    author: 'Verified Research Customer',
    detail: 'Starter Kit Order',
  },
];

const guarantees = [
  {
    heading: 'Order Accuracy Guarantee',
    body: 'If your order contains the wrong product or quantity, we correct it — no questions asked.',
  },
  {
    heading: 'Purity Assurance',
    body: 'Every lot is independently tested to ≥98% purity before fulfillment. CoA available on request.',
  },
  {
    heading: 'Discreet Packaging Promise',
    body: 'Plain outer packaging on every shipment. No brand names, no product descriptors externally.',
  },
];

export const TrustSignals = () => {
  return (
    <section className="space-y-6">
      {/* Trust badges */}
      <div className="premium-surface-soft relative overflow-hidden rounded-[1.7rem] px-7 py-6 lg:px-9">
        <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />
        <div className="relative">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Trust Signals</p>
          <div className="flex flex-wrap gap-3">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[rgba(0,0,0,0.22)] px-4 py-2"
              >
                <span className="text-[var(--color-gold)]">{badge.icon}</span>
                <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-ivory)]">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="premium-surface relative overflow-hidden rounded-[1.7rem] p-7 lg:p-9">
        <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_65%)]" />
        <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Customer Experiences</p>
          <h2 className="section-title mt-2">What Researchers Are Saying</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.22)] p-5"
              >
                <blockquote className="font-serif text-lg leading-snug text-[var(--color-ivory)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 border-t border-[var(--color-border)] pt-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">{t.author}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-muted)]">{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <div className="premium-surface-soft relative overflow-hidden rounded-[1.7rem] p-7 lg:p-9">
        <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Our Commitments</p>
          <h2 className="section-title mt-2">Guarantees &amp; Standards</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {guarantees.map((g) => (
              <article
                key={g.heading}
                className="rounded-2xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.22)] p-5"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--color-gold)]"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <h3 className="mt-3 font-serif text-xl text-[var(--color-ivory)]">{g.heading}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{g.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
