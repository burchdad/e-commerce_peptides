import { siteConfig } from '@/lib/config/site-config';

export const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: siteConfig.currency,
    maximumFractionDigits: 2,
  }).format(value);
