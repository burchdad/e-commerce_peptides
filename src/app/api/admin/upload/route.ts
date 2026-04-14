import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/auth/admin';

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF.' },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum 5 MB.' }, { status: 400 });
  }

  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  const bytes = await file.arrayBuffer();

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, filename), Buffer.from(bytes));
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error('Upload write failed:', err);
    return NextResponse.json(
      { error: 'Failed to save file. Use a URL instead for cloud deployments.' },
      { status: 500 },
    );
  }
}
