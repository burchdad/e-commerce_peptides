import { config as loadEnv } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { categories, faqs, legal, paymentMethods } from '../src/lib/data/site';
import { productImageMap } from '../src/lib/config/images';

loadEnv({ path: '.env.local' });
loadEnv();

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl || !databaseUrl.startsWith('postgresql://')) {
  throw new Error(
    'DATABASE_URL must be a full PostgreSQL connection URL, for example: postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require',
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

type CatalogVariantSeed = {
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  imageOverride?: string;
  isDefault?: boolean;
};

type CatalogProductSeed = {
  name: string;
  slug: string;
  category: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  parentSku: string;
  includesComplimentaryKit: boolean;
  badge?: string;
  attributes: Array<{ label: string; value: string }>;
  images: { primary: string; gallery?: string[]; hover?: string };
  isFeatured?: boolean;
  variants: CatalogVariantSeed[];
};

const targetCatalog: CatalogProductSeed[] = [
  {
    name: 'PAV-Sem (Semaglutide)',
    slug: 'pav-sem',
    category: 'glp-products',
    subtitle: 'Semaglutide research compound with configurable strengths.',
    shortDescription: 'Parent listing for Semaglutide with variant-based strength selection.',
    longDescription: 'PAV-Sem consolidates Semaglutide strengths into a single parent product with variant-level pricing and stock controls.',
    parentSku: 'GLP-PAV-SEM',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: 'Semaglutide' },
      { label: 'Form', value: 'Lyophilized powder' },
      { label: 'Use', value: 'Laboratory research only' },
    ],
    images: productImageMap['reta-5'] ?? { primary: '/images/products/reta-5.png' },
    variants: [
      { name: '2mg', sku: 'GLP-SEM-002', price: 25, stock: 42, isDefault: true },
      { name: '5mg', sku: 'GLP-SEM-005', price: 30, stock: 38 },
      { name: '10mg', sku: 'GLP-SEM-010', price: 40, stock: 29 },
    ],
  },
  {
    name: 'PAV-Ret (Retatrutide)',
    slug: 'pav-ret',
    category: 'glp-products',
    subtitle: 'Retatrutide research compound with configurable strengths.',
    shortDescription: 'Parent listing for Retatrutide with variant-driven pricing and inventory.',
    longDescription: 'PAV-Ret unifies Retatrutide strengths into one storefront product while preserving per-variant stock and SKU controls.',
    parentSku: 'GLP-PAV-RET',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: 'Retatrutide' },
      { label: 'Form', value: 'Lyophilized powder' },
      { label: 'Use', value: 'Laboratory research only' },
    ],
    images: productImageMap['reta-10'] ?? { primary: '/images/products/reta-10.png' },
    isFeatured: true,
    variants: [
      { name: '5mg', sku: 'GLP-RET-005', price: 40, stock: 33, imageOverride: '/images/products/reta-5.png', isDefault: true },
      { name: '10mg', sku: 'GLP-RET-010', price: 55, stock: 24, imageOverride: '/images/products/reta-10.png' },
      { name: '20mg', sku: 'GLP-RET-020', price: 70, stock: 16, imageOverride: '/images/products/reta-20.png' },
    ],
  },
  {
    name: 'PAV-Tir (Tirzepatide)',
    slug: 'pav-tir',
    category: 'glp-products',
    subtitle: 'Tirzepatide research compound with configurable strengths.',
    shortDescription: 'Parent listing for Tirzepatide with variant-aware pricing and stock.',
    longDescription: 'PAV-Tir combines Tirzepatide strength options into one product card and one product page experience.',
    parentSku: 'GLP-PAV-TIR',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: 'Tirzepatide' },
      { label: 'Form', value: 'Lyophilized powder' },
      { label: 'Use', value: 'Laboratory research only' },
    ],
    images: productImageMap['tirz-10'] ?? { primary: '/images/products/tirz-10.png' },
    variants: [
      { name: '10mg', sku: 'GLP-TIR-010', price: 39.99, stock: 22, imageOverride: '/images/products/tirz-10.png', isDefault: true },
      { name: '20mg', sku: 'GLP-TIR-020', price: 60, stock: 14, imageOverride: '/images/products/tirz-20.png' },
    ],
  },
  {
    name: 'Cagri 5mg',
    slug: 'cagri-5mg',
    category: 'recovery',
    subtitle: 'Cagrilintide research peptide.',
    shortDescription: 'Single-strength Cagri listing with variant-aware checkout support.',
    longDescription: 'Cagri 5mg is represented as a parent product with one default variant to preserve variant-aware cart and order flows.',
    parentSku: 'REC-CAGRI-PARENT',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: 'Cagrilintide' },
      { label: 'Strength', value: '5mg' },
    ],
    images: productImageMap['bpc-157-5'] ?? { primary: '/images/products/bpc-157-5.png' },
    variants: [{ name: '5mg', sku: 'REC-CAGRI-005', price: 50, stock: 20, isDefault: true }],
  },
  {
    name: 'Semax 5mg',
    slug: 'semax-5mg',
    category: 'anti-aging',
    subtitle: 'Semax research peptide.',
    shortDescription: 'Single-strength Semax listing with variant-aware checkout support.',
    longDescription: 'Semax 5mg is modeled with one default variant so cart and order workflows remain variant-consistent.',
    parentSku: 'ANTI-SEMAX-PARENT',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: 'Semax' },
      { label: 'Strength', value: '5mg' },
    ],
    images: productImageMap['aod-5'] ?? { primary: '/images/products/aod-5.png' },
    variants: [{ name: '5mg', sku: 'ANTI-SEMAX-005', price: 35, stock: 18, isDefault: true }],
  },
  {
    name: 'Selank 5mg',
    slug: 'selank-5mg',
    category: 'anti-aging',
    subtitle: 'Selank research peptide.',
    shortDescription: 'Single-strength Selank listing with variant-aware checkout support.',
    longDescription: 'Selank 5mg is represented as a parent product with one managed variant for catalog consistency.',
    parentSku: 'ANTI-SELANK-PARENT',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: 'Selank' },
      { label: 'Strength', value: '5mg' },
    ],
    images: productImageMap['aod-5'] ?? { primary: '/images/products/aod-5.png' },
    variants: [{ name: '5mg', sku: 'ANTI-SELANK-005', price: 35, stock: 18, isDefault: true }],
  },
  {
    name: '5AM',
    slug: '5am',
    category: 'anti-aging',
    subtitle: '5AM NAD+ pathway compound.',
    shortDescription: 'Single-strength 5AM listing with variant-aware checkout support.',
    longDescription: '5AM is modeled with one variant to keep storefront display clean while preserving variant labeling in orders.',
    parentSku: 'ANTI-5AM-PARENT',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: '5AM' },
      { label: 'Strength', value: 'Standard' },
    ],
    images: productImageMap['5-amino'] ?? { primary: '/images/products/5-amino.png' },
    variants: [{ name: 'Standard', sku: 'ANTI-5AM-STD', price: 45, stock: 27, isDefault: true }],
  },
  {
    name: 'MotsC',
    slug: 'motsc',
    category: 'anti-aging',
    subtitle: 'MotsC mitochondrial research peptide.',
    shortDescription: 'Single-strength MotsC listing with variant-aware checkout support.',
    longDescription: 'MotsC is represented with one default variant to maintain variant-first cart and order handling.',
    parentSku: 'ANTI-MOTSC-PARENT',
    includesComplimentaryKit: true,
    attributes: [
      { label: 'Compound', value: 'MotsC' },
      { label: 'Strength', value: 'Standard' },
    ],
    images: productImageMap['bpc-157-10'] ?? { primary: '/images/products/bpc-157-10.png' },
    variants: [{ name: 'Standard', sku: 'ANTI-MOTSC-STD', price: 65, stock: 12, isDefault: true }],
  },
  {
    name: 'Bacteriostatic Water 10mL',
    slug: 'bacteriostatic-water-10ml',
    category: 'accessories',
    subtitle: 'Sterile accessory supply.',
    shortDescription: '10mL bacteriostatic water accessory listing.',
    longDescription: 'Accessory supply listed with one default variant for compatibility with variant-aware checkout records.',
    parentSku: 'ACC-BW-010-PARENT',
    includesComplimentaryKit: false,
    attributes: [
      { label: 'Volume', value: '10mL' },
      { label: 'Category', value: 'Accessory' },
    ],
    images: productImageMap['bacteriostatic-water-10ml'] ?? { primary: '/images/accessories/bac-water-10ml.png' },
    variants: [{ name: '10mL', sku: 'ACC-BW-010', price: 6, stock: 120, isDefault: true }],
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        isFuture: category.isFuture,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        isFuture: category.isFuture,
      },
    });
  }

  for (const product of targetCatalog) {
    const category = await prisma.category.findUnique({ where: { slug: product.category } });
    if (!category) continue;

    const defaultVariant = product.variants.find((variant) => variant.isDefault) ?? product.variants[0];
    const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);

    const upserted = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        subtitle: product.subtitle,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        price: defaultVariant.price,
        compareAtPrice: defaultVariant.compareAtPrice ?? null,
        images: product.images,
        stockQuantity: totalStock,
        sku: product.parentSku,
        badge: product.badge ?? null,
        includesComplimentaryKit: product.includesComplimentaryKit,
        attributes: product.attributes,
        isActive: true,
        isFeatured: product.isFeatured ?? false,
        categoryId: category.id,
      },
      create: {
        name: product.name,
        slug: product.slug,
        subtitle: product.subtitle,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        price: defaultVariant.price,
        compareAtPrice: defaultVariant.compareAtPrice ?? null,
        images: product.images,
        stockQuantity: totalStock,
        sku: product.parentSku,
        badge: product.badge ?? null,
        includesComplimentaryKit: product.includesComplimentaryKit,
        attributes: product.attributes,
        isActive: true,
        isFeatured: product.isFeatured ?? false,
        categoryId: category.id,
      },
    });

    for (const [index, variant] of product.variants.entries()) {
      await prisma.productVariant.upsert({
        where: { sku: variant.sku },
        update: {
          productId: upserted.id,
          name: variant.name,
          price: variant.price,
          compareAtPrice: variant.compareAtPrice ?? null,
          stock: variant.stock,
          active: true,
          isDefault: Boolean(variant.isDefault),
          imageOverride: variant.imageOverride ?? null,
          sortOrder: index,
        },
        create: {
          productId: upserted.id,
          name: variant.name,
          sku: variant.sku,
          price: variant.price,
          compareAtPrice: variant.compareAtPrice ?? null,
          stock: variant.stock,
          active: true,
          isDefault: Boolean(variant.isDefault),
          imageOverride: variant.imageOverride ?? null,
          sortOrder: index,
        },
      });
    }

    const variantSkus = product.variants.map((variant) => variant.sku);
    await prisma.productVariant.deleteMany({
      where: {
        productId: upserted.id,
        sku: { notIn: variantSkus },
      },
    });

    const enforcedDefaultSku = (product.variants.find((variant) => variant.isDefault) ?? product.variants[0]).sku;
    await prisma.productVariant.updateMany({
      where: { productId: upserted.id },
      data: { isDefault: false },
    });
    await prisma.productVariant.update({
      where: { sku: enforcedDefaultSku },
      data: { isDefault: true },
    });
  }

  await prisma.product.deleteMany({
    where: {
      slug: {
        notIn: targetCatalog.map((product) => product.slug),
      },
    },
  });

  await prisma.faq.deleteMany();
  for (const [index, faq] of faqs.entries()) {
    await prisma.faq.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        sortOrder: index,
        isActive: true,
      },
    });
  }

  for (const [slug, page] of Object.entries(legal)) {
    await prisma.legalPage.upsert({
      where: { slug },
      update: {
        title: page.title,
        intro: page.intro,
        sections: page.sections,
      },
      create: {
        slug,
        title: page.title,
        intro: page.intro,
        sections: page.sections,
      },
    });
  }

  for (const method of paymentMethods) {
    await prisma.paymentMethodConfig.upsert({
      where: { methodKey: method.id },
      update: {
        label: method.label,
        description: method.description,
        enabled: method.enabled,
        mode: method.mode,
      },
      create: {
        methodKey: method.id,
        label: method.label,
        description: method.description,
        enabled: method.enabled,
        mode: method.mode,
      },
    });
  }

  const shippingDefaults = [
    { name: 'USPS Priority', carrier: 'USPS', price: 9.95, eta: '2-4 business days', description: 'Tracked USPS priority shipping.', active: true, sortOrder: 1 },
    { name: 'UPS Ground', carrier: 'UPS', price: 12.95, eta: '2-5 business days', description: 'Tracked UPS ground shipping.', active: true, sortOrder: 2 },
  ];

  for (const method of shippingDefaults) {
    await prisma.shippingMethod.upsert({
      where: { id: `${method.carrier}-${method.sortOrder}` },
      update: {
        name: method.name,
        carrier: method.carrier,
        price: method.price,
        eta: method.eta,
        description: method.description,
        active: method.active,
        sortOrder: method.sortOrder,
      },
      create: {
        id: `${method.carrier}-${method.sortOrder}`,
        name: method.name,
        carrier: method.carrier,
        price: method.price,
        eta: method.eta,
        description: method.description,
        active: method.active,
        sortOrder: method.sortOrder,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
