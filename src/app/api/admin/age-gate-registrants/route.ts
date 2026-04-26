import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { getAdminAgeGateRegistrants } from '@/lib/services/admin-data';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await getAdminAgeGateRegistrants();
  return NextResponse.json({ data });
}
