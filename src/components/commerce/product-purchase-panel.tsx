'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { currency } from '@/lib/utils/format';

export const ProductPurchasePanel = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [added, setAdded] = useState(false);

  const updateQuantity = (nextQuantity: number) => {
    setQuantity(Math.max(1, nextQuantity));
  };

  const onAddToCart = () => {
    if (!accepted) return;

    addItem(product.id, quantity);
    setAdded(true);
  };

  return (
    <div className="premium-surface rounded-[1.6rem] p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">{product.category.replace('-', ' ')}</p>
      <h1 className="mt-3 font-serif text-4xl text-[var(--color-text)] md:text-5xl">{product.name}</h1>
      <p className="mt-3 text-lg text-[var(--color-muted)]">{product.subtitle}</p>
      <p className="mt-5 text-[var(--color-muted)]">{product.shortDescription}</p>

      <div className="mt-6 flex items-end gap-3">
        <p className="font-serif text-4xl text-[var(--color-text)]">{currency(product.price)}</p>
        {product.compareAtPrice ? <p className="pb-1 text-[var(--color-muted)] line-through">{currency(product.compareAtPrice)}</p> : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.14)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]" />
          High demand product
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(248,245,240,0.2)] bg-[rgba(248,245,240,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ivory)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ivory)]" />
          Limited availability
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(248,245,240,0.2)] bg-[rgba(248,245,240,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ivory)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ivory)]" />
          Ships within 24–48 hrs
        </span>
      </div>

      <div className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">Quantity</p>
        <div className="mt-3 inline-flex items-center rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-depth)_74%,var(--color-brand-red)_26%)] p-1">
          <button
            type="button"
            className="h-11 w-11 rounded-lg text-xl text-[var(--color-text)] transition hover:bg-[rgba(248,245,240,0.08)] disabled:cursor-not-allowed disabled:opacity-45"
            onClick={() => updateQuantity(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-12 text-center text-base font-semibold text-[var(--color-text)]">{quantity}</span>
          <button
            type="button"
            className="h-11 w-11 rounded-lg text-xl text-[var(--color-text)] transition hover:bg-[rgba(248,245,240,0.08)]"
            onClick={() => updateQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-depth)_74%,var(--color-brand-red)_26%)] p-4">
        <label className="flex items-start gap-3 text-sm leading-6 text-[var(--color-text)]">
          <input
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[var(--color-gold)]"
          />
          <span>I confirm I meet all required conditions and accept the terms of purchase.</span>
        </label>
        {!accepted ? <p className="mt-3 text-xs text-[var(--color-muted)]">Accept the required terms to enable add to cart.</p> : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="btn-primary flex-1" type="button" disabled={!accepted} onClick={onAddToCart}>
          {added ? 'Added to Cart' : 'Add to Cart'}
        </button>
        <Link className="btn-secondary flex-1 text-center" href="/cart">
          View Cart
        </Link>
      </div>

      <p className="mt-4 text-sm text-[var(--color-muted)]">Orders are subject to review and confirmation before fulfillment details are provided.</p>
    </div>
  );
};