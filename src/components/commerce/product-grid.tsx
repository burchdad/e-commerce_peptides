import type { Product } from '@/lib/types';

import { ProductCard } from '@/components/commerce/product-card';

export const ProductGrid = ({
  products,
  bottleMockupsEnabled,
}: {
  products: Product[];
  bottleMockupsEnabled: boolean;
}) => {
  if (products.length === 0) {
    return (
      <div className="premium-surface rounded-xl border border-dashed p-8 text-center text-[var(--color-muted)]">
        Products are being prepared.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} bottleMockupsEnabled={bottleMockupsEnabled} />
      ))}
    </div>
  );
};
