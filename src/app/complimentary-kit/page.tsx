import Link from 'next/link';

import { KitContents } from '@/components/commerce/kit-contents';
import { complimentaryKitItems } from '@/lib/data/site';

export default function ComplimentaryKitPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Value Add</p>
        <h1 className="section-title mt-2">Complimentary Research Kit</h1>
        <p className="mt-4 max-w-2xl text-[var(--color-sand)]">Every peptide purchase includes a premium complimentary kit designed to support practical laboratory handling workflows.</p>
      </section>

      <KitContents items={complimentaryKitItems} />

      <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
        <h2 className="font-serif text-3xl text-[var(--color-ivory)]">Need extras?</h2>
        <p className="mt-3 text-[var(--color-sand)]">All kit components are available in the accessories catalog as standalone add-ons.</p>
        <Link className="mt-4 inline-block rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" href="/accessories">
          Shop Accessories
        </Link>
      </section>
    </div>
  );
}
