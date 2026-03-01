import LoanApplicationList from "@/components/features/employee/loan-application/LoanApplicationList";

import { ILoanApplication } from "@/types/ILoan";

async function getApplications(): Promise<ILoanApplication[]> {
  return Array.from({ length: 25 }).map((_, i) => ({
    id: String(i),
    userId: `user_${i}`,
    loanProductId: "PL_SHORT",
    requestedAmount: 25000 + i * 1000,
    tenureInMonths: [3, 6, 9][i % 3] as 3 | 6 | 9,
    annualInterestRate: 10,
    emiAmount: 4800,
    totalPayableAmount: 28800,
    status: "APPLIED",
    createdAt: "Today",
  }));
}

export default async function EmployeeLoanApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className={` min-h-screen p-6`}>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-white">
          Pending Loan Applications
        </h1>

        <LoanApplicationList applications={applications} />
      </div>
    </div>
  );
}
