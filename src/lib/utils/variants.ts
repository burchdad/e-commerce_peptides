import type { Product, ProductVariant } from '@/lib/types';

const fallbackVariantForProduct = (product: Product): ProductVariant => ({
  id: `${product.id}-default`,
  productId: product.id,
  name: product.name,
  sku: product.sku,
  price: product.price,
  compareAtPrice: product.compareAtPrice,
  stock: product.stockQuantity,
  active: true,
  isDefault: true,
  sortOrder: 0,
});

export const getActiveVariants = (product: Product): ProductVariant[] =>
  (product.variants ?? []).filter((variant) => variant.active);

export const getDefaultActiveVariant = (product: Product): ProductVariant | null => {
  const activeVariants = getActiveVariants(product);
  if (activeVariants.length === 0) return null;
  return activeVariants.find((variant) => variant.isDefault) ?? activeVariants[0];
};

export const getInitialVariantSelection = (product: Product): string => {
  const activeVariants = getActiveVariants(product);
  if (activeVariants.length === 0) return '';
  if (activeVariants.length === 1) return activeVariants[0].id;
  return getDefaultActiveVariant(product)?.id ?? '';
};

export const resolveVariantForProduct = (
  product: Product,
  selectedVariantId?: string,
): ProductVariant => {
  const activeVariants = getActiveVariants(product);
  if (activeVariants.length === 0) {
    return fallbackVariantForProduct(product);
  }

  if (selectedVariantId) {
    const selected = activeVariants.find((variant) => variant.id === selectedVariantId);
    if (selected) return selected;
  }

  return getDefaultActiveVariant(product) ?? activeVariants[0] ?? fallbackVariantForProduct(product);
};

export const requiresVariantSelection = (product: Product): boolean => getActiveVariants(product).length > 1;

export const getVariantDisplayImage = (product: Product, variant?: ProductVariant): string =>
  variant?.imageOverride || product.images.primary;
