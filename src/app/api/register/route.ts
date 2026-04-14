import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.phone || !body.address) {
    return NextResponse.json({ error: 'Missing required registration fields' }, { status: 400 });
  }

  const acknowledgements = body.acknowledgements ?? {};
  const allAcknowledged = ['informationAccurate', 'termsAccepted', 'verificationAccepted'].every(
    (key) => acknowledgements[key] === true,
  );

  if (!allAcknowledged) {
    return NextResponse.json({ error: 'All legal acknowledgements are required' }, { status: 400 });
  }

  // TODO: Persist registration record and notify admin inbox.
  return NextResponse.json({ success: true }, { status: 200 });
}
