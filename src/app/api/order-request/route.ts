import { NextResponse } from 'next/server';
import { z } from 'zod';

import { paymentMethods } from '@/lib/data/site';
import { hasDatabaseUrl, prisma } from '@/lib/db';

const schema = z.object({
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  shippingAddress: z.string().min(4),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(2),
  country: z.string().min(2),
  notes: z.string().optional(),
  paymentMethodId: z.string().min(2),
  acknowledgements: z.object({
    age21Plus: z.literal(true),
    researchUseOnly: z.literal(true),
    noMedicalRelationship: z.literal(true),
    termsAccepted: z.literal(true),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().optional(),
        productName: z.string().min(2),
        sku: z.string().optional(),
        unitPrice: z.coerce.number().positive(),
        quantity: z.coerce.number().int().positive(),
      }),
    )
    .min(1),
});

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const orderReference = `REQ-${Date.now()}`;
  const selectedPayment = paymentMethods.find((method) => method.id === data.paymentMethodId);

  if (hasDatabaseUrl) {
    try {
      await prisma!.orderRequest.create({
        data: {
          orderReference,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          shippingAddress: data.shippingAddress,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          notes: data.notes,
          paymentMethodId: data.paymentMethodId,
          paymentMethodLabel: selectedPayment?.label ?? data.paymentMethodId,
          acknowledgements: data.acknowledgements,
          items: {
            create: data.items.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              sku: item.sku,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },
      });
    } catch {
      return NextResponse.json({ error: 'Unable to persist order request.' }, { status: 500 });
    }
  }

  // TODO: Trigger transactional email notifications for customer and admin inbox.
  return NextResponse.json({ success: true, orderReference }, { status: 200 });
}
