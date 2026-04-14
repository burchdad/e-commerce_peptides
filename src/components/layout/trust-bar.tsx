const trustPoints = ['Secure Ordering', 'Order Review Process', 'Terms Required'];

export const TrustBar = () => {
  return (
    <div className="border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_72%,white_28%)]">
      <div className="container flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] sm:justify-between">
        {trustPoints.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </div>
  );
};