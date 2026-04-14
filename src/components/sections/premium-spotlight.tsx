import Link from 'next/link';

import { PremiumBottleMockup } from '@/components/commerce/premium-bottle-mockup';
import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const PremiumSpotlight = ({ products }: { products: Product[] }) => {
  const spotlight = products.slice(0, 2);

  if (spotlight.length === 0) {
    return null;
  }

  return (
    <section className="premium-surface relative overflow-hidden rounded-[1.9rem] p-7 lg:p-9">
      <div className="absolute right-[-120px] top-[-120px] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.32),transparent_65%)]" />
      <div className="absolute left-[-80px] bottom-[-80px] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(248,245,240,0.1),transparent_68%)]" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">Premium Product Spotlight</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title max-w-2xl">Branded bottle presentation for a stronger premium feel.</h2>
          <Link href="/shop/glp-products" className="btn-primary">
            Explore Full Collection
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {spotlight.map((product) => (
            <article key={product.id} className="group rounded-2xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.18)] p-5">
              <PremiumBottleMockup
                imageSrc={product.images.primary}
                secondaryImageSrc={product.images.hover ?? product.images.gallery?.[0]}
                alt={product.name}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="aspect-[4/5]"
                useGroupHover
              />
              <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-[var(--color-gold)]">{product.category.replace('-', ' ')}</p>
              <h3 className="mt-2 font-serif text-3xl text-[var(--color-ivory)]">{product.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{product.shortDescription}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-serif text-3xl text-[var(--color-ivory)]">{currency(product.price)}</p>
                <Link href={`/product/${product.slug}`} className="btn-secondary">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
