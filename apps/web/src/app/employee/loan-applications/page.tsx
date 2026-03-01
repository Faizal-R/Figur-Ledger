import LoanApplicationList from "@/components/features/employee/loan-application/LoanApplicationList";

export default function EmployeeLoanApplicationsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-white">
          Pending Loan Applications
        </h1>

        <LoanApplicationList />
      </div>
    </div>
  );
}
