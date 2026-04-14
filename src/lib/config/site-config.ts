const pick = (inlined: string | undefined, fallback: string) =>
  inlined && inlined.trim().length > 0 ? inlined : fallback;

export const siteConfig = {
  brandName:       pick(process.env.NEXT_PUBLIC_BRAND_NAME,           'Brand Name'),
  supportEmail:    pick(process.env.NEXT_PUBLIC_SUPPORT_EMAIL,        'support@example.com'),
  domain:          pick(process.env.NEXT_PUBLIC_DOMAIN,               'example.com'),
  currency:        pick(process.env.NEXT_PUBLIC_CURRENCY,             'USD'),
  supportPhone:    pick(process.env.NEXT_PUBLIC_SUPPORT_PHONE,        '+1 (800) 555-0199'),
  supportAddress:  pick(process.env.NEXT_PUBLIC_SUPPORT_ADDRESS,      '123 Business Ave, Suite 100'),
  logos: {
    primary:   pick(process.env.NEXT_PUBLIC_LOGO_PRIMARY, '/images/brand/logo-primary.png'),
    alternate: pick(process.env.NEXT_PUBLIC_LOGO_ALT,     '/images/brand/logo-alt.png'),
  },
  theme: {
    bg:     pick(process.env.NEXT_PUBLIC_THEME_BG,      '#f8f7f5'),
    bgSoft: pick(process.env.NEXT_PUBLIC_THEME_BG_SOFT, '#f1eee8'),
    text:   pick(process.env.NEXT_PUBLIC_THEME_TEXT,    '#111111'),
    muted:  pick(process.env.NEXT_PUBLIC_THEME_MUTED,   '#6b7280'),
    accent: pick(process.env.NEXT_PUBLIC_THEME_ACCENT,  '#d4af37'),
  },
} as const;
