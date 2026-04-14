'use client';

import { useState } from 'react';

const tabs = [
  {
    id: 'sourcing',
    label: 'Sourcing',
    heading: 'Where Our Peptides Come From',
    body: 'We source exclusively from US-based synthesis facilities that operate under documented GMP-aligned practices. Every supplier relationship includes written quality agreements, traceable raw material documentation, and lot-level accountability — no gray-market intermediaries.',
    points: [
      'Domestic synthesis partners only',
      'Pharmaceutical-grade starting materials',
      'Full supplier chain documentation',
      'Lot-level traceability from synthesis to shipment',
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    heading: 'How We Verify Purity',
    body: 'Before any product enters inventory, it passes independent third-party HPLC (High-Performance Liquid Chromatography) analysis. We require a minimum 98% purity threshold and reject any lot that fails to meet specification — no exceptions.',
    points: [
      'Independent third-party HPLC analysis',
      '≥98% purity threshold required',
      'Mass spectrometry confirmation on select batches',
      'Lot-level CoA available on request',
    ],
  },
  {
    id: 'process',
    label: 'Process',
    heading: 'From Synthesis to Your Door',
    body: 'Once a lot clears QC, it moves through our climate-controlled intake process: sealed vials, tamper-evident packaging, and a cold-chain-compatible fulfillment flow. Orders are reviewed by our team before payment instructions are issued — not automated, never rushed.',
    points: [
      'Climate-controlled storage and handling',
      'Sealed, tamper-evident vials',
      'Manual order review before payment',
      'Discreet plain outer packaging',
    ],
  },
];

export const TransparencySection = () => {
  const [active, setActive] = useState('sourcing');
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="premium-surface-deep relative overflow-hidden rounded-[1.7rem] p-7 lg:p-9">
      <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">Full Transparency</p>
        <h2 className="section-title mt-2 max-w-xl">Our Sourcing, Testing &amp; Process</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
          We believe research-grade supply relationships are built on verifiable facts, not branding. Here&apos;s exactly how our product pipeline works.
        </p>

        {/* Tab bar */}
        <div className="mt-6 flex gap-2 border-b border-[var(--color-border)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`pb-3 text-xs uppercase tracking-[0.2em] transition-colors ${
                active === tab.id
                  ? 'border-b-2 border-[var(--color-gold)] text-[var(--color-ivory)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-ivory)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl text-[var(--color-ivory)]">{current.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{current.body}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {current.points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.2)] px-4 py-3">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-[var(--color-gold)]"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm text-[var(--color-muted)]">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
