import type { Category } from '@/lib/types';

export const CategoryBanner = ({ category }: { category: Category }) => {
  return (
    <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)]/75 p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Collection</p>
      <h1 className="mt-3 font-serif text-4xl text-[var(--color-ivory)]">{category.name}</h1>
      <p className="mt-4 max-w-2xl text-[var(--color-sand)]">{category.description}</p>
      {category.isFuture ? (
        <p className="mt-4 inline-block rounded-full border border-[var(--color-gold-soft)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Coming Soon
        </p>
      ) : null}
    </section>
  );
};
