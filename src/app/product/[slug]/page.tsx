import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProductGallery } from '@/components/commerce/product-gallery';
import { DisclaimerNotice } from '@/components/ui/disclaimer-notice';
import { getProductBySlug } from '@/lib/utils/catalog';
import { currency } from '@/lib/utils/format';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} | Noir Axis Research` : 'Product | Noir Axis Research',
    description: product?.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <ProductGallery productName={product.name} images={product.images} />

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-[0_14px_35px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">{product.category.replace('-', ' ')}</p>
          <h1 className="mt-3 font-serif text-5xl text-[var(--color-text)]">{product.name}</h1>
          <p className="mt-3 text-lg text-[var(--color-muted)]">{product.subtitle}</p>
          <p className="mt-6 text-[var(--color-muted)]">{product.longDescription}</p>
          <div className="mt-6 flex items-center gap-3">
            <p className="font-serif text-4xl text-[var(--color-text)]">{currency(product.price)}</p>
            {product.compareAtPrice ? <p className="text-[var(--color-muted)] line-through">{currency(product.compareAtPrice)}</p> : null}
          </div>
          {product.includesComplimentaryKit ? <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">Includes Complimentary Research Kit</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/cart">Go to Cart</Link>
            <Link className="btn-secondary" href="/shop">Continue Shopping</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="font-serif text-2xl text-[var(--color-text)]">Product Details</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            {product.attributes.map((attribute) => (
              <li key={attribute.label} className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span>{attribute.label}</span>
                <strong className="text-[var(--color-text)]">{attribute.value}</strong>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="font-serif text-2xl text-[var(--color-text)]">Shipping & Policies</h2>
          <p className="mt-4 text-sm text-[var(--color-muted)]">Orders are submitted as requests and reviewed by the team before payment confirmation and dispatch.</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">All sales are subject to legal acknowledgement terms and research-use-only positioning.</p>
        </article>
      </section>

      <DisclaimerNotice />
    </div>
  );
}
