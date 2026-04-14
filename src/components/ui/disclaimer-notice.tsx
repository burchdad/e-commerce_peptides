export const DisclaimerNotice = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`premium-surface-soft rounded-xl p-4 text-sm text-[var(--color-text)] ${className}`}>
      Research Use Notice: Products on this site are presented for laboratory and research purposes only. This content is informational and does not provide medical guidance.
    </div>
  );
};
