export const KitContents = ({ items }: { items: string[] }) => {
  return (
    <div className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
      <h3 className="font-serif text-3xl text-[var(--color-ivory)]">Complimentary Research Kit</h3>
      <p className="mt-2 text-[var(--color-sand)]">Every peptide purchase includes this premium kit at no extra cost.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-lg border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-3 text-sm text-[var(--color-ivory)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
