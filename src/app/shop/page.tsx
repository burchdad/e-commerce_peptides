import Link from 'next/link';

import { categories } from '@/lib/data/site';

export default function ShopPage() {
  return (
    <div>
      <h1 className="section-title">Shop</h1>
      <p className="mt-3 max-w-2xl text-[var(--color-muted)]">Explore active and upcoming research categories. GLP products are now available.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/shop/${category.slug}`} className="premium-surface-soft rounded-xl p-5 transition hover:border-[var(--color-gold)]">
            <h2 className="font-serif text-2xl text-[var(--color-text)]">{category.name}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{category.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">{category.isFuture ? 'Coming Soon' : 'Shop Now'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
