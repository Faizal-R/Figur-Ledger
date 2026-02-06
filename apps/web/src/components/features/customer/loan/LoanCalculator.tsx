"use client";

import { useState } from "react";
import { FinledgerTheme } from "@/theme";
import LoanApplyConfirmationModal from "@/components/ui/modals/customer-loan/LoanApplyConfirmationModal";
import LoanApplicationSubmitted from "./LoanApplicationSubmitted";
import { useApplyLoan } from "@/hooks/api/useLoan";
import { useAuthUserStore } from "@/store";
import { ILoanApplication } from "@/types/ILoan";
import { IAccount } from "@/types/user-account";


export default function LoanCalculator({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(product.minAmount);
  const [tenure, setTenure] = useState(product.allowedTenuresInMonths[0]);

  const {user}=useAuthUserStore()

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const applyLoan=useApplyLoan()

  const processingFee = 1000;
  const interest = Math.round((amount * product.annualInterestRate) / 100);
  const totalPayable = amount + interest + processingFee;
  const emi = Math.round(totalPayable / tenure);

  function handleConfirmApply(selectedAccountId:string) {
    const payload = {
      loanProductId: product._id,
      requestedAmount: amount,
      tenureInMonths: tenure,
      annualInterestRate: product.annualInterestRate,
      emiAmount: emi,
      totalPayableAmount: totalPayable,
      creditedAccountId:selectedAccountId,
      userId:user?.id!,
    };

    console.log("APPLY LOAN PAYLOAD", payload);

  
    applyLoan.mutate(payload,{
        onSuccess:()=>{
            setConfirmOpen(false);
            setSubmitted(true);
        }
    })

  }

  if (submitted) {
    return <LoanApplicationSubmitted onClose={onClose} />;
  }

  return (
    <>
      {/* EMI Highlight */}
      <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <p className="text-sm text-emerald-300">Estimated Monthly EMI</p>
        <p className="text-3xl font-bold text-emerald-400">
          ₹{emi.toLocaleString()}
        </p>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-1">
          <span>Loan Amount</span>
          <span>₹{amount.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={product.minAmount}
          max={product.maxAmount}
          step={1000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-emerald-400"
        />
      </div>

      {/* Tenure */}
      <div className="mb-6">
        <p className="text-sm text-slate-400 mb-2">Tenure</p>
        <div className="flex gap-3">
          {product.allowedTenuresInMonths.map((t: number) => (
            <button
              key={t}
              onClick={() => setTenure(t)}
              className={`px-5 py-2 rounded-full border text-sm ${
                tenure === t
                  ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                  : "border-slate-700 text-slate-400"
              }`}
            >
              {t} Months
            </button>
          ))}
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-sm space-y-2">
        <Row label="Principal" value={`₹${amount}`} />
        <Row label="Interest" value={`₹${interest}`} />
        <Row label="Processing Fee" value={`₹${processingFee}`} />
        <Row label="Total Payable" value={`₹${totalPayable}`} strong />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onClose}
          className="text-slate-400 text-sm hover:text-slate-200"
        >
          Cancel
        </button>

        <button
          onClick={() => setConfirmOpen(true)}
          className={`${FinledgerTheme.button.primary} px-8 py-2.5 rounded-xl`}
        >
          Apply Loan
        </button>
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
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className={strong ? "text-white font-semibold" : "text-slate-200"}>
        {value}
      </span>
    </div>
  );
}
