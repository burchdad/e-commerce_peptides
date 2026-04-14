import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductGrid } from '@/components/commerce/product-grid';
import { CategoryBanner } from '@/components/ui/category-banner';
import { siteConfig } from '@/lib/config/site-config';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/utils/catalog';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  return {
    title: category ? `${category.name} | ${siteConfig.brandName}` : `Category | ${siteConfig.brandName}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(categorySlug);

  return (
    <div className="space-y-8">
      <CategoryBanner category={category} />
      <ProductGrid products={categoryProducts} />
    </div>
  );
}
