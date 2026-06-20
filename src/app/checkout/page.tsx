import { CheckoutForm } from '@/components/forms/checkout-form';
import { DisclaimerNotice } from '@/components/ui/disclaimer-notice';
import { getAdminDiscountRules, getAdminShippingMethods } from '@/lib/services/admin-data';
import { getAllSettings } from '@/lib/services/settings';
import { fetchAllProducts } from '@/lib/utils/catalog';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const [catalog, discountRules, allShippingMethods, settings] = await Promise.all([
    fetchAllProducts(),
    getAdminDiscountRules(),
    getAdminShippingMethods(),
    getAllSettings(),
  ]);

  const shippingMethods = allShippingMethods.filter((m) => m.active);
  const taxEnabled = settings['checkout.taxEnabled'] === 'true';
  const taxRate = Number(settings['checkout.taxRate'] ?? '0') || 0;

  return (
    <div className="space-y-6">
      <h1 className="section-title">Order Request</h1>
      <p className="max-w-2xl text-[var(--color-muted)]">
        Complete the structured intake flow below to submit your order for review. Payment preference is collected for follow-up only and no payment is processed here.
      </p>
      <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-text)]">
        Payment instructions will be sent after order confirmation.
      </p>
      <CheckoutForm catalog={catalog} discountRules={discountRules} shippingMethods={shippingMethods} taxEnabled={taxEnabled} taxRate={taxRate} />
      <DisclaimerNotice />
    </div>
  );
}
