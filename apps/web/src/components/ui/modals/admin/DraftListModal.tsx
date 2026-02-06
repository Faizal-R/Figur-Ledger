"use client";

import { FinledgerTheme } from "@/theme";
import { LoanProductPayload } from "@/hooks/state/useLoanProductState";

export default function DraftListModal({
  open,
  drafts,
  onEdit,
  onClose,
}: {
  open: boolean;
  drafts: LoanProductPayload[];
  onEdit: (d: LoanProductPayload) => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur flex justify-center items-center">
      <div className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border} w-full max-w-lg p-6`}>
        <h3 className="text-lg font-semibold text-white mb-4">Draft Loan Products</h3>

        {drafts.length === 0 ? (
          <p className="text-slate-400">No drafts available</p>
        ) : (
          <div className="space-y-3">
            {drafts.map((d) => (
              <div key={d.id} className="p-4 border border-slate-700 rounded-lg flex justify-between">
                <div>
                  <p className="text-white">{d.name}</p>
                  <p className="text-xs text-slate-400">{d.code}</p>
                </div>
                <button
                  onClick={() => onEdit(d)}
                  className={`${FinledgerTheme.button.secondary} px-4`}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className={FinledgerTheme.button.secondary}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
