import { redirect } from 'next/navigation';

import { AdminProductsPage } from '@/components/admin/admin-products-page';
import { isAdminAuthenticated } from '@/lib/auth/admin';
import { categories } from '@/lib/data/site';
import { getAdminProducts } from '@/lib/services/admin-data';
import { getAllSettings } from '@/lib/services/settings';

export default async function AdminProductsRoute() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const [products, settings] = await Promise.all([getAdminProducts(), getAllSettings()]);
  const categoryOptions = categories.map((c) => ({ slug: c.slug, name: c.name }));
  const bottleMockupsEnabled = settings['products.bottleMockupsEnabled'] === 'true';

  return (
    <AdminProductsPage
      initialProducts={products}
      categories={categoryOptions}
      bottleMockupsEnabled={bottleMockupsEnabled}
    />
  );
}
