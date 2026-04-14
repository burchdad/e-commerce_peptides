import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import type { CSSProperties } from 'react';

import { SiteShell } from '@/components/layout/site-shell';
import { siteConfig } from '@/lib/config/site-config';

import './globals.css';

const serif = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: `${siteConfig.brandName} | Premium Research Storefront`,
  description: `${siteConfig.brandName} configurable research storefront and order workflow template.`,
  openGraph: {
    title: siteConfig.brandName,
    description: `${siteConfig.brandName} configurable research storefront and accessories catalog.`,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeStyle = {
    '--color-bg': siteConfig.theme.bg,
    '--color-bg-soft': siteConfig.theme.bgSoft,
    '--color-text': siteConfig.theme.text,
    '--color-muted': siteConfig.theme.muted,
    '--color-gold': siteConfig.theme.accent,
  } as CSSProperties;

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]" style={themeStyle}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
