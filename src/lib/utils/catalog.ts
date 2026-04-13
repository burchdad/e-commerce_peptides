import { categories, products } from '@/lib/data/site';

export const activeProducts = products.filter((product) => product.isActive);

export const featuredProducts = activeProducts.filter((product) => product.isFeatured);

export const getCategoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);

export const getProductBySlug = (slug: string) => activeProducts.find((product) => product.slug === slug);

export const getProductsByCategory = (categorySlug: string) =>
  activeProducts.filter((product) => product.category === categorySlug);
