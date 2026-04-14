import type { ProductImageMap } from '@/lib/types';

export const siteImages = {
  hero: {
    main: '/images/hero/banner-main.png',
    alt: '/images/hero/banner-alt.png',
    mobile: '/images/hero/banner-mobile.png',
  },
  brand: {
    logo: '/images/brand/logo-primary.png',
    logoAlt: '/images/brand/logo-alt.png',
  },
  kit: {
    main: '/images/kit/kit-main.png',
    secondary: '/images/kit/kit-secondary.png',
    extra: '/images/kit/kit-extra.png',
  },
} as const;

// ─── Product image map ───────────────────────────────────────────────────────
// ONLY entries with real, uploaded image files.
// Product slugs match image filenames exactly.
// Accessories without images are intentionally omitted — they render ImageFallback.
export const productImageMap: Record<string, ProductImageMap> = {
  // GLP Products
  'reta-5': {
    primary: '/images/products/reta-5.png',
    hover: '/images/products/reta-10.png',
    gallery: ['/images/products/reta-5.png', '/images/products/reta-10.png'],
  },
  'reta-10': {
    primary: '/images/products/reta-10.png',
    hover: '/images/products/reta-20.png',
    gallery: ['/images/products/reta-10.png', '/images/products/reta-20.png'],
  },
  'reta-20': {
    primary: '/images/products/reta-20.png',
    gallery: ['/images/products/reta-20.png', '/images/products/reta-5.png'],
  },
  'tirz-10': {
    primary: '/images/products/tirz-10.png',
    hover: '/images/products/tirz-20.png',
    gallery: ['/images/products/tirz-10.png', '/images/products/tirz-20.png'],
  },
  'tirz-20': {
    primary: '/images/products/tirz-20.png',
    gallery: ['/images/products/tirz-20.png', '/images/products/tirz-10.png'],
  },
  // Recovery Products
  'bpc-157-5': {
    primary: '/images/products/bpc-157-5.png',
    hover: '/images/products/bpc-157-10.png',
    gallery: ['/images/products/bpc-157-5.png', '/images/products/bpc-157-10.png'],
  },
  'bpc-157-10': {
    primary: '/images/products/bpc-157-10.png',
    gallery: ['/images/products/bpc-157-10.png', '/images/products/bpc-157-5.png'],
  },
  // Anti-Aging Products
  'aod-5': {
    primary: '/images/products/aod-5.png',
  },
  '5-amino': {
    primary: '/images/products/5-amino.png',
  },
  // Accessories — only entries with real uploaded images
  'bacteriostatic-water-3ml': {
    primary: '/images/accessories/bac-water-3ml.png',
  },
  'bacteriostatic-water-10ml': {
    primary: '/images/accessories/bac-water-10ml.png',
  },
  'complete-research-kit': {
    primary: '/images/kit/kit-main.png',
    gallery: ['/images/kit/kit-main.png', '/images/kit/kit-secondary.png', '/images/kit/kit-extra.png'],
  },
};

export const categoryBannerImages: Record<string, string> = {
  'glp-products': siteImages.hero.alt,
  'anti-aging': siteImages.hero.main,
  recovery: siteImages.hero.mobile,
  accessories: '/images/kit/kit-secondary.png',
};

export const fallbackImage = '/images/brand/logo-alt.png';
