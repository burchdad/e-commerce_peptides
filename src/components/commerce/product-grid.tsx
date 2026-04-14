import type { Product } from '@/lib/types';

import { ProductCard } from '@/components/commerce/product-card';

export const ProductGrid = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-white p-8 text-center text-[var(--color-muted)]">
        Products for this category are being prepared.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
