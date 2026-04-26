import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { getAdminCoadocuments, upsertAdminCoadocument } from '@/lib/services/admin-data';

const schema = z.object({
  id: z.string().optional(),
  productId: z.string().min(1),
  batchNumber: z.string().min(1),
  purityPercent: z.coerce.number().min(0).max(100),
  labName: z.string().min(1),
  testDate: z.string().min(8),
  pdfUrl: z.string().url(),
  active: z.coerce.boolean(),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await getAdminCoadocuments();
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

  const result = await upsertAdminCoadocument(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
