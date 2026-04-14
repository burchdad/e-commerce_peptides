'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { SafeImage } from '@/components/ui/safe-image';
import { useCart } from '@/context/cart-context';
import { products } from '@/lib/data/site';
import { currency } from '@/lib/utils/format';

export default function CartPage() {
  const { resolveItems, updateQuantity, removeItem } = useCart();
  const resolved = useMemo(() => resolveItems(products), [resolveItems]);
  const subtotal = resolved.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="space-y-6">
      <h1 className="section-title">Cart</h1>
      {resolved.length === 0 ? (
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_12px_30px_rgba(17,17,17,0.06)]">
          <p className="text-[var(--color-muted)]">Your cart is empty.</p>
          <Link className="btn-primary mt-4 inline-block" href="/shop">Start Shopping</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {resolved.map((item) => (
              <div key={item.product.id} className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-4 shadow-[0_12px_30px_rgba(17,17,17,0.06)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                      <SafeImage
                        src={item.product.images.primary}
                        alt={item.product.name}
                        sizes="96px"
                        className="object-cover"
                        fallbackLabel="Product"
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl text-[var(--color-text)]">{item.product.name}</h2>
                      <p className="text-sm text-[var(--color-muted)]">{currency(item.product.price)} each</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">Line total: {currency(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="h-11 w-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-lg text-[var(--color-text)] transition hover:border-[var(--color-gold)]" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label={`Decrease quantity for ${item.product.name}`}>−</button>
                    <span className="min-w-10 text-center text-base font-semibold text-[var(--color-text)]">{item.quantity}</span>
                    <button className="h-11 w-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-lg text-[var(--color-text)] transition hover:border-[var(--color-gold)]" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label={`Increase quantity for ${item.product.name}`}>+</button>
                    <button className="rounded-xl border border-red-300 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 md:ml-3" onClick={() => removeItem(item.product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_12px_30px_rgba(17,17,17,0.06)]">
            <p className="flex justify-between text-lg text-[var(--color-text)]"><span>Subtotal</span><strong>{currency(subtotal)}</strong></p>
            <p className="mt-3 text-sm text-[var(--color-muted)]">Orders are subject to review and confirmation.</p>
            <Link className="btn-primary mt-5 inline-flex" href="/checkout">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
