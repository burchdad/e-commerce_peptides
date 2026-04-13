import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { updateOrderStatuses } from '@/lib/services/admin-data';

const schema = z.object({
  status: z.enum(['PENDING', 'REVIEWED', 'INVOICED', 'PAID', 'FULFILLED', 'CANCELLED']),
  paymentStatus: z.enum(['UNPAID', 'INVOICED', 'PARTIAL', 'PAID', 'VOID']),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = await params;
  const result = await updateOrderStatuses(id, parsed.data.status, parsed.data.paymentStatus);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
