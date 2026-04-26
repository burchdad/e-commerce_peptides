import { config as loadEnv } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { categories, faqs, legal, paymentMethods, products } from '../src/lib/data/site';

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

  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { slug: product.category } });
    if (!category) continue;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        subtitle: product.subtitle,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        price: product.price,
        compareAtPrice: product.compareAtPrice ?? null,
        images: product.images,
        stockQuantity: product.stockQuantity,
        sku: product.sku,
        badge: product.badge ?? null,
        includesComplimentaryKit: product.includesComplimentaryKit,
        attributes: product.attributes,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        categoryId: category.id,
      },
      create: {
        name: product.name,
        slug: product.slug,
        subtitle: product.subtitle,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        price: product.price,
        compareAtPrice: product.compareAtPrice ?? null,
        images: product.images,
        stockQuantity: product.stockQuantity,
        sku: product.sku,
        badge: product.badge ?? null,
        includesComplimentaryKit: product.includesComplimentaryKit,
        attributes: product.attributes,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        categoryId: category.id,
      },
    });
  }

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

  const allProducts = await prisma.product.findMany({ select: { id: true, name: true, sku: true, price: true, compareAtPrice: true, stockQuantity: true } });
  for (const [index, product] of allProducts.entries()) {
    const existingVariant = await prisma.productVariant.findFirst({ where: { productId: product.id } });
    if (existingVariant) continue;
    await prisma.productVariant.create({
      data: {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        stock: product.stockQuantity,
        active: true,
        sortOrder: index,
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
