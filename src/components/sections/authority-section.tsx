const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    label: 'Third-Party Tested',
    body: 'Every batch is verified by an independent laboratory with HPLC purity analysis before it enters our catalog.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
      </svg>
    ),
    label: 'High-Purity Formulations',
    body: '≥98% purity standards across our full peptide catalog. Pharmaceutical-grade synthesis from documented domestic partners.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Discreet, Secure Shipping',
    body: 'Plain packaging with no external markings. Every shipment is sealed, tamper-evident, and signature-confirmed.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: 'Research-Use Compliance',
    body: 'Every product is clearly positioned for laboratory research only. Legal acknowledgements and policies are built into every order.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Fraud-Protected Ordering',
    body: 'Our manual confirmation workflow verifies every order — inventory, shipping, and compliance — before payment is ever collected.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    label: 'Transparent Documentation',
    body: 'Lot details, QC records, handling procedures, and shipping timelines are available on every order — no guessing required.',
  },
];

export const AuthoritySection = () => {
  return (
    <section className="premium-surface relative overflow-hidden rounded-[1.7rem] p-7 lg:p-9">
      <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.28),transparent_65%)]" />
      <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">Why Choose Peppers &amp; Vibes</p>
        <h2 className="section-title mt-2 max-w-2xl">Authority-Grade Standards Behind Every Order</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
          We built every process around one standard: earn trust before asking for it. That means documentation,
          purity verification, and compliance infrastructure — not just marketing copy.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.label}
              className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.22)] p-5 transition hover:border-[rgba(212,175,55,0.45)]"
            >
              <div className="mt-0.5 shrink-0 text-[var(--color-gold)]">{pillar.icon}</div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-ivory)]">
                  {pillar.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
