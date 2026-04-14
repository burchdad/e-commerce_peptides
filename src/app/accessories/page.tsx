import { ProductGrid } from '@/components/commerce/product-grid';
import { getProductsByCategory } from '@/lib/utils/catalog';

export default async function AccessoriesPage() {
  const products = await getProductsByCategory('accessories');

  return (
    <div className="space-y-8">
      <section className="rounded-[1.7rem] border border-[var(--color-border)] bg-white p-8 shadow-[0_14px_35px_rgba(17,17,17,0.08)]">
        <h1 className="section-title">Accessories & Supplies</h1>
        <p className="mt-4 text-[var(--color-muted)]">Standalone accessory inventory for flexible order customization and replenishment.</p>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}
