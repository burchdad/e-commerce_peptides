import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DisclaimerNotice } from '@/components/ui/disclaimer-notice';
import { getProductBySlug } from '@/lib/utils/catalog';
import { currency } from '@/lib/utils/format';

import { ProductCard } from '@/components/commerce/product-card';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  return {
    title: product ? `${product.name} | Noir Axis Research` : 'Product | Noir Axis Research',
    description: product?.shortDescription,
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-[var(--color-gold-soft)] bg-[radial-gradient(circle_at_20%_20%,rgba(198,162,90,0.25),transparent_40%),var(--color-ink-2)] p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">{product.category.replace('-', ' ')}</p>
          <h1 className="mt-3 font-serif text-5xl text-[var(--color-ivory)]">{product.name}</h1>
          <p className="mt-3 text-lg text-[var(--color-sand)]">{product.subtitle}</p>
          <p className="mt-6 text-[var(--color-sand)]">{product.longDescription}</p>
          <div className="mt-6 flex items-center gap-3">
            <p className="font-serif text-4xl text-[var(--color-ivory)]">{currency(product.price)}</p>
            {product.compareAtPrice ? <p className="text-[var(--color-sand)] line-through">{currency(product.compareAtPrice)}</p> : null}
          </div>
          {product.includesComplimentaryKit ? (
            <p className="mt-5 inline-block rounded-full border border-[var(--color-gold-soft)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">
              Includes Complimentary Research Kit
            </p>
          ) : null}
          <div className="mt-8 flex gap-3">
            <Link className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" href="/cart">Go to Cart</Link>
            <Link className="rounded-full border border-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]" href="/shop">Continue Shopping</Link>
          </div>
        </div>

        <ProductCard product={product} />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
          <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Product Details</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-sand)]">
            {product.attributes.map((attribute) => (
              <li key={attribute.label} className="flex justify-between border-b border-[var(--color-gold-soft)]/30 pb-2">
                <span>{attribute.label}</span>
                <strong className="text-[var(--color-ivory)]">{attribute.value}</strong>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
          <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Shipping & Policies</h2>
          <p className="mt-4 text-sm text-[var(--color-sand)]">Orders are submitted as requests and reviewed by the team before payment confirmation and dispatch.</p>
          <p className="mt-3 text-sm text-[var(--color-sand)]">All sales are subject to legal acknowledgement terms and research-use-only positioning.</p>
        </article>
      </section>

      <DisclaimerNotice />
    </div>
  );
}
