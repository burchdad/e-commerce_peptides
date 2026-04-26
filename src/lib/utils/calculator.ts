export type CalculatorInput = {
  peptideStrengthMg: number;
  reconstitutionMl: number;
  desiredDoseMg: number;
  syringeUnits?: number;
};

export type CalculatorOutput = {
  concentrationMgPerMl: number;
  doseVolumeMl: number;
  unitsForDose: number;
  dosesPerVial: number;
};

export const calculateReconstitution = ({ peptideStrengthMg, reconstitutionMl, desiredDoseMg, syringeUnits = 100 }: CalculatorInput): CalculatorOutput => {
  const concentrationMgPerMl = peptideStrengthMg / reconstitutionMl;
  const doseVolumeMl = desiredDoseMg / concentrationMgPerMl;
  const unitsForDose = doseVolumeMl * syringeUnits;
  const dosesPerVial = desiredDoseMg > 0 ? peptideStrengthMg / desiredDoseMg : 0;

  return {
    concentrationMgPerMl,
    doseVolumeMl,
    unitsForDose,
    dosesPerVial,
  };
};
