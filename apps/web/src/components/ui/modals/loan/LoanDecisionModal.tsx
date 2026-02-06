"use client";

import { ILoanApplication } from "@/types/ILoan";
import { FinledgerTheme } from "@/theme";

export default function LoanDecisionModal({
  application,
  onClose,
  onConfirm
}: {
  application: ILoanApplication;
  onClose: () => void;
  onConfirm:(data:{applicationId:string,status:"APPROVED"|"REJECTED"})=>void
}) {
    console.log("applicaiton",application)
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div
        className="w-full max-w-md rounded-lg
                   bg-slate-900 border border-slate-700
                   p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Review Loan Application
        </h2>

        <div className="space-y-2 text-sm mb-6">
          <Info label="Requested Amount" value={`₹${application.requestedAmount}`} />
          <Info label="Tenure" value={`${application.tenureInMonths} months`} />
          <Info label="Interest Rate" value={`${application.annualInterestRate}%`} />
          <Info label="EMI" value={`₹${application.emiAmount}`} />
          <Info label="Total Payable" value={`₹${application.totalPayableAmount}`} />
        </div>

        <div className="flex gap-3">
          <button
          onClick={()=>onConfirm({applicationId:application._id as string,status:"REJECTED"})}
            className="flex-1 py-2 rounded-md
                       border border-red-500
                       text-red-400
                       hover:bg-red-500/10"
          >
            Reject
          </button>

          <button
          onClick={()=>onConfirm({applicationId:application._id as string,status:"APPROVED"})}
            className={`${FinledgerTheme.button.primary} flex-1 py-2 rounded-md`}
          >
            Approve
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-slate-400 hover:text-slate-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
