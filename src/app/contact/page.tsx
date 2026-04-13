import { ContactForm } from '@/components/forms/contact-form';
import { brand } from '@/lib/data/site';

export default function ContactPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <aside className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
        <h1 className="section-title">Contact</h1>
        <p className="mt-3 text-[var(--color-sand)]">Reach the operations team for order and account inquiries.</p>
        <ul className="mt-6 space-y-2 text-sm text-[var(--color-sand)]">
          <li>{brand.email}</li>
          <li>{brand.phone}</li>
          <li>{brand.address}</li>
        </ul>
      </aside>
      <ContactForm />
    </div>
  );
}
