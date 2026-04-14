type ImageFallbackProps = {
  label?: string;
  className?: string;
};

export const ImageFallback = ({
  label = 'Image coming soon',
  className = '',
}: ImageFallbackProps) => {
  return (
    <div
      aria-label={label}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(140deg,#f0ece4,#e5e0d6)] text-center ${className}`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#b8a88a]"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span className="text-[10px] uppercase tracking-[0.18em] text-[#b8a88a]">{label}</span>
    </div>
  );
};
