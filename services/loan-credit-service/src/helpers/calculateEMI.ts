export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureInMonths: number
) {
  const monthlyRate = annualInterestRate / 12 / 100;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureInMonths)) /
    (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

  return Math.round(emi);
}
