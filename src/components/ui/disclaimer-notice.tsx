export const DisclaimerNotice = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)]/80 p-4 text-sm text-[var(--color-ivory)] ${className}`}>
      Research Use Notice: Products on this site are presented for laboratory and research purposes only. This content is informational and does not provide medical guidance.
    </div>
  );
};
