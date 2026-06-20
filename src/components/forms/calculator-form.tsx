'use client';

import { useState } from 'react';

import { calculateReconstitution } from '@/lib/utils/calculator';

export const CalculatorForm = () => {
  const [peptideStrengthMg, setPeptideStrengthMg] = useState('10');
  const [reconstitutionMl, setReconstitutionMl] = useState('2');
  const [desiredDoseMg, setDesiredDoseMg] = useState('0.25');
  const [syringeUnits, setSyringeUnits] = useState('100');

  const peptideStrengthValue = Number(peptideStrengthMg);
  const reconstitutionValue = Number(reconstitutionMl);
  const desiredDoseValue = Number(desiredDoseMg);
  const syringeCapacityValue = Number(syringeUnits);
  const canCalculate = peptideStrengthValue > 0 && reconstitutionValue > 0 && desiredDoseValue > 0;
  const result = canCalculate
    ? calculateReconstitution({
        peptideStrengthMg: peptideStrengthValue,
        reconstitutionMl: reconstitutionValue,
        desiredDoseMg: desiredDoseValue,
        syringeUnits: syringeCapacityValue,
      })
    : { concentrationMgPerMl: 0, doseVolumeMl: 0, unitsForDose: 0, dosesPerVial: 0 };

  const quickStrengths = [2, 5, 10, 20, 50, 100];
  const quickSolutions = [1, 2, 3, 5, 10];
  const quickDoses = [0.1, 0.25, 0.5, 1];
  const quickSyringes = [30, 50, 100, 150];
  const syringeFillPct = syringeCapacityValue > 0 ? Math.max(0, Math.min(100, (result.unitsForDose / syringeCapacityValue) * 100)) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <form className="space-y-6 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
        <h2 className="font-serif text-3xl text-[var(--color-ivory)]">Research Reconstitution Calculator</h2>
        <p className="text-sm text-[var(--color-sand)]">For informational lab calculations only. Not treatment guidance.</p>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">Peptide Strength (total mg in vial)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickStrengths.map((value) => (
              <button key={value} type="button" onClick={() => setPeptideStrengthMg(String(value))} className={`rounded-full px-3 py-1.5 text-xs ${peptideStrengthMg === String(value) ? 'bg-[var(--color-gold)] text-[var(--color-ink)]' : 'border border-[var(--color-border)] text-[var(--color-sand)]'}`}>{value}mg</button>
            ))}
          </div>
          <input className="mt-3 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={0.1} step={0.1} type="number" value={peptideStrengthMg} onChange={(e) => setPeptideStrengthMg(e.target.value)} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">Reconstitution Solution (mL)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickSolutions.map((value) => (
              <button key={value} type="button" onClick={() => setReconstitutionMl(String(value))} className={`rounded-full px-3 py-1.5 text-xs ${reconstitutionMl === String(value) ? 'bg-[var(--color-gold)] text-[var(--color-ink)]' : 'border border-[var(--color-border)] text-[var(--color-sand)]'}`}>{value}mL</button>
            ))}
          </div>
          <input className="mt-3 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={0.1} step={0.1} type="number" value={reconstitutionMl} onChange={(e) => setReconstitutionMl(e.target.value)} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">Desired Dose (mg)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickDoses.map((value) => (
              <button key={value} type="button" onClick={() => setDesiredDoseMg(String(value))} className={`rounded-full px-3 py-1.5 text-xs ${desiredDoseMg === String(value) ? 'bg-[var(--color-gold)] text-[var(--color-ink)]' : 'border border-[var(--color-border)] text-[var(--color-sand)]'}`}>{value}mg</button>
            ))}
          </div>
          <input className="mt-3 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={0.01} step={0.01} type="number" value={desiredDoseMg} onChange={(e) => setDesiredDoseMg(e.target.value)} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">Needle / Syringe Size (units)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickSyringes.map((value) => (
              <button key={value} type="button" onClick={() => setSyringeUnits(String(value))} className={`rounded-full px-3 py-1.5 text-xs ${syringeUnits === String(value) ? 'bg-[var(--color-gold)] text-[var(--color-ink)]' : 'border border-[var(--color-border)] text-[var(--color-sand)]'}`}>{value}u</button>
            ))}
          </div>
          <input className="mt-3 w-full rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-ink)] p-2" min={1} step={1} type="number" value={syringeUnits} onChange={(e) => setSyringeUnits(e.target.value)} />
        </div>
      </form>

      <aside className="rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
        <h3 className="font-serif text-2xl text-[var(--color-ivory)]">Calculation Output</h3>
        <ul className="mt-4 space-y-4 text-sm text-[var(--color-sand)]">
          <li>
            Concentration mg/mL:
            <strong className="ml-2 text-[var(--color-ivory)]">{result.concentrationMgPerMl.toFixed(3)} mg/mL</strong>
          </li>
          <li>
            Dose volume (mL):
            <strong className="ml-2 text-[var(--color-ivory)]">{result.doseVolumeMl.toFixed(3)} mL</strong>
          </li>
          <li>
            Dose in Units:
            <strong className="ml-2 text-[var(--color-ivory)]">{result.unitsForDose.toFixed(2)} units</strong>
          </li>
          <li>
            Number of Doses Per Vial:
            <strong className="ml-2 text-[var(--color-ivory)]">{result.dosesPerVial.toFixed(2)}</strong>
          </li>
        </ul>

        <div className="mt-6 rounded-xl border border-[var(--color-border)] p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">Syringe Visualization ({syringeUnits || 0}u syringe)</p>
          <div className="mt-3 h-6 overflow-hidden rounded-full border border-[var(--color-border)] bg-black/25">
            <div className="h-full bg-[linear-gradient(90deg,var(--color-gold),#f2ce6d)]" style={{ width: `${syringeFillPct}%` }} />
          </div>
          <p className="mt-2 text-xs text-[var(--color-sand)]">Approximate fill: {result.unitsForDose.toFixed(2)} / {syringeCapacityValue || 0} units ({syringeFillPct.toFixed(1)}%)</p>
        </div>
      </aside>
    </div>
  );
};
