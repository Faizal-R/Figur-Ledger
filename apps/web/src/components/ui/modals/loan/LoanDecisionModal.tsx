"use client";

import { ILoanApplication } from "@/types/ILoan";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { X, Check, XCircle, Activity } from "lucide-react";

export default function LoanDecisionModal({
  application,
  onClose,
  onConfirm
}: {
  application: ILoanApplication;
  onClose: () => void;
  onConfirm: (data: { applicationId: string, status: "APPROVED" | "REJECTED" }) => void
}) {
  const { theme: t } = useTheme();

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div
        className={cn(
          t.card.base,
          t.radius.lg,
          "w-full max-w-lg shadow-3xl border border-white/5 overflow-hidden animate-in fade-in zoom-in duration-300"
        )}
      >
        {/* Header */}
        <div className="p-8 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex justify-between items-center">
          <div>
            <h2 className={cn("text-2xl font-black uppercase tracking-tighter", t.text.heading)}>
              Adjudicate <span className="text-[#b0f061]">Application.</span>
            </h2>
            <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-1", t.text.muted)}>
              Institutional Underwriting Protocol
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X size={20} className={t.text.muted} />
          </button>
        </div>

        <div className="p-10 space-y-10">
          <div className={cn("rounded-3xl p-8 space-y-4 border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03]")}>
            <Info label="Liquidity Request" value={`₹${application.requestedAmount.toLocaleString()}`} />
            <Info label="Amortization Term" value={`${application.tenureInMonths} MONTHS`} />
            <Info label="Protocol APR" value={`${application.annualInterestRate}%`} />
            <div className="pt-4 border-t border-black/5 dark:border-white/5">
               <Info label="Calculated EMI" value={`₹${application.emiAmount?.toLocaleString() ?? "0"}`} />
               <Info label="Total Liability" value={`₹${application.totalPayableAmount?.toLocaleString() ?? "0"}`} />
            </div>
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => onConfirm({ applicationId: application.id as string, status: "REJECTED" })}
              className={cn(
                "flex-1 h-16 rounded-2xl border transition-all duration-300 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3",
                "border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500"
              )}
            >
              <XCircle size={18} />
              Reject Protocol
            </button>

            <button
              onClick={() => onConfirm({ applicationId: application.id as string, status: "APPROVED" })}
              className={cn(
                t.button.primary,
                "flex-1 h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 shadow-2xl"
              )}
            >
              <Check size={18} />
              Authorize Funding
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className={cn(
            "w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-opacity border-t border-black/5 dark:border-white/5",
            t.text.muted
          )}
        >
          Abort Adjudication Space
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  const { theme: t } = useTheme();
  return (
    <div className="flex justify-between items-center">
      <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>{label}</span>
      <span className={cn("text-base font-black tracking-tight", t.text.heading)}>{value}</span>
    </div>
  );
}
