import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { getAdminLegalPages } from '@/lib/services/admin-data';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await getAdminLegalPages();
  return NextResponse.json({ data });
}
