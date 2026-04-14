import { redirect } from 'next/navigation';

import { AdminProductsPage } from '@/components/admin/admin-products-page';
import { isAdminAuthenticated } from '@/lib/auth/admin';
import { categories } from '@/lib/data/site';
import { getAdminProducts } from '@/lib/services/admin-data';

export default async function AdminProductsRoute() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const products = await getAdminProducts();
  const categoryOptions = categories.map((c) => ({ slug: c.slug, name: c.name }));

  return <AdminProductsPage initialProducts={products} categories={categoryOptions} />;
}
