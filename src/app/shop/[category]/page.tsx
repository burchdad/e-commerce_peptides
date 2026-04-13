import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductGrid } from '@/components/commerce/product-grid';
import { CategoryBanner } from '@/components/ui/category-banner';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/utils/catalog';

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategoryBySlug(params.category);
  return {
    title: category ? `${category.name} | Noir Axis Research` : 'Category | Noir Axis Research',
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(params.category);

  return (
    <div className="space-y-8">
      <CategoryBanner category={category} />
      <ProductGrid products={categoryProducts} />
    </div>
  );
}
