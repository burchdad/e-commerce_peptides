import { PrismaClient } from '@prisma/client';

import { categories, faqs, legal, paymentMethods, products } from '../src/lib/data/site';

const prisma = new PrismaClient();

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
