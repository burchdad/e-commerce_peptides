import { ProductGrid } from '@/components/commerce/product-grid';
import { SafeImage } from '@/components/ui/safe-image';
import { categoryBannerImages } from '@/lib/config/images';
import { getProductsByCategory } from '@/lib/utils/catalog';

export default function ShopAccessoriesPage() {
  const products = getProductsByCategory('accessories');

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] p-8 shadow-[0_14px_35px_rgba(17,17,17,0.08)]">
        <div className="absolute inset-0">
          <SafeImage
            src={categoryBannerImages.accessories}
            alt="Accessories collection"
            sizes="100vw"
            className="object-cover"
            priority
            fallbackLabel="Accessories"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(17,17,17,0.72),rgba(17,17,17,0.54))]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Shop Accessories</p>
          <h1 className="section-title mt-2 text-white">Accessories & Supplies</h1>
          <p className="mt-4 max-w-2xl text-white/85">Standalone accessory inventory for flexible order customization and replenishment.</p>
        </div>
      </section>

      <ProductGrid products={products} />
    </div>
  );
}
