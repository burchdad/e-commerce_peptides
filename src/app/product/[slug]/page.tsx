import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductGallery } from '@/components/commerce/product-gallery';
import { ProductPurchasePanel } from '@/components/commerce/product-purchase-panel';
import { DisclaimerNotice } from '@/components/ui/disclaimer-notice';
import { siteConfig } from '@/lib/config/site-config';
import { getProductBySlug } from '@/lib/utils/catalog';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.name} | ${siteConfig.brandName}` : `Product | ${siteConfig.brandName}`,
    description: product?.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <ProductGallery productName={product.name} images={product.images} />
        <ProductPurchasePanel product={product} />
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
          <p className="mt-4 text-sm text-[var(--color-muted)]">Orders are submitted as requests and reviewed before confirmation and fulfillment details are shared.</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Order placement requires acceptance of terms and any required verification steps.</p>
        </article>
      </section>

      <DisclaimerNotice />
    </div>
  );
}
