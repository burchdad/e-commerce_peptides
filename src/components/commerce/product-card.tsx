'use client';

import Link from 'next/link';
import { useState } from 'react';

import { PremiumBottleMockup } from '@/components/commerce/premium-bottle-mockup';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [ack, setAck] = useState(false);
  const secondaryImage = product.images.hover ?? product.images.gallery?.[0];

  return (
    <article className="group premium-surface rounded-[1.35rem] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.34)]">
      <PremiumBottleMockup
        imageSrc={product.images.primary}
        secondaryImageSrc={secondaryImage}
        alt={product.name}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 30vw"
        className="aspect-[4/5]"
        useGroupHover
      />

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-gold)]">{product.category.replace('-', ' ')}</p>
        <h3 className="mt-2 font-serif text-2xl text-[var(--color-text)]">{product.name}</h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{product.subtitle}</p>
        {product.includesComplimentaryKit ? <p className="mt-3 text-xs uppercase tracking-[0.15em] text-[var(--color-gold)]">Complimentary kit included</p> : null}
      </div>

      <p className="mt-4 text-sm text-[var(--color-muted)]">{product.shortDescription}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="font-serif text-2xl text-[var(--color-text)]">{currency(product.price)}</p>
        {product.compareAtPrice ? (
          <p className="text-sm text-[var(--color-muted)] line-through">{currency(product.compareAtPrice)}</p>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.1)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          Only 8 left in stock
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(248,245,240,0.2)] bg-[rgba(248,245,240,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ivory)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ivory)]" />
          Ships 24–48 hrs
        </span>
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-[var(--color-muted)]">
        <input
          checked={ack}
          onChange={(event) => setAck(event.target.checked)}
          type="checkbox"
          className="mt-0.5"
        />
        I confirm I meet all required conditions and accept the terms of purchase.
      </label>
      {!ack ? <p className="mt-2 text-xs text-[var(--color-muted)]">Accept the required terms to enable add to cart.</p> : null}

      <div className="mt-4 flex gap-3">
        <button
          className="flex-1 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-depth)_75%,var(--color-brand-red)_25%)] px-4 py-3 text-sm uppercase tracking-[0.14em] text-[var(--color-text)] transition hover:border-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!ack}
          onClick={() => addItem(product.id, 1)}
        >
          Add to Cart
        </button>
        <Link
          className="rounded-xl bg-[var(--color-gold)] px-4 py-3 text-sm uppercase tracking-[0.14em] text-[var(--color-depth)]"
          href={`/product/${product.slug}`}
        >
          View
        </Link>
      </div>
    </article>
  );
};
