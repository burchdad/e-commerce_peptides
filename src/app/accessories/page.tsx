import { ProductGrid } from '@/components/commerce/product-grid';
import { getProductsByCategory } from '@/lib/utils/catalog';

export default function AccessoriesPage() {
  const products = getProductsByCategory('accessories');

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-8">
        <h1 className="section-title">Accessories & Supplies</h1>
        <p className="mt-4 text-[var(--color-sand)]">Standalone accessory inventory for flexible order customization and replenishment.</p>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}
