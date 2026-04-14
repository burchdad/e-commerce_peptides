'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ImageFallback } from '@/components/ui/ImageFallback';

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackLabel?: string;
};

export const SafeImage = ({
  src,
  alt,
  className = '',
  sizes,
  priority,
  fallbackLabel = 'Image coming soon',
}: SafeImageProps) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ImageFallback label={fallbackLabel} />;
  }

  return (
    <Image
      fill
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};
