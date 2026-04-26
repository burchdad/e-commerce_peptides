import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import { deleteAdminCoadocument } from '@/lib/services/admin-data';

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const result = await deleteAdminCoadocument(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
