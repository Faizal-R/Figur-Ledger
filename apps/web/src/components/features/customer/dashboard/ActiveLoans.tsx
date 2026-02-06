import { FinledgerTheme } from "@/theme";

const loans = [
  {
    id: "LN-101",
    name: "Personal Loan",
    emi: "₹12,450",
    tenure: "18 months",
    outstanding: "₹2,10,000",
    status: "Active",
  },
];

export default function ActiveLoans() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Your Loans</h2>

      {loans.map((loan) => (
        <div
          key={loan.id}
          className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.lg} p-6`}
        >
          <div className="flex justify-between mb-3">
            <h3 className="text-white font-semibold">{loan.name}</h3>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              {loan.status}
            </span>
          </div>

          <div className="text-sm text-slate-400 space-y-1">
            <p>EMI: <span className="text-white">{loan.emi}</span></p>
            <p>Remaining Tenure: <span className="text-white">{loan.tenure}</span></p>
            <p>Outstanding: <span className="text-white">{loan.outstanding}</span></p>
          </div>

          <button className={`mt-4 w-full py-2 rounded-xl ${FinledgerTheme.button.secondary}`}>
            View Repayment Schedule
          </button>
        </div>
      ))}
    </div>
  );
}
