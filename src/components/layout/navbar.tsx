'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TrustBar } from '@/components/layout/trust-bar';
import { SafeImage } from '@/components/ui/safe-image';
import { useCart } from '@/context/cart-context';
import { siteImages } from '@/lib/config/images';
import { siteConfig } from '@/lib/config/site-config';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop/accessories', label: 'Accessories' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin/login', label: 'Admin' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[rgba(26,26,26,0.72)] backdrop-blur-xl">
      <TrustBar />
      <div className="border-b border-[var(--color-border)]">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-depth)]">
              <SafeImage
                src={siteImages.brand.logo}
                alt={`${siteConfig.brandName} logo`}
                sizes="40px"
                priority
                className="object-contain p-2"
                fallbackLabel="Logo"
              />
            </span>
            <span className="font-serif text-xl tracking-wide text-[var(--color-text)]">{siteConfig.brandName}</span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.15em] transition ${pathname === link.href ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/register" className="btn-secondary hidden sm:inline-flex">
              New Customer
            </Link>
            <Link href="/cart" className="btn-primary inline-flex">
              Cart ({cartCount})
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
