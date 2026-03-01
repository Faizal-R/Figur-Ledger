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
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  if (!open) return null;

  const handleConfirm = () => {
    if (!selectedAccountId) return;
    onConfirm(selectedAccountId);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div
        className={cn(
          t.card.base,
          t.radius.lg,
          "w-full max-w-2xl shadow-3xl border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
        )}
      >
        {/* Header */}
        <div className="p-10 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
           <div className="flex items-center gap-4 mb-2">
              <ShieldCheck size={20} className="text-[#b0f061]" />
              <h3 className={cn("text-2xl font-black uppercase tracking-tighter", t.text.heading)}>
                Verification <span className="text-[#b0f061]">Finalized.</span>
              </h3>
           </div>
           <p className={cn("text-[11px] font-bold opacity-40 uppercase tracking-[0.2em]", t.text.muted)}>
             Application Final Consensus Stage
           </p>
        </div>

        <div className="p-10 space-y-10">
          <div className={cn("rounded-3xl p-8 space-y-4 border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03]")}>
            <Row label="Capital Principal" value={`₹${amount.toLocaleString()}`} />
            <Row label="Term Duration" value={`${tenure} MONTHS`} />
          </div>

          {/* Account selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-60", t.text.muted)}>Select Settlement Vault</p>
               {!selectedAccountId && (
                  <span className="text-[10px] font-black text-orange-500 uppercase animate-pulse">Required</span>
               )}
            </div>
            <AccountSelector onSelect={setSelectedAccountId} />
          </div>

          <div className="flex gap-4 p-6 rounded-2xl bg-[#b0f061]/5 border border-[#b0f061]/10">
            <AlertCircle size={18} className="text-[#b0f061] shrink-0 mt-0.5" />
            <p className={cn("text-[11px] font-bold leading-relaxed", t.text.body)}>
              <span className="text-[#b0f061] uppercase tracking-[0.2em] mr-2">Advisory:</span>
              Continuing will initiate an institutional audit. No principal deductions occur until the disbursement protocol is verified.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 border-t border-black/5 dark:border-white/5 flex items-center justify-between bg-black/5 dark:bg-white/5">
          <button
            onClick={onCancel}
            className={cn("text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all", t.text.muted)}
          >
            Abort Session
          </button>

          <button
            disabled={!selectedAccountId}
            onClick={handleConfirm}
            className={cn(
               t.button.primary,
               "px-12 h-16 rounded-3xl uppercase text-[11px] font-black tracking-[0.3em] shadow-2xl transition-all",
               "disabled:opacity-20 disabled:grayscale disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
            )}
          >
             Commit Protocol
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const { theme: t } = useTheme();
  return (
    <div className="flex justify-between items-center">
      <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>{label}</span>
      <span className={cn("text-xl font-black tracking-tight", t.text.heading)}>{value}</span>
    </div>
  );
}
