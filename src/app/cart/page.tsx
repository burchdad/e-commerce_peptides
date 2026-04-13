'use client';

import Link from 'next/link';
import { useMemo } from 'react';

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
        <div className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-8 text-center">
          <p className="text-[var(--color-sand)]">Your cart is empty.</p>
          <Link className="mt-4 inline-block rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" href="/shop">Start Shopping</Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {resolved.map((item) => (
              <div key={item.product.id} className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl text-[var(--color-ivory)]">{item.product.name}</h2>
                    <p className="text-sm text-[var(--color-sand)]">{currency(item.product.price)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded border border-[var(--color-gold-soft)] px-3 py-1" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <span className="min-w-8 text-center">{item.quantity}</span>
                    <button className="rounded border border-[var(--color-gold-soft)] px-3 py-1" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                    <button className="ml-3 rounded border border-red-500/60 px-3 py-1 text-red-300" onClick={() => removeItem(item.product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
            <p className="flex justify-between text-lg"><span>Subtotal</span><strong>{currency(subtotal)}</strong></p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">Every peptide purchase includes a complimentary research kit.</p>
            <Link className="mt-4 inline-block rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" href="/checkout">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
