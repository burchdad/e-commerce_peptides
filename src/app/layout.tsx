import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';

import { SiteShell } from '@/components/layout/site-shell';

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
  title: 'Noir Axis Research | Premium Research Peptides',
  description:
    'Premium research-use peptide catalog with complimentary kit inclusion and refined order-request checkout experience.',
  openGraph: {
    title: 'Noir Axis Research',
    description: 'Luxury research peptide storefront and accessories catalog.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
