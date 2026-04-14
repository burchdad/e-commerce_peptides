import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import sharp from 'sharp';

import { isAdminAuthenticated } from '@/lib/auth/admin';

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const MOCKUP_WIDTH = 1200;
const MOCKUP_HEIGHT = 1500;

const renderBottleMockup = async (sourceImage: Uint8Array) => {
  const LABEL_WIDTH = 500;
  const LABEL_HEIGHT = 480;

  const labelImage = await sharp(sourceImage)
    .resize({
      width: LABEL_WIDTH,
      height: LABEL_HEIGHT,
      fit: 'contain',
      background: { r: 248, g: 245, b: 240, alpha: 1 },
    })
    .png()
    .toBuffer();

  const scene = `
    <svg width="${MOCKUP_WIDTH}" height="${MOCKUP_HEIGHT}" viewBox="0 0 ${MOCKUP_WIDTH} ${MOCKUP_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7A0C12"/>
          <stop offset="100%" stop-color="#1A1A1A"/>
        </linearGradient>
        <radialGradient id="goldGlow" cx="20%" cy="12%" r="55%">
          <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E2E7EE"/>
          <stop offset="50%" stop-color="#A8B1BC"/>
          <stop offset="100%" stop-color="#E1E6EC"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#goldGlow)"/>
      <rect x="500" y="152" width="200" height="175" rx="28" fill="url(#cap)" stroke="#D4AF37" stroke-opacity="0.24"/>
      <rect x="410" y="280" width="380" height="980" rx="180" fill="#EDEFF2" fill-opacity="0.15" stroke="#F8F5F0" stroke-opacity="0.34"/>
      <rect x="450" y="488" width="300" height="504" rx="18" fill="#F8F5F0" fill-opacity="0.92" stroke="#D4AF37" stroke-opacity="0.38"/>
      <ellipse cx="600" cy="1260" rx="240" ry="42" fill="#000" fill-opacity="0.4"/>
    </svg>
  `;

  const gloss = `
    <svg width="${MOCKUP_WIDTH}" height="${MOCKUP_HEIGHT}" viewBox="0 0 ${MOCKUP_WIDTH} ${MOCKUP_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect x="468" y="330" width="46" height="640" rx="22" fill="#fff" fill-opacity="0.26" transform="rotate(-8 468 330)"/>
      <rect x="0" y="0" width="1200" height="1500" fill="none" stroke="#D4AF37" stroke-opacity="0.14"/>
    </svg>
  `;

  return sharp({
    create: {
      width: MOCKUP_WIDTH,
      height: MOCKUP_HEIGHT,
      channels: 4,
      background: '#1A1A1A',
    },
  })
    .composite([
      { input: Buffer.from(scene), left: 0, top: 0 },
      { input: labelImage, left: Math.round((MOCKUP_WIDTH - LABEL_WIDTH) / 2), top: 500 },
      { input: Buffer.from(gloss), left: 0, top: 0 },
    ])
    .png({ quality: 92 })
    .toBuffer();
};

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

  const renderStyle = String(formData.get('renderStyle') ?? 'plain');
  const shouldRenderBottle = renderStyle === 'product-bottle';

  const uploadDir = join(process.cwd(), 'public', 'uploads');
  const bytes = new Uint8Array(await file.arrayBuffer());

  let outputBytes: Uint8Array = bytes;
  let outputExt = ext;

  if (shouldRenderBottle) {
    try {
      outputBytes = await renderBottleMockup(bytes);
      outputExt = 'png';
    } catch (err) {
      console.error('Bottle mockup generation failed, falling back to original upload:', err);
    }
  }

  const filename = `${randomUUID()}.${outputExt}`;
  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (hasBlobToken) {
    try {
      const blob = await put(`uploads/${filename}`, Buffer.from(outputBytes), {
        access: 'public',
        contentType: outputExt === 'png' ? 'image/png' : file.type,
        addRandomSuffix: false,
      });

      return NextResponse.json({
        url: blob.url,
        transformed: shouldRenderBottle && outputExt === 'png',
        renderStyle: shouldRenderBottle ? 'product-bottle' : 'plain',
      });
    } catch (err) {
      console.error('Blob upload failed:', err);
      return NextResponse.json(
        { error: 'Failed to upload image to Blob storage.' },
        { status: 500 },
      );
    }
  }

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, filename), outputBytes);
    return NextResponse.json({
      url: `/uploads/${filename}`,
      transformed: shouldRenderBottle && outputExt === 'png',
      renderStyle: shouldRenderBottle ? 'product-bottle' : 'plain',
    });
  } catch (err) {
    console.error('Upload write failed:', err);
    return NextResponse.json(
      { error: 'Failed to save file. Use a URL instead for cloud deployments.' },
      { status: 500 },
    );
  }
}
