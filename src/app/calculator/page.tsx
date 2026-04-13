import { CalculatorForm } from '@/components/forms/calculator-form';
import { DisclaimerNotice } from '@/components/ui/disclaimer-notice';

export default function CalculatorPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="section-title">Peptide Calculator</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-sand)]">Research math tool for concentration estimates and reconstitution calculations only.</p>
      </section>
      <CalculatorForm />
      <DisclaimerNotice />
    </div>
  );
}
