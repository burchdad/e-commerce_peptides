import Link from 'next/link';

import { SafeImage } from '@/components/ui/safe-image';
import { siteImages } from '@/lib/config/images';

export const Hero = () => {
  return (
    <section className="premium-surface-deep relative overflow-hidden rounded-none px-6 py-16 md:px-14 md:py-24">
      <div className="absolute inset-0">
        <SafeImage
          src={siteImages.hero.main}
          alt="Research lab banner"
          sizes="100vw"
          priority
          className="object-cover"
          fallbackLabel="Hero image"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(26,26,26,0.82),rgba(122,12,18,0.58),rgba(26,26,26,0.88))]" />
      <div className="peptide-overlay peptide-overlay-soft absolute inset-0" />
      <div className="absolute inset-0 deco-grid opacity-25" />
      <div className="absolute -right-14 top-8 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.36),transparent_65%)]" />
      <div className="absolute -left-16 bottom-0 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.2),transparent_70%)]" />

      <div className="relative max-w-3xl animate-fade-in">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--color-gold)]">Clinical Luxury Research Supply</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-6xl">
          Premium Peptide Access With a Trust-First Laboratory Experience.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
          Refined GLP catalog standards, transparent policies, and a complimentary research kit with qualifying peptide orders.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="btn-primary" href="/shop/glp-products">
            Shop GLP Products
          </Link>
          <Link className="btn-secondary border-[var(--color-gold)] bg-[rgba(0,0,0,0.2)] text-white hover:bg-[rgba(0,0,0,0.35)]" href="/complimentary-kit">
            View Complimentary Kit
          </Link>
        </div>
      </div>
    </section>
  );
};
