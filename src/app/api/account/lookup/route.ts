import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getOrderRequestRecord } from '@/lib/services/order-requests';

const schema = z.object({
  email: z.string().email(),
  orderReference: z.string().min(3),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Please provide a valid email and order reference.' }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const orderReference = parsed.data.orderReference.trim();

  const order = await getOrderRequestRecord(orderReference);
  if (!order || order.email.trim().toLowerCase() !== email) {
    return NextResponse.json({ error: 'No order found for that email and reference.' }, { status: 404 });
  }

  return NextResponse.json(
    {
      orderReference: order.orderReference,
      status: order.status,
      conversionStatus: order.conversionStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      paymentMethodLabel: order.paymentMethodLabel,
    },
    { status: 200 },
  );
}
