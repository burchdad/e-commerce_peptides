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
  images: string[];
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
  acknowledgements: {
    age21Plus: boolean;
    researchUseOnly: boolean;
    noMedicalRelationship: boolean;
    termsAccepted: boolean;
  };
  items: Array<{
    productId?: string;
    productName: string;
    sku?: string;
    unitPrice: number;
    quantity: number;
  }>;
};
