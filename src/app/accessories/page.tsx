import { ProductGrid } from '@/components/commerce/product-grid';
import { getAllSettings } from '@/lib/services/settings';
import { getProductsByCategory } from '@/lib/utils/catalog';

export const dynamic = 'force-dynamic';

export default async function AccessoriesPage() {
  const [products, settings] = await Promise.all([getProductsByCategory('accessories'), getAllSettings()]);
  const bottleMockupsEnabled = settings['products.bottleMockupsEnabled'] === 'true';

  return (
    <div className="space-y-8">
      <section className="premium-surface-soft rounded-[1.7rem] p-8">
        <h1 className="section-title">Accessories & Supplies</h1>
        <p className="mt-4 text-[var(--color-muted)]">Standalone accessory inventory for flexible order customization and replenishment.</p>
      </section>
      <ProductGrid products={products} bottleMockupsEnabled={bottleMockupsEnabled} />
    </div>
  );
}
