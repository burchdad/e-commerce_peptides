import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createAgeGateRegistrant } from '@/lib/services/admin-data';

const COOKIE_KEY = 'pv_age_gate_expires';
const EXPIRY_DAYS = 30;

const schema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  dob: z.string().min(8),
  verifiedAt: z.string().min(8),
});

const isAtLeast21 = (dob: string) => {
  const normalizedDob = dob.trim();
  const isoLikeMatch = normalizedDob.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  const usLikeMatch = normalizedDob.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);

  let year = 0;
  let month = 0;
  let day = 0;

  if (isoLikeMatch) {
    year = Number(isoLikeMatch[1]);
    month = Number(isoLikeMatch[2]);
    day = Number(isoLikeMatch[3]);
  } else if (usLikeMatch) {
    month = Number(usLikeMatch[1]);
    day = Number(usLikeMatch[2]);
    year = Number(usLikeMatch[3]);
  }

  if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const birth = new Date(year, month - 1, day, 12, 0, 0, 0);
  const dateIsValid =
    !Number.isNaN(birth.getTime()) &&
    birth.getFullYear() === year &&
    birth.getMonth() === month - 1 &&
    birth.getDate() === day;

  if (!dateIsValid) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDelta = today.getMonth() - birth.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= 21;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    console.warn('[age-gate/register] invalid payload');
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!isAtLeast21(parsed.data.dob)) {
    console.warn('[age-gate/register] underage or invalid dob');
    return NextResponse.json({ error: 'Age verification failed.' }, { status: 400 });
  }

  const expiresAt = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const result = await createAgeGateRegistrant(parsed.data);
  if (!result.ok) {
    console.warn('[age-gate/register] failed to persist registrant');
    return NextResponse.json({ error: 'Unable to save registrant.' }, { status: 500 });
  }

  const response = NextResponse.json({ success: true, persisted: result.persisted, expiresAt });
  response.cookies.set({
    name: COOKIE_KEY,
    value: String(expiresAt),
    maxAge: EXPIRY_DAYS * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  });

  console.info('[age-gate/register] success', { persisted: result.persisted, expiresAt });
  return response;
}
