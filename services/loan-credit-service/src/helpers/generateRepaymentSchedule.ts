import { Types } from "mongoose";
import { calculateEMI } from "./calculateEMI";

interface ScheduleInput {
  loanApplicationId: Types.ObjectId;
  principal: number;
  annualInterestRate: number;
  tenureInMonths: number;
  disbursedAt: Date;
}


function getNextFifth(disbursedAt: Date): Date {
  const year = disbursedAt.getFullYear();
  const month = disbursedAt.getMonth();
  const day = disbursedAt.getDate();

  // If already before 5th → same month 5th
  if (day < 5) {
    return new Date(year, month, 5);
  }

  // Otherwise → next month 5th
  return new Date(year, month + 1, 5);
}


export function generateRepaymentSchedules({
  loanApplicationId,
  principal,
  annualInterestRate,
  tenureInMonths,
  disbursedAt,
}: ScheduleInput) {
  const schedules: any[] = [];

  const monthlyRate = annualInterestRate / 12 / 100;
  const emi = calculateEMI(principal, annualInterestRate, tenureInMonths);

  let outstandingPrincipal = principal;

  // ✅ Always start on a 5th
  let dueDate = getNextFifth(disbursedAt);

  for (let i = 1; i <= tenureInMonths; i++) {
    let interestAmount = Math.round(outstandingPrincipal * monthlyRate);
    let principalAmount = emi - interestAmount;

    // ✅ Last EMI correction (mandatory)
    if (i === tenureInMonths) {
      principalAmount = outstandingPrincipal;
      interestAmount = emi - principalAmount;
    }

    outstandingPrincipal -= principalAmount;

    schedules.push({
      loanApplicationId,
      scheduleNumber: i,
      dueDate: new Date(dueDate), // immutable copy
      principalAmount,
      interestAmount,
      totalAmount: emi,
      status: "PENDING",
      outstandingPrincipal
    });

    // ✅ Force next month's 5th
    dueDate = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth() + 1,
      5
    );
  }

  return schedules;
}
