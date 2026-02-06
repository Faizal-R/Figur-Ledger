import { ILoanApplication } from "@/types/ILoan";

export default function LoanApplicationCard({
  application,
  onClick,
}: {
  application: ILoanApplication;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="
        w-full
        bg-[#0f1a24]
        border border-slate-700
        rounded-xl
        p-4
        cursor-pointer
        hover:border-slate-500
        transition
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white leading-tight">
            Personal Loan
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {application.loanProductId}
          </p>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400">
          {application.status.toLowerCase()}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-1 text-[13px] text-slate-300 mb-4">
        <p>Amount: ₹{application.requestedAmount.toLocaleString()}</p>
        <p>APR: {application.annualInterestRate}%</p>
        <p>Tenure: {application.tenureInMonths} mo</p>
      </div>

      {/* Action */}
      <button
        className="
          w-full
          py-2
          rounded-lg
          bg-[#1c2a3a]
          text-sm
          font-medium
          text-white
          hover:bg-[#223449]
          transition
        "
      >
        View
      </button>
    </div>
  );
}
