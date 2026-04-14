'use client';

import { useMemo, useState } from 'react';

import { PremiumBottleMockup } from '@/components/commerce/premium-bottle-mockup';
import { SafeImage } from '@/components/ui/safe-image';
import type { ProductImageMap } from '@/lib/types';

type ProductGalleryProps = {
  productName: string;
  images: ProductImageMap;
};

export const ProductGallery = ({ productName, images }: ProductGalleryProps) => {
  const galleryImages = useMemo(() => {
    const all = [images.primary, ...(images.gallery ?? [])].filter(Boolean);
    return Array.from(new Set(all));
  }, [images.gallery, images.primary]);

  const [activeImage, setActiveImage] = useState(galleryImages[0] ?? '');

  return (
    <div className="space-y-3">
      <PremiumBottleMockup
        imageSrc={activeImage}
        alt={productName}
        sizes="(max-width: 1024px) 100vw, 55vw"
        priority
        className="aspect-[4/5]"
      />

      {galleryImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`relative aspect-square overflow-hidden rounded-lg border bg-[var(--color-bg-soft)] transition ${
                activeImage === image ? 'border-[var(--color-gold)] shadow-[0_0_18px_rgba(212,175,55,0.2)]' : 'border-[var(--color-border)]'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <SafeImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                sizes="120px"
                className="object-cover"
                fallbackLabel="Thumb"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
