import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { getAdminShippingMethods, upsertAdminShippingMethod } from '@/lib/services/admin-data';

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  carrier: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  eta: z.string().min(1),
  description: z.string().min(1),
  active: z.coerce.boolean(),
  sortOrder: z.coerce.number().int(),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await getAdminShippingMethods();
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

  const result = await upsertAdminShippingMethod(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
