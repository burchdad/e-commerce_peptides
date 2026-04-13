import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.subject || !body.message) {
    return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 });
  }

  // TODO: Route message to merchant support inbox.
  return NextResponse.json({ success: true }, { status: 200 });
}
