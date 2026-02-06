"use client";

import { useState } from "react";
import { FinledgerTheme } from "@/theme";
import AccountSelector from "@/components/features/customer/account/AccountSelector";

export default function LoanApplyConfirmationModal({
  open,
  onCancel,
  onConfirm,
  amount,
  tenure,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: (accountId: string) => void;
  amount: number;
  tenure: number;
}) {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  if (!open) return null;

  const handleConfirm = () => {
    if (!selectedAccountId) return;
    onConfirm(selectedAccountId);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur flex items-center justify-center">
      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border}
        w-full max-w-lg md:max-w-xl
 p-6`}
      >
        <h3 className="text-lg font-semibold text-white mb-2">
          Confirm Loan Application
        </h3>

        <p className="text-sm text-slate-400 mb-4">
          You are applying for the following loan:
        </p>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-sm space-y-2">
          <Row label="Amount" value={`₹${amount.toLocaleString()}`} />
          <Row label="Tenure" value={`${tenure} months`} />
        </div>

        {/* 🔥 Account selection */}
        <div className="mt-5">
          <p className="text-xs text-slate-400 mb-2">
            Select account for disbursement
          </p>

          <AccountSelector onSelect={setSelectedAccountId} />
        </div>

        <p className="text-xs text-slate-400 mt-4">
          This request will be reviewed by our team. No amount will be deducted
          at this stage.
        </p>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onCancel}
            className="text-slate-400 text-sm hover:text-slate-200"
          >
            Cancel
          </button>

          <button
            disabled={!selectedAccountId}
            onClick={handleConfirm}
            className={`${FinledgerTheme.button.primary} px-6 py-2.5 rounded-xl
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Confirm Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-200 font-medium">{value}</span>
    </div>
  );
}
