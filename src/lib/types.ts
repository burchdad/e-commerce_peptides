export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  isFuture: boolean;
};

export type ProductAttribute = {
  label: string;
  value: string;
};

export type ProductImageMap = {
  primary: string;
  gallery?: string[];
  hover?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImageMap;
  stockQuantity: number;
  sku: string;
  badge?: string;
  includesComplimentaryKit: boolean;
  attributes: ProductAttribute[];
  isActive: boolean;
  isFeatured: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LegalContent = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type PaymentMethod = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  mode: 'manual' | 'invoice' | 'placeholder';
};

export type OrderAcknowledgements = {
  informationAccurate: boolean;
  termsAccepted: boolean;
  verificationAccepted: boolean;
};

export type OrderWorkflowStatus =
  | 'pending'
  | 'reviewing'
  | 'approved'
  | 'payment-sent'
  | 'completed'
  | 'cancelled';

export type OrderTimeline = {
  createdAt: string;
  reviewedAt?: string;
  approvedAt?: string;
  paymentSentAt?: string;
  completedAt?: string;
  cancelledAt?: string;
};

export type ConversionStatus = 'unpaid' | 'paid';

export type OrderRequest = {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethodId: string;
  notes?: string;
  acknowledgements: OrderAcknowledgements;
  items: Array<{
    productId?: string;
    productName: string;
    sku?: string;
    unitPrice: number;
    quantity: number;
  }>;
};

export type StoredOrderRequest = OrderRequest & {
  id: string;
  orderReference: string;
  paymentMethodLabel: string;
  status: OrderWorkflowStatus;
  conversionStatus: ConversionStatus;
  paymentInstructions?: string;
  paymentLink?: string;
  followUpAt?: string;
  needsFollowUp: boolean;
  timeline: OrderTimeline;
  createdAt: string;
  updatedAt: string;
};
