import { ProductGrid } from '@/components/commerce/product-grid';
import { getProductsByCategory } from '@/lib/utils/catalog';

export default async function AccessoriesPage() {
  const products = await getProductsByCategory('accessories');

  return (
    <div className="space-y-8">
      <section className="premium-surface-soft rounded-[1.7rem] p-8">
        <h1 className="section-title">Accessories & Supplies</h1>
        <p className="mt-4 text-[var(--color-muted)]">Standalone accessory inventory for flexible order customization and replenishment.</p>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}
