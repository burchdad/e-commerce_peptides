import { redirect } from 'next/navigation';

import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { isAdminAuthenticated } from '@/lib/auth/admin';
import { categories } from '@/lib/data/site';
import { hasDatabaseUrl } from '@/lib/db';
import {
  ensureBaselineCatalogData,
  getAdminFaqs,
  getAdminLegalPages,
  getAdminOrderRequests,
  getAdminProducts,
} from '@/lib/services/admin-data';

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  await ensureBaselineCatalogData();

  const [products, faqs, legalPages, orders] = await Promise.all([
    getAdminProducts(),
    getAdminFaqs(),
    getAdminLegalPages(),
    getAdminOrderRequests(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="section-title">Admin Dashboard</h1>
      <p className="max-w-2xl text-[var(--color-sand)]">
        Manage product catalog, FAQs, legal text, and order statuses through a secure admin workflow.
      </p>
      <AdminDashboard
        categories={categories.map((category) => ({ slug: category.slug, name: category.name }))}
        dbEnabled={hasDatabaseUrl}
        faqs={faqs.map((faq) => ({ id: (faq as { id?: string }).id ?? faq.question, question: faq.question, answer: faq.answer }))}
        legalPages={legalPages.map((page) => ({
          id: String((page as { id?: string }).id ?? page.slug),
          slug: page.slug,
          title: page.title,
          intro: page.intro,
        }))}
        orders={orders.map((order) => ({
          id: order.id,
          orderReference: order.orderReference,
          email: order.email,
          status: order.status,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt.toISOString(),
        }))}
        products={products.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: product.price,
          stockQuantity: product.stockQuantity,
          isActive: product.isActive,
        }))}
      />
    </div>
  );
}
