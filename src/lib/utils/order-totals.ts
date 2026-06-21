import type { StoredOrderRequest } from '@/lib/types';

export type OrderTotals = {
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  grandTotal: number;
};

const money = (value: number) => Math.round(value * 100) / 100;

export const getOrderTotals = (order: Pick<StoredOrderRequest, 'items' | 'discountAmount' | 'shippingAmount' | 'taxAmount'>): OrderTotals => {
  const subtotal = order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.max(0, order.discountAmount ?? 0);
  const shippingAmount = Math.max(0, order.shippingAmount ?? 0);
  const taxAmount = Math.max(0, order.taxAmount ?? 0);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingAmount + taxAmount);

  return {
    subtotal: money(subtotal),
    discountAmount: money(discountAmount),
    shippingAmount: money(shippingAmount),
    taxAmount: money(taxAmount),
    grandTotal: money(grandTotal),
  };
};
