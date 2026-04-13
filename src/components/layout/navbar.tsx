'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCart } from '@/context/cart-context';
import { brand } from '@/lib/data/site';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin/login', label: 'Admin' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-gold-soft)] bg-[rgba(10,10,11,0.88)] backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-[var(--color-ivory)]">{brand.name}</Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm uppercase tracking-[0.12em] ${pathname === link.href ? 'text-[var(--color-gold)]' : 'text-[var(--color-sand)]'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/register" className="hidden rounded-full border border-[var(--color-gold)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-gold)] sm:inline-block">
            New Customer
          </Link>
          <Link href="/cart" className="rounded-full bg-[var(--color-ivory)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-ink)]">
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
};
