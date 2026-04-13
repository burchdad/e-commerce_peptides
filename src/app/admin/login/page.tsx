import { redirect } from 'next/navigation';

import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { isAdminAuthenticated } from '@/lib/auth/admin';

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect('/admin');
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="section-title">Admin Login</h1>
      <p className="text-[var(--color-sand)]">Sign in to manage products, legal text, FAQ content, and order statuses.</p>
      <AdminLoginForm />
    </div>
  );
}
