import { FinledgerTheme } from "@/theme";
import LoanProductsList from "@/components/features/customer/loan/LoanProductsList";

export default async function CustomerLoanPage() {
  return (
    <div className={`${FinledgerTheme.background} min-h-screen px-6 py-10`}>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Available Loans</h1>
          <p className="text-slate-400">
            Choose a loan product and calculate your EMI instantly
          </p>
        </div>

        {/* Client Component */}
        <LoanProductsList />
      </div>
    </div>
  );
}
