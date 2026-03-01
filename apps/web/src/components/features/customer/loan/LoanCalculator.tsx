"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import LoanApplyConfirmationModal from "@/components/ui/modals/customer-loan/LoanApplyConfirmationModal";
import LoanApplicationSubmitted from "./LoanApplicationSubmitted";
import { useApplyLoan } from "@/hooks/api/useLoan";
import { useAuthUserStore } from "@/store";

export default function LoanCalculator({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  const { theme: t } = useTheme();
  const [amount, setAmount] = useState(product.minAmount);
  const [tenure, setTenure] = useState(product.allowedTenuresInMonths[0]);

  const { user } = useAuthUserStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const applyLoan = useApplyLoan();

  const processingFee = 1000;
  const interest = Math.round((amount * product.annualInterestRate) / 100);
  const totalPayable = amount + interest + processingFee;
  const emi = Math.round(totalPayable / tenure);

  function handleConfirmApply(selectedAccountId: string) {
    const payload = {
      loanProductId: product._id,
      requestedAmount: amount,
      tenureInMonths: tenure,
      annualInterestRate: product.annualInterestRate,
      emiAmount: emi,
      totalPayableAmount: totalPayable,
      creditedAccountId: selectedAccountId,
      userId: user?.id!,
    };

    applyLoan.mutate(payload, {
      onSuccess: () => {
        setConfirmOpen(false);
        setSubmitted(true);
      }
    });
  }

  if (submitted) {
    return <LoanApplicationSubmitted onClose={onClose} />;
  }

  return (
    <>
      <div className="space-y-8">
        {/* EMI Highlight */}
        <div className={cn("p-8 rounded-4xl border relative overflow-hidden group shadow-2xl", "bg-[#b0f061]/5 border-[#b0f061]/20")}>
          <div className="absolute top-0 left-0 w-2 h-full bg-[#b0f061] opacity-60" />
          <p className={cn("text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-60", t.text.muted)}>Calculated Monthly EMI</p>
          <div className="flex items-baseline gap-2">
             <span className={cn("text-5xl font-black tracking-tighter text-[#b0f061]")}>₹{emi.toLocaleString()}</span>
             <span className={cn("text-xs font-bold opacity-40", t.text.muted)}>/ MONTH</span>
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
               <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-60 mb-1", t.text.muted)}>Capital Requested</p>
               <h4 className={cn("text-3xl font-black tracking-tighter", t.text.heading)}>₹{amount.toLocaleString()}</h4>
            </div>
            <span className={cn("text-[10px] font-bold opacity-30", t.text.muted)}>STEP: 1K</span>
          </div>
          <input
            type="range"
            min={product.minAmount}
            max={product.maxAmount}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-full appearance-none cursor-pointer accent-[#b0f061]"
          />
        </div>

        {/* Tenure */}
        <div className="space-y-4">
          <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-60", t.text.muted)}>Amortization Window</p>
          <div className="flex flex-wrap gap-3">
            {product.allowedTenuresInMonths.map((t_month: number) => {
              const isActive = tenure === t_month;
              return (
                <button
                  key={t_month}
                  onClick={() => setTenure(t_month)}
                  className={cn(
                    "px-8 py-3 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                    isActive
                      ? "bg-[#b0f061] border-[#b0f061] text-[#0a1a15] shadow-lg shadow-[#b0f061]/20"
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-slate-500 hover:border-[#b0f061]/30"
                  )}
                >
                  {t_month} Months
                </button>
              );
            })}
          </div>
        </div>

        {/* Breakdown */}
        <div className={cn("rounded-3xl p-6 space-y-4 border border-black/5 dark:border-white/5", "bg-black/3 dark:bg-white/3")}>
          <Row label="Principal Capital" value={`₹${amount.toLocaleString()}`} />
          <Row label="Calculated Interest" value={`₹${interest.toLocaleString()}`} />
          <Row label="Origination Fee" value={`₹${processingFee.toLocaleString()}`} />
          <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5">
             <Row label="Total Protocol Liability" value={`₹${totalPayable.toLocaleString()}`} strong />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6">
          <button
            onClick={onClose}
            className={cn("text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all", t.text.muted)}
          >
            Abort Application
          </button>

          <button
            onClick={() => setConfirmOpen(true)}
            className={cn(
               t.button.primary,
               "px-10 py-4 rounded-2xl uppercase text-[11px] font-black tracking-[0.3em] shadow-2xl transition-all"
            )}
          >
            Initialize Loan Protocol
          </button>
        </div>
      </div>

      <LoanApplyConfirmationModal
        open={confirmOpen}
        amount={amount}
        tenure={tenure}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmApply}
      />
    </>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  const { theme: t } = useTheme();
  return (
    <div className="flex justify-between items-center">
      <span className={cn("text-[9px] font-black uppercase tracking-widest opacity-40 whitespace-nowrap", t.text.muted)}>{label}</span>
      <div className="flex-1 border-b border-dotted border-black/10 dark:border-white/10 mx-4 mt-1" />
      <span className={cn(
        "text-sm font-black tracking-tight",
        strong ? t.text.heading + " text-lg" : t.text.body
      )}>
        {value}
      </span>
    </div>
  );
}
