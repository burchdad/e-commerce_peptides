'use client';

import { useState } from 'react';

type DashboardProps = {
  dbEnabled: boolean;
  isClientMode: boolean;
  categories: Array<{ slug: string; name: string }>;
  products: Array<{ id: string; name: string; slug: string; category: string; price: number; stockQuantity: number; isActive: boolean }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  legalPages: Array<{ id: string; slug: string; title: string; intro: string }>;
  orders: Array<{ id: string; orderReference: string; email: string; status: string; createdAt: string }>;
};

export const AdminDashboard = ({ dbEnabled, isClientMode, categories, products, faqs, legalPages, orders }: DashboardProps) => {
  const [statusMessage, setStatusMessage] = useState('');

  const submitJson = async (url: string, method: 'POST' | 'PATCH', payload: Record<string, unknown>) => {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: 'Request failed.' }));
      throw new Error(body.error || 'Request failed.');
    }
  };

  const onCreateProduct = async (formData: FormData) => {
    const payload = Object.fromEntries(formData.entries());
    await submitJson('/api/admin/products', 'POST', payload);
    setStatusMessage('Product created. Refresh to view latest records.');
  };

  const onCreateFaq = async (formData: FormData) => {
    const payload = Object.fromEntries(formData.entries());
    await submitJson('/api/admin/faqs', 'POST', payload);
    setStatusMessage('FAQ created. Refresh to view latest records.');
  };

  const onUpdateLegal = async (formData: FormData) => {
    const slug = String(formData.get('slug') || '');
    const payload = {
      title: String(formData.get('title') || ''),
      intro: String(formData.get('intro') || ''),
    };
    await submitJson(`/api/admin/legal-pages/${slug}`, 'PATCH', payload);
    setStatusMessage('Legal page updated. Refresh to view latest records.');
  };

  const onUpdateOrder = async (orderId: string, status: string) => {
    await submitJson(`/api/admin/orders/${orderId}`, 'PATCH', { status });
    setStatusMessage('Order statuses updated. Refresh to view latest records.');
  };

  const onLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-4">
        {!isClientMode ? (
          <p className="text-sm text-[var(--color-sand)]">
            {dbEnabled ? 'Database mode enabled: admin writes persist to PostgreSQL.' : 'Seed fallback mode: configure DATABASE_URL for persistent writes.'}
          </p>
        ) : <p className="text-sm text-[var(--color-sand)]">Client handoff mode enabled.</p>}
        <button className="rounded-full border border-[var(--color-gold)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]" onClick={onLogout}>
          Logout
        </button>
      </div>

      {statusMessage ? <p className="text-sm text-[var(--color-sand)]">{statusMessage}</p> : null}

      {!isClientMode ? <section className="grid gap-4 lg:grid-cols-2">
        <form
          className="space-y-3 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5"
          action={async (formData) => {
            try {
              await onCreateProduct(formData);
            } catch (error) {
              setStatusMessage(error instanceof Error ? error.message : 'Failed to create product.');
            }
          }}
        >
          <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Create Product</h2>
          <input className="input" name="name" placeholder="Name" required />
          <input className="input" name="slug" placeholder="Slug" required />
          <select className="input" name="categorySlug" required>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
          <input className="input" name="subtitle" placeholder="Subtitle" required />
          <input className="input" name="shortDescription" placeholder="Short Description" required />
          <textarea className="input min-h-20" name="longDescription" placeholder="Long Description" required />
          <div className="grid gap-3 md:grid-cols-3">
            <input className="input" name="price" placeholder="Price" type="number" step="0.01" required />
            <input className="input" name="stockQuantity" placeholder="Stock" type="number" required />
            <input className="input" name="sku" placeholder="SKU" required />
          </div>
          <button className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" type="submit">Save Product</button>
        </form>

        <form
          className="space-y-3 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5"
          action={async (formData) => {
            try {
              await onCreateFaq(formData);
            } catch (error) {
              setStatusMessage(error instanceof Error ? error.message : 'Failed to create FAQ.');
            }
          }}
        >
          <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Create FAQ</h2>
          <input className="input" name="question" placeholder="Question" required />
          <textarea className="input min-h-24" name="answer" placeholder="Answer" required />
          <button className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" type="submit">Save FAQ</button>

          <div className="border-t border-[var(--color-gold-soft)] pt-4">
            <h3 className="font-serif text-xl text-[var(--color-ivory)]">Current FAQs</h3>
            <ul className="mt-2 space-y-2 text-sm text-[var(--color-sand)]">
              {faqs.slice(0, 6).map((faq) => (
                <li key={faq.id} className="rounded border border-[var(--color-gold-soft)] p-2">{faq.question}</li>
              ))}
            </ul>
          </div>
        </form>
      </section> : null}

      {!isClientMode ? <form
        className="space-y-3 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5"
        action={async (formData) => {
          try {
            await onUpdateLegal(formData);
          } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Failed to update legal page.');
          }
        }}
      >
        <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Update Legal Intro</h2>
        <select className="input" name="slug" required>
          {legalPages.map((page) => (
            <option key={page.slug} value={page.slug}>{page.slug}</option>
          ))}
        </select>
        <input className="input" name="title" placeholder="Title" required />
        <textarea className="input min-h-20" name="intro" placeholder="Intro" required />
        <button className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" type="submit">Save Legal Page</button>
      </form> : null}

      <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
        <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Order Request Statuses</h2>
        {orders.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--color-sand)]">No persisted orders available yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} onUpdate={onUpdateOrder} />
            ))}
          </div>
        )}
      </section>

      {!isClientMode ? <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
        <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Current Product Snapshot</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-[var(--color-sand)]">
            <thead>
              <tr className="border-b border-[var(--color-gold-soft)] text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Category</th>
                <th className="py-2 pr-3">Price</th>
                <th className="py-2 pr-3">Stock</th>
                <th className="py-2 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 12).map((product) => (
                <tr key={product.id} className="border-b border-[var(--color-gold-soft)]/20">
                  <td className="py-2 pr-3">{product.name}</td>
                  <td className="py-2 pr-3">{product.category}</td>
                  <td className="py-2 pr-3">${product.price.toFixed(2)}</td>
                  <td className="py-2 pr-3">{product.stockQuantity}</td>
                  <td className="py-2 pr-3">{product.isActive ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> : null}
    </div>
  );
};

const statusOptions = ['pending', 'reviewing', 'approved', 'payment-sent', 'completed', 'cancelled'];

const OrderRow = ({
  order,
  onUpdate,
}: {
  order: { id: string; orderReference: string; email: string; status: string; createdAt: string };
  onUpdate: (orderId: string, status: string) => Promise<void>;
}) => {
  const [status, setStatus] = useState(order.status);

  return (
    <div className="rounded-lg border border-[var(--color-gold-soft)] p-3">
      <p className="font-medium text-[var(--color-ivory)]">{order.orderReference}</p>
      <p className="text-xs text-[var(--color-sand)]">{order.email}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <select className="input max-w-[190px]" value={status} onChange={(event) => setStatus(event.target.value)}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button className="rounded-full border border-[var(--color-gold)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]" onClick={() => onUpdate(order.id, status)}>
          Update
        </button>
      </div>
    </div>
  );
};
