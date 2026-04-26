import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { createAdminProductVariant, getAdminProductVariants } from '@/lib/services/admin-data';

const schema = z.object({
  productId: z.string().min(2),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().positive().optional().nullable(),
  stock: z.coerce.number().int().nonnegative(),
  active: z.coerce.boolean().optional(),
  imageOverride: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().optional(),
});

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const productId = url.searchParams.get('productId');
  if (!productId) {
    return NextResponse.json({ data: [] });
  }

  const data = await getAdminProductVariants(productId);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const result = await createAdminProductVariant(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
