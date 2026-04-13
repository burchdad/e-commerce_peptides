import { FaqAccordion } from '@/components/ui/faq-accordion';
import { faqs } from '@/lib/data/site';

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">FAQ</h1>
      <p className="max-w-2xl text-[var(--color-sand)]">Clear, practical answers for product positioning, checkout flow, and accessory availability.</p>
      <FaqAccordion items={faqs} />
    </div>
  );
}
