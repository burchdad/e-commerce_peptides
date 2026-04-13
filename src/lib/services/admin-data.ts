import {
  type OrderStatus,
  type PaymentStatus,
  type Prisma,
  type Product as PrismaProduct,
} from '@prisma/client';

import { categories, faqs, legal, products } from '@/lib/data/site';
import { hasDatabaseUrl, prisma } from '@/lib/db';

type ProductInput = {
  name: string;
  slug: string;
  categorySlug: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  stockQuantity: number;
  sku: string;
  isActive?: boolean;
  isFeatured?: boolean;
  includesComplimentaryKit?: boolean;
};

const toProduct = (product: PrismaProduct & { category: { slug: string } }) => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  category: product.category.slug,
  subtitle: product.subtitle,
  shortDescription: product.shortDescription,
  longDescription: product.longDescription,
  price: Number(product.price),
  compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : undefined,
  images: (product.images as string[]) ?? [],
  stockQuantity: product.stockQuantity,
  sku: product.sku,
  badge: product.badge ?? undefined,
  includesComplimentaryKit: product.includesComplimentaryKit,
  attributes: (product.attributes as Array<{ label: string; value: string }>) ?? [],
  isActive: product.isActive,
  isFeatured: product.isFeatured,
});

export const getAdminProducts = async () => {
  if (!hasDatabaseUrl) return products;
  try {
    const rows = await prisma!.product.findMany({ include: { category: true }, orderBy: { updatedAt: 'desc' } });
    return rows.map(toProduct);
  } catch {
    return products;
  }
};

export const createAdminProduct = async (input: ProductInput) => {
  if (!hasDatabaseUrl) {
    return { ok: false, message: 'DATABASE_URL not configured. Use local seed data mode.' };
  }

  const category = await prisma!.category.findUnique({ where: { slug: input.categorySlug } });
  if (!category) {
    return { ok: false, message: 'Category not found.' };
  }

  const data: Prisma.ProductCreateInput = {
    name: input.name,
    slug: input.slug,
    subtitle: input.subtitle,
    shortDescription: input.shortDescription,
    longDescription: input.longDescription,
    price: input.price,
    compareAtPrice: null,
    images: [],
    stockQuantity: input.stockQuantity,
    sku: input.sku,
    badge: null,
    includesComplimentaryKit: input.includesComplimentaryKit ?? false,
    attributes: [],
    isActive: input.isActive ?? true,
    isFeatured: input.isFeatured ?? false,
    category: { connect: { id: category.id } },
  };

  await prisma!.product.create({ data });
  return { ok: true, message: 'Product created.' };
};

export const updateAdminProduct = async (id: string, patch: Partial<ProductInput>) => {
  if (!hasDatabaseUrl) {
    return { ok: false, message: 'DATABASE_URL not configured. Use local seed data mode.' };
  }

  const data: Prisma.ProductUpdateInput = {};

  if (patch.name !== undefined) data.name = patch.name;
  if (patch.slug !== undefined) data.slug = patch.slug;
  if (patch.subtitle !== undefined) data.subtitle = patch.subtitle;
  if (patch.shortDescription !== undefined) data.shortDescription = patch.shortDescription;
  if (patch.longDescription !== undefined) data.longDescription = patch.longDescription;
  if (patch.price !== undefined) data.price = patch.price;
  if (patch.stockQuantity !== undefined) data.stockQuantity = patch.stockQuantity;
  if (patch.sku !== undefined) data.sku = patch.sku;
  if (patch.isActive !== undefined) data.isActive = patch.isActive;
  if (patch.isFeatured !== undefined) data.isFeatured = patch.isFeatured;
  if (patch.includesComplimentaryKit !== undefined) {
    data.includesComplimentaryKit = patch.includesComplimentaryKit;
  }

  if (patch.categorySlug) {
    const category = await prisma!.category.findUnique({ where: { slug: patch.categorySlug } });
    if (!category) {
      return { ok: false, message: 'Category not found.' };
    }
    data.category = { connect: { id: category.id } };
  }

  await prisma!.product.update({ where: { id }, data });
  return { ok: true, message: 'Product updated.' };
};

export const getAdminFaqs = async () => {
  if (!hasDatabaseUrl) return faqs;
  try {
    const rows = await prisma!.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
    return rows.map((row) => ({ id: row.id, question: row.question, answer: row.answer }));
  } catch {
    return faqs;
  }
};

export const createAdminFaq = async (question: string, answer: string) => {
  if (!hasDatabaseUrl) {
    return { ok: false, message: 'DATABASE_URL not configured. Use local seed data mode.' };
  }

  const maxSort = await prisma!.faq.aggregate({ _max: { sortOrder: true } });
  await prisma!.faq.create({
    data: {
      question,
      answer,
      sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
      isActive: true,
    },
  });

  return { ok: true, message: 'FAQ created.' };
};

export const updateAdminFaq = async (id: string, question?: string, answer?: string) => {
  if (!hasDatabaseUrl) {
    return { ok: false, message: 'DATABASE_URL not configured. Use local seed data mode.' };
  }

  await prisma!.faq.update({
    where: { id },
    data: {
      ...(question !== undefined ? { question } : {}),
      ...(answer !== undefined ? { answer } : {}),
    },
  });

  return { ok: true, message: 'FAQ updated.' };
};

export const getAdminLegalPages = async () => {
  if (!hasDatabaseUrl) {
    return Object.entries(legal).map(([slug, page]) => ({
      id: slug,
      slug,
      title: page.title,
      intro: page.intro,
      sections: page.sections,
    }));
  }

  try {
    const rows = await prisma!.legalPage.findMany({ orderBy: { slug: 'asc' } });
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      intro: row.intro,
      sections: row.sections,
    }));
  } catch {
    return Object.entries(legal).map(([slug, page]) => ({
      id: slug,
      slug,
      title: page.title,
      intro: page.intro,
      sections: page.sections,
    }));
  }
};

export const updateAdminLegalPage = async (slug: string, title?: string, intro?: string) => {
  if (!hasDatabaseUrl) {
    return { ok: false, message: 'DATABASE_URL not configured. Use local seed data mode.' };
  }

  await prisma!.legalPage.upsert({
    where: { slug },
    update: {
      ...(title !== undefined ? { title } : {}),
      ...(intro !== undefined ? { intro } : {}),
    },
    create: {
      slug,
      title: title ?? slug,
      intro: intro ?? '',
      sections: [],
    },
  });

  return { ok: true, message: 'Legal page updated.' };
};

export const getAdminOrderRequests = async () => {
  if (!hasDatabaseUrl) return [];
  try {
    return await prisma!.orderRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true },
      take: 50,
    });
  } catch {
    return [];
  }
};

export const updateOrderStatuses = async (
  id: string,
  status: OrderStatus,
  paymentStatus: PaymentStatus,
) => {
  if (!hasDatabaseUrl) {
    return { ok: false, message: 'DATABASE_URL not configured. Use local seed data mode.' };
  }

  await prisma!.orderRequest.update({
    where: { id },
    data: {
      status,
      paymentStatus,
    },
  });

  return { ok: true, message: 'Order status updated.' };
};

export const ensureBaselineCatalogData = async () => {
  if (!hasDatabaseUrl) return;

  const existing = await prisma!.category.count();
  if (existing > 0) return;

  for (const category of categories) {
    await prisma!.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        isFuture: category.isFuture,
      },
    });
  }
};
