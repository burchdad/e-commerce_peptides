export type CalculatorInput = {
  peptideMg: number;
  waterMl: number;
  targetMcg: number;
  syringeUnits?: number;
};

export type CalculatorOutput = {
  concentrationMcgPerMl: number;
  volumeMlForTarget: number;
  amountPerUnitMcg?: number;
  unitsForTarget?: number;
};

export const calculateReconstitution = ({ peptideMg, waterMl, targetMcg, syringeUnits }: CalculatorInput): CalculatorOutput => {
  const peptideMcg = peptideMg * 1000;
  const concentrationMcgPerMl = peptideMcg / waterMl;
  const volumeMlForTarget = targetMcg / concentrationMcgPerMl;

  if (!syringeUnits || syringeUnits <= 0) {
    return { concentrationMcgPerMl, volumeMlForTarget };
  }

  const amountPerUnitMcg = concentrationMcgPerMl / syringeUnits;
  const unitsForTarget = targetMcg / amountPerUnitMcg;

  return { concentrationMcgPerMl, volumeMlForTarget, amountPerUnitMcg, unitsForTarget };
};
