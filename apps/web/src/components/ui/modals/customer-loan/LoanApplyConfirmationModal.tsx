"use client";

import { FinledgerTheme } from "@/theme";

export default function LoanApplyConfirmationModal({
  open,
  onCancel,
  onConfirm,
  amount,
  tenure,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  amount: number;
  tenure: number;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur flex items-center justify-center">
      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border}
        w-full max-w-sm p-6`}
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

        <p className="text-xs text-slate-400 mt-4">
          This request will be reviewed by our team. No amount will be
          deducted at this stage.
        </p>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onCancel}
            className="text-slate-400 text-sm hover:text-slate-200"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`${FinledgerTheme.button.primary} px-6 py-2.5 rounded-xl`}
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
