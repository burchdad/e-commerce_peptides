'use client';

import { useState } from 'react';

import { calculateReconstitution } from '@/lib/utils/calculator';

export const CalculatorForm = () => {
  const [peptideMg, setPeptideMg] = useState(5);
  const [waterMl, setWaterMl] = useState(2);
  const [targetMcg, setTargetMcg] = useState(250);
  const [syringeUnits, setSyringeUnits] = useState(100);

  const result = calculateReconstitution({ peptideMg, waterMl, targetMcg, syringeUnits });

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <form className="space-y-4 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
        <h2 className="font-serif text-3xl text-[var(--color-ivory)]">Research Reconstitution Math</h2>
        <p className="text-sm text-[var(--color-sand)]">For informational lab calculations only. Not treatment guidance.</p>
        <label className="block text-sm text-[var(--color-sand)]">
          Peptide amount (mg)
          <input className="mt-1 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={0.1} step={0.1} type="number" value={peptideMg} onChange={(e) => setPeptideMg(Number(e.target.value))} />
        </label>
        <label className="block text-sm text-[var(--color-sand)]">
          Bacteriostatic water added (mL)
          <input className="mt-1 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={0.1} step={0.1} type="number" value={waterMl} onChange={(e) => setWaterMl(Number(e.target.value))} />
        </label>
        <label className="block text-sm text-[var(--color-sand)]">
          Target amount (mcg)
          <input className="mt-1 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={1} step={1} type="number" value={targetMcg} onChange={(e) => setTargetMcg(Number(e.target.value))} />
        </label>
        <label className="block text-sm text-[var(--color-sand)]">
          Syringe units reference (optional)
          <input className="mt-1 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={1} step={1} type="number" value={syringeUnits} onChange={(e) => setSyringeUnits(Number(e.target.value))} />
        </label>
      </form>

      <aside className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
        <h3 className="font-serif text-2xl text-[var(--color-ivory)]">Calculation Output</h3>
        <ul className="mt-4 space-y-4 text-sm text-[var(--color-sand)]">
          <li>
            Concentration estimate:
            <strong className="ml-2 text-[var(--color-ivory)]">{result.concentrationMcgPerMl.toFixed(2)} mcg/mL</strong>
          </li>
          <li>
            Volume estimate for target amount:
            <strong className="ml-2 text-[var(--color-ivory)]">{result.volumeMlForTarget.toFixed(3)} mL</strong>
          </li>
          {result.amountPerUnitMcg ? (
            <li>
              Amount per syringe unit:
              <strong className="ml-2 text-[var(--color-ivory)]">{result.amountPerUnitMcg.toFixed(2)} mcg/unit</strong>
            </li>
          ) : null}
          {result.unitsForTarget ? (
            <li>
              Units for target amount:
              <strong className="ml-2 text-[var(--color-ivory)]">{result.unitsForTarget.toFixed(2)} units</strong>
            </li>
          ) : null}
        </ul>
      </aside>
    </div>
  );
};
