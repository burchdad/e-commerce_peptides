const getEnv = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value : fallback;
};

export const siteConfig = {
  brandName: getEnv('NEXT_PUBLIC_BRAND_NAME', 'Brand Name'),
  supportEmail: getEnv('NEXT_PUBLIC_SUPPORT_EMAIL', 'support@example.com'),
  domain: getEnv('NEXT_PUBLIC_DOMAIN', 'example.com'),
  currency: getEnv('NEXT_PUBLIC_CURRENCY', 'USD'),
  supportPhone: getEnv('NEXT_PUBLIC_SUPPORT_PHONE', '+1 (800) 555-0199'),
  supportAddress: getEnv('NEXT_PUBLIC_SUPPORT_ADDRESS', '123 Business Ave, Suite 100'),
  logos: {
    primary: getEnv('NEXT_PUBLIC_LOGO_PRIMARY', '/images/brand/logo-primary.png'),
    alternate: getEnv('NEXT_PUBLIC_LOGO_ALT', '/images/brand/logo-alt.png'),
  },
  theme: {
    bg: getEnv('NEXT_PUBLIC_THEME_BG', '#f8f7f5'),
    bgSoft: getEnv('NEXT_PUBLIC_THEME_BG_SOFT', '#f1eee8'),
    text: getEnv('NEXT_PUBLIC_THEME_TEXT', '#111111'),
    muted: getEnv('NEXT_PUBLIC_THEME_MUTED', '#6b7280'),
    accent: getEnv('NEXT_PUBLIC_THEME_ACCENT', '#d4af37'),
  },
} as const;
