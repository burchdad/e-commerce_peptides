'use client';

import { useMemo, useState } from 'react';

import { ProductGallery } from '@/components/commerce/product-gallery';
import { ProductPurchasePanel } from '@/components/commerce/product-purchase-panel';
import type { Product, ProductImageMap } from '@/lib/types';
import { getInitialVariantSelection, resolveVariantForProduct } from '@/lib/utils/variants';

export const ProductDetailClient = ({ product }: { product: Product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(() => getInitialVariantSelection(product));
  const selectedVariant = resolveVariantForProduct(product, selectedVariantId);

  const images = useMemo<ProductImageMap>(() => {
    if (!selectedVariant.imageOverride) return product.images;

    const gallery = [selectedVariant.imageOverride, ...(product.images.gallery ?? [])].filter(Boolean);
    const uniqueGallery = Array.from(new Set(gallery));

    return {
      primary: selectedVariant.imageOverride,
      hover: selectedVariant.imageOverride,
      gallery: uniqueGallery,
    };
  }, [product.images, selectedVariant.imageOverride]);

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <ProductGallery
        key={`${product.id}:${selectedVariant.id}:${images.primary}`}
        productName={`${product.name} ${selectedVariant.name}`}
        images={images}
      />
      <ProductPurchasePanel
        product={product}
        selectedVariantId={selectedVariantId}
        onSelectedVariantIdChange={setSelectedVariantId}
      />
    </section>
  );
};
