import { NextResponse } from 'next/server';

import { createAgeGateRegistrant } from '@/lib/services/admin-data';

const COOKIE_KEY = 'pv_age_gate_expires';
const EXPIRY_DAYS = 30;

/**
 * Handles the native (pre-hydration) form POST from the age gate modal.
 * Validates the form fields, sets the verification cookie, and redirects back.
 */
export async function POST(request: Request) {
  let body: URLSearchParams;
  try {
    const text = await request.text();
    body = new URLSearchParams(text);
  } catch {
    return NextResponse.redirect(new URL('/', new URL(request.url).origin), 303);
  }

  const firstName = (body.get('firstName') ?? '').trim();
  const email = (body.get('email') ?? '').trim();
  const dob = (body.get('dob') ?? '').trim();
  const confirmed = body.has('confirmed21Plus');

  const referer = request.headers.get('referer') ?? '/';
  const origin = new URL(request.url).origin;
  const redirectTo = referer.startsWith(origin) ? referer : '/';

  // If any required field is missing or the user didn't confirm age, redirect back with error query.
  const emailValid = email.length > 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!firstName || !emailValid || !dob || !confirmed) {
    const errorUrl = new URL(redirectTo);
    errorUrl.searchParams.set('age_gate_error', '1');
    return NextResponse.redirect(errorUrl.toString(), 303);
  }

  // Validate date of birth and minimum age (21).
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

  let ageOk = false;
  if (year >= 1900 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    const birth = new Date(year, month - 1, day, 12, 0, 0, 0);
    const dateIsValid =
      !isNaN(birth.getTime()) &&
      birth.getFullYear() === year &&
      birth.getMonth() === month - 1 &&
      birth.getDate() === day;

    if (dateIsValid) {
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const md = today.getMonth() - birth.getMonth();
      if (md < 0 || (md === 0 && today.getDate() < birth.getDate())) age--;
      ageOk = age >= 21;
    }
  }

  if (!ageOk) {
    const errorUrl = new URL(redirectTo);
    errorUrl.searchParams.set('age_gate_error', 'underage');
    return NextResponse.redirect(errorUrl.toString(), 303);
  }

  // Set the verification cookie so the modal won't show again.
  const expires = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const maxAge = EXPIRY_DAYS * 24 * 60 * 60;
  const isHttps = new URL(request.url).protocol === 'https:';
  const secure = isHttps ? '; Secure' : '';

  const response = NextResponse.redirect(redirectTo, 303);
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_KEY}=${expires}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`,
  );

  // Persist registrant in the background (best-effort; don't block the redirect).
  void createAgeGateRegistrant({
    firstName,
    email,
    dob,
    verifiedAt: new Date().toISOString(),
  }).catch(() => undefined);

  return response;
}
