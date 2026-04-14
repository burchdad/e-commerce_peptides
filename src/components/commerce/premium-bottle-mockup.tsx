'use client';

import { SafeImage } from '@/components/ui/safe-image';

type PremiumBottleMockupProps = {
  imageSrc?: string | null;
  secondaryImageSrc?: string | null;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  useGroupHover?: boolean;
};

export const PremiumBottleMockup = ({
  imageSrc,
  secondaryImageSrc,
  alt,
  sizes,
  priority,
  className = '',
  useGroupHover = false,
}: PremiumBottleMockupProps) => {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-[linear-gradient(160deg,#2a0f14_0%,#1a1a1a_100%)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(212,175,55,0.24),transparent_44%),radial-gradient(circle_at_80%_12%,rgba(248,245,240,0.08),transparent_38%)]" />
      <div className="absolute left-1/2 top-[8%] h-[13%] w-[18%] -translate-x-1/2 rounded-[0.55rem] border border-[rgba(212,175,55,0.42)] bg-[linear-gradient(180deg,#2b2b2b_0%,#151515_100%)]" />
      <div className="absolute left-1/2 top-[17%] h-[73%] w-[45%] -translate-x-1/2 rounded-[40%_40%_16%_16%] border border-[rgba(212,175,55,0.36)] bg-[linear-gradient(180deg,rgba(248,245,240,0.06)_0%,rgba(0,0,0,0.26)_80%)] shadow-[0_20px_40px_rgba(0,0,0,0.42)]" />

      <div className="absolute left-1/2 top-[28%] h-[43%] w-[38%] -translate-x-1/2 overflow-hidden rounded-[0.85rem] border border-[rgba(212,175,55,0.72)] bg-[linear-gradient(180deg,rgba(212,175,55,0.18),rgba(122,12,18,0.26))]">
        <SafeImage
          src={imageSrc}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className={`object-cover transition duration-500 ${secondaryImageSrc && useGroupHover ? 'group-hover:scale-[1.06] group-hover:opacity-0' : 'hover:scale-[1.04]'}`}
          fallbackLabel="Product image"
        />

        {secondaryImageSrc ? (
          <div className={`absolute inset-0 ${useGroupHover ? 'opacity-0 transition duration-500 group-hover:opacity-100' : ''}`}>
            <SafeImage
              src={secondaryImageSrc}
              alt={`${alt} secondary`}
              sizes={sizes}
              className="object-cover"
              fallbackLabel="Product image"
            />
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-7 bg-[linear-gradient(to_top,rgba(26,26,26,0.55),transparent)]" />
      </div>

      <div className="absolute left-1/2 top-[20%] h-[52%] w-[6%] -translate-x-[95%] -rotate-[10deg] rounded-full bg-[linear-gradient(to_bottom,rgba(248,245,240,0.2),transparent)]" />
      <div className="absolute bottom-[8%] left-1/2 h-6 w-[54%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none gold-halo" />
    </div>
  );
};
