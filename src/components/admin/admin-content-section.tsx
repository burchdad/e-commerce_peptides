export const AdminContentSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
      <h2 className="font-serif text-2xl text-[var(--color-ivory)]">{title}</h2>
      <div className="mt-4 text-sm text-[var(--color-sand)]">{children}</div>
    </section>
  );
};
