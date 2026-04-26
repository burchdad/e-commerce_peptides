export const TransparencySection = () => {
  return (
    <section className="premium-surface-deep relative overflow-hidden rounded-[1.7rem] p-7 lg:p-9">
      <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">Quality Assurance</p>
        <h2 className="section-title mt-2 max-w-xl">Quality Assurance</h2>
        <p className="mt-3 max-w-3xl text-sm text-[var(--color-muted)]">
          All products are third-party tested by a U.S.-based laboratory to ensure quality and purity greater than 99%.
        </p>
      </div>
    </section>
  );
};
