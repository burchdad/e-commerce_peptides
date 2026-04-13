'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [ack, setAck] = useState(false);

  return (
    <article className="group rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition hover:-translate-y-1">
      <div className="rounded-xl border border-[var(--color-gold-soft)] bg-[radial-gradient(circle_at_15%_20%,rgba(197,166,98,0.25),transparent_45%),var(--color-ink)] p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">{product.category.replace('-', ' ')}</p>
        <h3 className="mt-2 font-serif text-2xl text-[var(--color-ivory)]">{product.name}</h3>
        <p className="mt-2 text-sm text-[var(--color-sand)]">{product.subtitle}</p>
        {product.includesComplimentaryKit ? (
          <p className="mt-3 inline-block rounded-full border border-[var(--color-gold-soft)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
            Complimentary Kit Included
          </p>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-[var(--color-sand)]">{product.shortDescription}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="font-serif text-2xl text-[var(--color-ivory)]">{currency(product.price)}</p>
        {product.compareAtPrice ? (
          <p className="text-sm text-[var(--color-sand)] line-through">{currency(product.compareAtPrice)}</p>
        ) : null}
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-[var(--color-sand)]">
        <input
          checked={ack}
          onChange={(event) => setAck(event.target.checked)}
          type="checkbox"
          className="mt-0.5"
        />
        I understand this item is listed for research use only.
      </label>

      <div className="mt-4 flex gap-3">
        <button
          className="flex-1 rounded-full border border-[var(--color-gold)] px-4 py-2 text-sm uppercase tracking-[0.14em] text-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!ack}
          onClick={() => addItem(product.id, 1)}
        >
          Add to Cart
        </button>
        <Link
          className="rounded-full bg-[var(--color-ivory)] px-4 py-2 text-sm uppercase tracking-[0.14em] text-[var(--color-ink)]"
          href={`/product/${product.slug}`}
        >
          View
        </Link>
      </div>
    </article>
  );
};
