import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { getAdminDiscountRules, upsertAdminDiscountRule } from '@/lib/services/admin-data';

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  type: z.enum(['percent', 'fixed']),
  minQuantity: z.coerce.number().int().positive(),
  value: z.coerce.number().positive(),
  eligibleProductIds: z.array(z.string()).optional(),
  eligibleCategoryIds: z.array(z.string()).optional(),
  active: z.coerce.boolean(),
  code: z.string().optional(),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await getAdminDiscountRules();
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

  const result = await upsertAdminDiscountRule(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
