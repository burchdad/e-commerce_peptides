import Link from 'next/link';

import { SafeImage } from '@/components/ui/safe-image';
import { complimentaryKitItems } from '@/lib/data/site';
import { siteImages } from '@/lib/config/images';

export const KitShowcase = () => {
  return (
    <section className="grid items-center gap-8 rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_45px_rgba(17,17,17,0.08)] lg:grid-cols-[1fr_1.05fr] lg:p-9">
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
        <SafeImage
          src={siteImages.kit.main}
          alt="Complimentary research kit"
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover"
          fallbackLabel="Kit image"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">Included With Peptide Orders</p>
        <h2 className="section-title mt-3">Complimentary Research Kit Included</h2>
        <p className="mt-3 max-w-xl text-[var(--color-muted)]">
          Every qualifying peptide order includes a curated handling kit to support a smoother bench setup from day one.
        </p>

        <ul className="mt-6 grid gap-3 text-sm text-[var(--color-text)] sm:grid-cols-2">
          {complimentaryKitItems.map((item) => (
            <li key={item} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3">
              {item}
            </li>
          ))}
        </ul>

        <Link
          href="/complimentary-kit"
          className="mt-6 inline-flex rounded-full border border-[var(--color-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)] transition hover:bg-[var(--color-gold)]/20"
        >
          View Full Kit Details
        </Link>
      </div>
    </section>
  );
};
