'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { CartItem, Product, ResolvedCartItem } from '@/lib/types';
import { getDefaultActiveVariant, getInitialVariantSelection, resolveVariantForProduct } from '@/lib/utils/variants';

type CartContextShape = {
  items: CartItem[];
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  cartCount: number;
  resolveItems: (catalog: Product[]) => ResolvedCartItem[];
};

const CartContext = createContext<CartContextShape | null>(null);

const STORAGE_KEY = 'pv-cart-v3';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, variantId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId && item.variantId === variantId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId, variantId, quantity }];
    });
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeItem = (productId: string, variantId: string) => {
    setItems((current) =>
      current.filter((item) => !(item.productId === productId && item.variantId === variantId)),
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const resolveItems = (catalog: Product[]) =>
    items
      .map((item) => {
        const product = catalog.find((entry) => entry.id === item.productId);
        if (!product) return null;
        const variantFromSelection = item.variantId ? resolveVariantForProduct(product, item.variantId) : null;
        const defaultVariant = getDefaultActiveVariant(product);
        const initialVariantId = getInitialVariantSelection(product);
        const variant = variantFromSelection ?? (defaultVariant ? resolveVariantForProduct(product, defaultVariant.id) : resolveVariantForProduct(product, initialVariantId));
        if (!variant) return null;
        return { product, variant, quantity: item.quantity };
      })
      .filter((entry): entry is ResolvedCartItem => Boolean(entry));

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        cartCount,
        resolveItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
