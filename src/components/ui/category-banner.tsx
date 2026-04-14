import type { Category } from '@/lib/types';

import { SafeImage } from '@/components/ui/safe-image';
import { categoryBannerImages, siteImages } from '@/lib/config/images';

export const CategoryBanner = ({ category }: { category: Category }) => {
  const bannerImage = categoryBannerImages[category.slug] ?? siteImages.hero.alt;

  return (
    <section className="relative overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] p-8 shadow-[0_14px_35px_rgba(17,17,17,0.08)]">
      <div className="absolute inset-0">
        <SafeImage
          src={bannerImage}
          alt={`${category.name} banner`}
          sizes="100vw"
          className="object-cover"
          fallbackLabel="Category image"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(17,17,17,0.7),rgba(17,17,17,0.5),rgba(17,17,17,0.62))]" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Collection</p>
        <h1 className="mt-3 font-serif text-4xl text-white">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-white/85">{category.description}</p>
        {category.isFuture ? (
          <p className="mt-4 inline-block rounded-full border border-white/55 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white">
            Coming Soon
          </p>
        ) : null}
      </div>
    </section>
  );
};
