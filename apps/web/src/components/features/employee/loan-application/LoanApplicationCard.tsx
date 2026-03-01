"use client";
import { ILoanApplication } from "@/types/ILoan";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function LoanApplicationCard({
  application,
  onClick,
}: {
  application: ILoanApplication;
  onClick: () => void;
}) {
  const { theme: t } = useTheme();
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group",
        t.card.base,
        t.radius.lg
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={cn("text-sm font-bold uppercase tracking-tight", t.text.heading)}>
            Personal Loan
          </h3>
          <p className={cn("text-[10px] font-black uppercase tracking-widest mt-1", t.text.muted)}>
            {application.loanProductId}
          </p>
        </div>

        <span className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
          application.status === "APPROVED" 
            ? "bg-[#b0f061]/20 text-[#2d5a4c]" 
            : application.status === "REJECTED"
            ? "bg-red-500/10 text-red-500"
            : "bg-orange-500/10 text-orange-500"
        )}>
          {application.status}
        </span>
      </div>

      {/* Body */}
      <div className={cn("space-y-1 text-sm mb-6", t.text.body)}>
        <p className="flex justify-between items-center italic">
          <span className="opacity-60 not-italic">Amount:</span> 
          <span className="font-bold">₹{application.requestedAmount.toLocaleString()}</span>
        </p>
        <p className="flex justify-between items-center italic">
          <span className="opacity-60 not-italic">APR:</span> 
          <span className="font-bold">{application.annualInterestRate}%</span>
        </p>
        <p className="flex justify-between items-center italic">
          <span className="opacity-60 not-italic">Tenure:</span> 
          <span className="font-bold">{application.tenureInMonths} Months</span>
        </p>
      </div>

      {/* Action */}
      <button
        className={cn(
          "w-full py-3 rounded-xl uppercase text-[10px] tracking-[0.2em] font-black transition-all",
          t.button.onyx
        )}
      >
        View Protocol
      </button>
    </div>
  );
}
