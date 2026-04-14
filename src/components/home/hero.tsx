import Link from 'next/link';

import { SafeImage } from '@/components/ui/safe-image';
import { siteImages } from '@/lib/config/images';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] px-6 py-16 shadow-[0_22px_60px_rgba(17,17,17,0.16)] md:px-12 md:py-20">
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
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(17,17,17,0.78),rgba(17,17,17,0.42),rgba(17,17,17,0.65))]" />
      <div className="absolute inset-0 deco-grid opacity-20" />

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
          <Link className="btn-secondary border-[var(--color-gold)] bg-transparent text-white hover:bg-white/15" href="/complimentary-kit">
            View Complimentary Kit
          </Link>
        </div>
      </div>
    </section>
  );
};
