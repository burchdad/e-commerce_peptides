import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--color-gold-soft)] bg-[linear-gradient(130deg,#0f0f10_5%,#171719_45%,#1a1a1d_100%)] px-6 py-16 shadow-[0_25px_80px_rgba(0,0,0,0.55)] md:px-12">
      <div className="absolute inset-0 deco-grid opacity-40" />
      <div className="relative max-w-3xl animate-fade-in">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-gold)]">Premium Research Catalog</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-[var(--color-ivory)] md:text-7xl">
          Precision Peptide Supply with a Refined Research Experience.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-sand)]">
          Laboratory-positioned GLP products crafted for quality, consistency, and confidence. Every peptide purchase includes a complimentary research kit.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="rounded-full bg-[var(--color-gold)] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-ink)]" href="/shop/glp-products">
            Shop GLP Products
          </Link>
          <Link className="rounded-full border border-[var(--color-gold)] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]" href="/complimentary-kit">
            View Complimentary Kit
          </Link>
        </div>
      </div>
    </section>
  );
};
