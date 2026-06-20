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

export const calculateReconstitution = ({ peptideStrengthMg, reconstitutionMl, desiredDoseMg }: CalculatorInput): CalculatorOutput => {
  const concentrationMgPerMl = peptideStrengthMg / reconstitutionMl;
  const doseVolumeMl = desiredDoseMg / concentrationMgPerMl;
  // Insulin syringe markings are still 100 units per mL; 50u/100u changes capacity, not dose math.
  const unitsForDose = doseVolumeMl * 100;
  const dosesPerVial = desiredDoseMg > 0 ? peptideStrengthMg / desiredDoseMg : 0;

  return {
    concentrationMgPerMl,
    doseVolumeMl,
    unitsForDose,
    dosesPerVial,
  };
};
