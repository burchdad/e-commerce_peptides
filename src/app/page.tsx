import Link from 'next/link';

import { ProductGrid } from '@/components/commerce/product-grid';
import { Hero } from '@/components/home/hero';
import { DisclaimerNotice } from '@/components/ui/disclaimer-notice';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { categories, faqs } from '@/lib/data/site';
import { featuredProducts } from '@/lib/utils/catalog';

export default function Home() {
  return (
    <div className="space-y-14">
      <Hero />

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Featured</p>
            <h2 className="section-title mt-2">Launch Products</h2>
          </div>
          <Link className="text-sm uppercase tracking-[0.14em] text-[var(--color-gold)]" href="/shop/glp-products">
            View Collection
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
          <h3 className="font-serif text-2xl text-[var(--color-ivory)]">Luxury Standard, Practical Ops</h3>
          <p className="mt-3 text-sm text-[var(--color-sand)]">Consistent lot handling, clear product indexing, and streamlined order request processing.</p>
        </article>
        <article className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
          <h3 className="font-serif text-2xl text-[var(--color-ivory)]">Complimentary Kit Included</h3>
          <p className="mt-3 text-sm text-[var(--color-sand)]">Every peptide purchase includes a complimentary research kit that supports immediate bench readiness.</p>
          <Link className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]" href="/complimentary-kit">Explore kit details</Link>
        </article>
        <article className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
          <h3 className="font-serif text-2xl text-[var(--color-ivory)]">Research-Only Positioning</h3>
          <p className="mt-3 text-sm text-[var(--color-sand)]">All offerings are represented for research use only with clear legal acknowledgements in key customer flows.</p>
        </article>
      </section>

      <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-7">
        <h2 className="section-title">Browse by Category</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/shop/${category.slug}`} className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-4">
              <h3 className="font-serif text-2xl text-[var(--color-ivory)]">{category.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-sand)]">{category.description}</p>
              {category.isFuture ? <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">Coming Soon</p> : null}
            </Link>
          ))}
        </div>
      </section>

      <DisclaimerNotice />

      <section>
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Questions</p>
          <h2 className="section-title mt-2">Frequently Asked</h2>
        </div>
        <FaqAccordion items={faqs.slice(0, 4)} />
      </section>
    </div>
  );
}
