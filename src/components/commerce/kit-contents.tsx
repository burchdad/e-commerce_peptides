export const KitContents = ({ items }: { items: string[] }) => {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_10px_28px_rgba(17,17,17,0.06)]">
      <h3 className="font-serif text-3xl text-[var(--color-text)]">Complimentary Research Kit</h3>
      <p className="mt-2 text-[var(--color-muted)]">Every peptide purchase includes this premium kit at no extra cost.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-3 text-sm text-[var(--color-text)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
