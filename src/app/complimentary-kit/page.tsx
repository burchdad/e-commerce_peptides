import Link from 'next/link';

import { KitContents } from '@/components/commerce/kit-contents';
import { complimentaryKitItems } from '@/lib/data/site';

export default function ComplimentaryKitPage() {
  return (
    <div className="space-y-8">
      <section className="premium-surface-deep relative overflow-hidden rounded-2xl p-8">
        <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Value Add</p>
        <h1 className="section-title mt-2">Complimentary Research Kit</h1>
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">Every peptide purchase includes a premium complimentary kit designed to support practical laboratory handling workflows.</p>
      </section>

      <KitContents items={complimentaryKitItems} />

      <section className="premium-surface-soft rounded-2xl p-6">
        <h2 className="font-serif text-3xl text-[var(--color-text)]">Need extras?</h2>
        <p className="mt-3 text-[var(--color-muted)]">All kit components are available in the accessories catalog as standalone add-ons.</p>
        <Link className="btn-primary mt-4 inline-flex" href="/shop/accessories">
          Shop Accessories
        </Link>
      </section>
    </div>
  );
}
