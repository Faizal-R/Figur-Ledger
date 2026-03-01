"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import AccountSelector from "@/components/features/customer/account/AccountSelector";
import { AlertCircle, ShieldCheck } from "lucide-react";

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
  const { theme: t } = useTheme();
  const [selectedAccountId, setSelectedAccountId] = useState("");

  if (!open) return null;

  const handleConfirm = () => {
    if (selectedAccountId) onConfirm(selectedAccountId);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className={cn(
          t.card.base,
          t.radius.lg,
          "w-full max-w-[380px] border border-white/5 shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-300"
        )}
      >
        {/* HEADER */}
        <div className="px-5 py-4 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#b0f061]" />
          <div>
            <h3 className={cn("text-base font-extrabold tracking-tight", t.text.heading)}>
              Review Details
            </h3>
            <p className={cn("text-[9px] font-bold opacity-40 uppercase tracking-widest", t.text.muted)}>
              Final confirmation
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="px-4 py-3 space-y-3">
  {/* Summary */}
  <div className="rounded-xl p-3 border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03]">
    <Row label="Amount" value={`₹${amount.toLocaleString()}`} />
    <Row label="Tenure" value={`${tenure} mo`} />
  </div>

  {/* Account */}
  <div className="space-y-1">
    <div className="flex justify-between">
      <span className={cn("text-[9px] font-black uppercase tracking-widest opacity-50", t.text.muted)}>
        Disbursement Account
      </span>
      {!selectedAccountId && (
        <span className="text-[9px] font-black text-orange-500 uppercase">
          Required
        </span>
      )}
    </div>

    <AccountSelector  onSelect={setSelectedAccountId} className='mt-6'/>
  </div>

  {/* Note */}
  <div className="flex gap-2 p-2 rounded-lg bg-[#b0f061]/5 border border-[#b0f061]/10">
    <AlertCircle size={13} className="text-[#b0f061] mt-[2px]" />
    <p className={cn("text-[10px] font-semibold leading-snug", t.text.body)}>
      Account will be verified before disbursement.
    </p>
  </div>
</div>
        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
          <button
            onClick={onCancel}
            className={cn(
              "text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg",
              "hover:bg-black/5 dark:hover:bg-white/5 transition",
              t.text.muted
            )}
          >
            Cancel
          </button>

          <button
            disabled={!selectedAccountId}
            onClick={handleConfirm}
            className={cn(
              t.button.primary,
              "h-10 px-6 rounded-xl text-[10px] font-black tracking-widest",
              "shadow-lg transition",
              "disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            )}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const { theme: t } = useTheme();

  return (
    <div className="flex justify-between items-center py-1">
      <span className={cn("text-[9px] font-bold uppercase tracking-widest opacity-40", t.text.muted)}>
        {label}
      </span>
      <span className={cn("text-lg font-extrabold tracking-tight", t.text.heading)}>
        {value}
      </span>
    </div>
  );
}