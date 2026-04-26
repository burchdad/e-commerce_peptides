export const DisclaimerNotice = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`premium-surface-soft rounded-xl p-4 text-sm text-[var(--color-text)] ${className}`}>
      DISCLAIMER: All products on this site are for Research, Development use only. Products are Not for Human use of any kind. The statements made within this website have not been evaluated by the US Food and Drug Administration. The statements and the products of this company are not intended to diagnose, treat, cure or prevent any disease.
    </div>
  );
};
