import type { StoredOrderRequest } from '@/lib/types';
import { siteConfig } from '@/lib/config/site-config';

const logTemplate = (event: string, payload: Record<string, unknown>) => {
  console.info(`[email-stub:${event}]`, payload);
};

const fromAddress = process.env.EMAIL_FROM ?? siteConfig.supportEmail;

const getOrderEmailBlock = (order: StoredOrderRequest) => {
  const items = order.items.map((item) => ({
    name: item.productName,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineTotal: item.unitPrice * item.quantity,
  }));

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);

  return {
    orderId: order.orderReference,
    items,
    total,
  };
};

export const sendOrderReceivedEmail = async (order: StoredOrderRequest) => {
  logTemplate('order-received', {
    from: fromAddress,
    orderReference: order.orderReference,
    email: order.email,
    subject: 'Order Request Received',
    body:
      'Your order request has been received and is currently pending review. We will follow up with next steps shortly.',
    itemCount: order.items.length,
  });
};

export const sendOrderApprovedEmail = async (order: StoredOrderRequest) => {
  logTemplate('order-approved', {
    from: fromAddress,
    orderReference: order.orderReference,
    email: order.email,
    subject: 'Order Approved',
    body: 'Your order has been approved and is moving to payment preparation.',
  });
};

export const sendPaymentInstructionsEmail = async (order: StoredOrderRequest) => {
  const orderBlock = getOrderEmailBlock(order);

  logTemplate('payment-instructions', {
    from: fromAddress,
    ...orderBlock,
    email: order.email,
    subject: `Payment Instructions for ${order.orderReference}`,
    sections: {
      header: `Order ${order.orderReference} is ready for payment.`,
      instructionBlock: order.paymentInstructions ?? '',
      paymentLink: order.paymentLink ?? null,
    },
  });
};

export const sendOrderCompletedEmail = async (order: StoredOrderRequest) => {
  logTemplate('order-completed', {
    from: fromAddress,
    orderReference: order.orderReference,
    email: order.email,
    subject: 'Order Completed',
    body: 'Your order workflow has been completed. Thank you for your order request.',
  });
};

export const sendAdminNotification = async (order: StoredOrderRequest, event: string) => {
  logTemplate('admin-notification', {
    from: fromAddress,
    event,
    orderReference: order.orderReference,
    customerName: order.customerName,
    status: order.status,
    paymentMethodLabel: order.paymentMethodLabel,
  });
};

export const sendOrderConfirmation = sendOrderReceivedEmail;