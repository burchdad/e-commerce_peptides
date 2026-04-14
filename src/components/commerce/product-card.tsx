'use client';

import Link from 'next/link';
import { useState } from 'react';

import { SafeImage } from '@/components/ui/safe-image';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [ack, setAck] = useState(false);
  const secondaryImage = product.images.hover ?? product.images.gallery?.[0];

  return (
    <article className="group rounded-[1.35rem] border border-[var(--color-border)] bg-white p-4 shadow-[0_12px_30px_rgba(17,17,17,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(17,17,17,0.13)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
        <SafeImage
          src={product.images.primary}
          alt={product.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 30vw"
          className={`object-cover transition duration-500 ${secondaryImage ? 'group-hover:scale-[1.03] group-hover:opacity-0' : 'group-hover:scale-[1.04]'}`}
          fallbackLabel="Product image"
        />
        {secondaryImage ? (
          <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
            <SafeImage
              src={secondaryImage}
              alt={`${product.name} secondary view`}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 30vw"
              className="object-cover"
              fallbackLabel="Product image"
            />
          </div>
        ) : null}
      </div>

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

      <label className="mt-4 flex items-start gap-2 text-xs text-[var(--color-muted)]">
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
          className="flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-2 text-sm uppercase tracking-[0.14em] text-[var(--color-text)] transition hover:border-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!ack}
          onClick={() => addItem(product.id, 1)}
        >
          Add to Cart
        </button>
        <Link
          className="rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm uppercase tracking-[0.14em] text-[var(--color-text)]"
          href={`/product/${product.slug}`}
        >
          View
        </Link>
      </div>
    </article>
  );
};
