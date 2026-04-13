import { legal } from '@/lib/data/site';

export default function PrivacyPage() {
  const content = legal.privacy;

  return (
    <div className="space-y-6">
      <h1 className="section-title">{content.title}</h1>
      <p className="text-[var(--color-sand)]">{content.intro}</p>
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
