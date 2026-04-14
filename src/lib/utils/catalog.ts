import { getAdminProducts } from '@/lib/services/admin-data';
import { categories, products } from '@/lib/data/site';

export const getCategoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);

/** Fetch all products from DB (with static fallback). */
export const fetchAllProducts = async () => {
  try {
    return await getAdminProducts();
  } catch {
    return products;
  }
};

export const getFeaturedProducts = async () => {
  const all = await fetchAllProducts();
  return all.filter((p) => p.isActive && p.isFeatured);
};

export const getProductBySlug = async (slug: string) => {
  const all = await fetchAllProducts();
  return all.find((p) => p.slug === slug && p.isActive) ?? null;
};

export const getProductsByCategory = async (categorySlug: string) => {
  const all = await fetchAllProducts();
  return all.filter((p) => p.category === categorySlug && p.isActive);
};
