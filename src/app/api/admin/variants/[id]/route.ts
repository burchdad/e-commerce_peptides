import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { deleteAdminProductVariant, updateAdminProductVariant } from '@/lib/services/admin-data';

const schema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  price: z.coerce.number().positive().optional(),
  compareAtPrice: z.coerce.number().positive().optional().nullable(),
  stock: z.coerce.number().int().nonnegative().optional(),
  active: z.coerce.boolean().optional(),
  isDefault: z.coerce.boolean().optional(),
  imageOverride: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = await params;
  const result = await updateAdminProductVariant(id, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: result.data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const result = await deleteAdminProductVariant(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
