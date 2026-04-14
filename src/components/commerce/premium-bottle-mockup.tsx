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
      <div className="absolute left-1/2 top-[8%] h-[12%] w-[19%] -translate-x-1/2 rounded-[0.55rem] border border-[rgba(248,245,240,0.28)] bg-[linear-gradient(180deg,#d5dbe2_0%,#a6aeb9_42%,#d8dde3_100%)]" />
      <div className="absolute left-1/2 top-[18%] h-[72%] w-[46%] -translate-x-1/2 rounded-[42%_42%_18%_18%] border border-[rgba(248,245,240,0.3)] bg-[linear-gradient(180deg,rgba(248,245,240,0.2)_0%,rgba(248,245,240,0.08)_45%,rgba(248,245,240,0.14)_100%)] shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />

      <div className="absolute left-1/2 top-[36%] h-[35%] w-[40%] -translate-x-1/2 overflow-hidden rounded-[0.7rem] border border-[rgba(248,245,240,0.5)] bg-[linear-gradient(180deg,rgba(248,245,240,0.95),rgba(239,239,239,0.95))] px-3 py-2">
        <SafeImage
          src={imageSrc}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className={`object-contain transition duration-500 ${secondaryImageSrc && useGroupHover ? 'group-hover:scale-[1.03] group-hover:opacity-0' : 'hover:scale-[1.02]'}`}
          fallbackLabel="Product image"
        />

        {secondaryImageSrc ? (
          <div className={`absolute inset-0 ${useGroupHover ? 'opacity-0 transition duration-500 group-hover:opacity-100' : ''}`}>
            <SafeImage
              src={secondaryImageSrc}
              alt={`${alt} secondary`}
              sizes={sizes}
              className="object-contain"
              fallbackLabel="Product image"
            />
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(to_top,rgba(0,0,0,0.08),transparent)]" />
      </div>

      <div className="absolute left-1/2 top-[21%] h-[50%] w-[7%] -translate-x-[95%] -rotate-[10deg] rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.42),transparent)]" />
      <div className="absolute bottom-[8%] left-1/2 h-6 w-[54%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none gold-halo" />
    </div>
  );
};
