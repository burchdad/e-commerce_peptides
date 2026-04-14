export const KitContents = ({ items }: { items: string[] }) => {
  return (
    <div className="premium-surface-soft rounded-2xl p-6">
      <h3 className="font-serif text-3xl text-[var(--color-text)]">Complimentary Research Kit</h3>
      <p className="mt-2 text-[var(--color-muted)]">Every peptide purchase includes this premium kit at no extra cost.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-lg border border-[var(--color-border)] bg-[rgba(0,0,0,0.2)] p-3 text-sm text-[var(--color-text)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
