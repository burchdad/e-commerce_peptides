import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdminAuthenticated } from '@/lib/auth/admin';
import {
  sendAdminNotification,
  sendOrderApprovedEmail,
  sendOrderCompletedEmail,
  sendPaymentInstructionsEmail,
} from '@/lib/services/order-emails';
import { updateOrderWorkflowRecord } from '@/lib/services/order-requests';

const schema = z.object({
  status: z.enum(['pending', 'reviewing', 'approved', 'payment-sent', 'completed', 'cancelled']),
  conversionStatus: z.enum(['unpaid', 'paid']).optional(),
  paymentInstructions: z.string().optional(),
  paymentLink: z.string().url().optional().or(z.literal('')),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = await params;

  try {
    const updated = await updateOrderWorkflowRecord(id, {
      status: parsed.data.status,
      conversionStatus: parsed.data.conversionStatus,
      paymentInstructions: parsed.data.paymentInstructions,
      paymentLink: parsed.data.paymentLink || undefined,
    });

    if (updated.status === 'approved') {
      await sendOrderApprovedEmail(updated);
    }

    if (updated.status === 'payment-sent') {
      await sendPaymentInstructionsEmail(updated);
    }

    if (updated.status === 'completed') {
      await sendOrderCompletedEmail(updated);
    }

    await sendAdminNotification(updated, `order-${updated.status}`);

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to update order.' },
      { status: 400 },
    );
  }
}
