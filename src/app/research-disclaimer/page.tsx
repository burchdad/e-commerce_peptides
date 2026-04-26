import { legal } from '@/lib/data/site';

export default function ResearchDisclaimerPage() {
  const content = legal.research;

  return (
    <div className="space-y-6">
      <h1 className="section-title">{content.title}</h1>
      <p className="text-[var(--color-sand)]">DISCLAIMER: All products on this site are for Research, Development use only. Products are Not for Human use of any kind. The statements made within this website have not been evaluated by the US Food and Drug Administration. The statements and the products of this company are not intended to diagnose, treat, cure or prevent any disease.</p>
      <div className="space-y-4">
        {content.sections.map((section) => (
          <article key={section.heading} className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5">
            <h2 className="font-serif text-2xl text-[var(--color-ivory)]">{section.heading}</h2>
            <p className="mt-2 text-sm text-[var(--color-sand)]">{section.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
