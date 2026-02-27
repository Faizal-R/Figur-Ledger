"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { ILoanProduct } from "@/types/ILoan";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const TENURES = [3, 6, 9] as const;

export default function LoanProductModal({
  open,
  onClose,
  onPublish,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  onPublish: (p: ILoanProduct) => void;
  editing: ILoanProduct | null;
}) {
  const { theme: t } = useTheme();
  const [form, setForm] = useState<ILoanProduct>({
    code: "",
    name: "",
    minAmount: 0,
    maxAmount: 0,
    annualInterestRate: 0,
    allowedTenuresInMonths: [],
    isActive: false,
    minCreditScore: 500,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "minCreditScore" && Number(value) < 500) {
      toast.error("Credit Score must be atleast 500");
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (editing) setForm({ ...editing });
  }, [editing]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div
        className={cn(
          t.card.base,
          t.radius.lg,
          "w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
        )}
      >
        {/* Header */}
        <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/5 dark:bg-white/5">
          <div>
            <h2 className={cn("text-2xl font-black uppercase tracking-tighter", t.text.heading)}>
              {editing ? "Configure" : "Define"} <span className="text-[#4caf50]">Product.</span>
            </h2>
            <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-50", t.text.muted)}>
              Institutional Loan Governance Protocol
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X size={20} className={t.text.muted} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Product Code"
              placeholder="e.g. PL_PREMIUM"
              value={form.code}
              onChange={onInputChange}
              name="code"
            />
            <Input
              label="Friendly Name"
              placeholder="e.g. Elite Personal Loan"
              value={form.name}
              onChange={onInputChange}
              name="name"
            />

            <Input
              label="Minimum Principal (₹)"
              type="number"
              value={form.minAmount}
              onChange={onInputChange}
              name="minAmount"
            />
            <Input
              label="Maximum Principal (₹)"
              type="number"
              value={form.maxAmount}
              onChange={onInputChange}
              name="maxAmount"
            />

            <Input
              label="Annual Percentage Rate (%)"
              type="number"
              value={form.annualInterestRate}
              onChange={onInputChange}
              name="annualInterestRate"
            />
            <Input
              label="Eligibility Credit Threshold"
              type="number"
              value={form.minCreditScore}
              onChange={onInputChange}
              name="minCreditScore"
            />
          </div>

          <div>
            <p className={cn("text-[10px] font-black uppercase tracking-widest mb-3 opacity-60", t.text.muted)}>Allowed Tenures (Months)</p>
            <div className="flex flex-wrap gap-3">
              {TENURES.map((tenure: number) => {
                const isSelected = form.allowedTenuresInMonths.includes(
                  tenure as 3 | 6 | 9
                );

                return (
                  <button
                    key={tenure}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        allowedTenuresInMonths: isSelected
                          ? prev.allowedTenuresInMonths.filter((x) => x !== tenure)
                          : [...prev.allowedTenuresInMonths, tenure as 3 | 6 | 9],
                      }));
                    }}
                    className={cn(
                      "px-6 py-3 rounded-xl border font-black text-xs tracking-widest transition-all duration-300",
                      isSelected
                        ? "bg-[#b0f061] border-[#b0f061] text-[#0a1a15] shadow-lg shadow-[#b0f061]/20"
                        : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-slate-500 hover:border-[#b0f061]/30"
                    )}
                  >
                    {tenure} MONTHS
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-black/5 dark:border-white/5 flex items-center justify-between bg-black/5 dark:bg-white/5">
          <button
            onClick={onClose}
            className={cn("text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all", t.text.muted)}
          >
            Abort Session
          </button>

          <button
            onClick={() => onPublish(form)}
            className={cn(
              t.button.primary,
              "px-10 py-4 rounded-2xl uppercase text-[11px] font-black tracking-[0.3em] shadow-2xl transition-all"
            )}
          >
            Commit Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  const { theme: t } = useTheme();
  return (
    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform duration-300">
      <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-60", t.text.muted)}>{label}</p>
      <input
        {...props}
        className={cn(
          "w-full px-5 py-3.5 rounded-xl border outline-none font-bold text-sm tracking-tight transition-all duration-300",
          "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061] focus:ring-4 focus:ring-[#b0f061]/10",
          t.text.heading
        )}
      />
    </div>
  );
}
