"use client";

import { FinledgerTheme } from "@/theme";
import { useState, useEffect } from "react";
import { ILoanProduct } from "@/types/ILoan";
import { toast } from "sonner";
const TENURES = [3, 6, 9] as const;

export default function LoanProductModal({
  open,
  onClose,
  // onSaveDraft,
  onPublish,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  // onSaveDraft: (p: ILoanProduct) => void;
  onPublish: (p: ILoanProduct) => void;
  editing: ILoanProduct | null;
}) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border}
              w-full max-w-lg p-5`}
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          {editing ? "Edit Draft" : "Create Loan Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Code"
            value={form.code}
            onChange={onInputChange}
            name="code"
          />
          <Input
            label="Name"
            value={form.name}
            onChange={onInputChange}
            name="name"
          />

          <Input
            label="Min Amount"
            type="number"
            value={form.minAmount}
            onChange={onInputChange}
            name="minAmount"
          />
          <Input
            label="Max Amount"
            type="number"
            value={form.maxAmount}
            onChange={onInputChange}
            name="maxAmount"
          />

          <Input
            label="APR %"
            type="number"
            value={form.annualInterestRate}
            onChange={onInputChange}
            name="annualInterestRate"
          />
          <Input
            label="Minimum Credit Score"
            type="number"
            value={form.minCreditScore}
            onChange={onInputChange}
            name="minCreditScore"
          />
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Tenures</p>
          <div className="flex gap-2">
            {TENURES.map((t: number) => {
              const selected = form.allowedTenuresInMonths.includes(
                t as 3 | 6 | 9
              );

              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      allowedTenuresInMonths: selected
                        ? prev.allowedTenuresInMonths.filter((x) => x !== t)
                        : [...prev.allowedTenuresInMonths, t as 3 | 6 | 9],
                    }));
                  }}
                  className={`px-4 py-2 rounded-full border ${
                    selected
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                      : "border-slate-700 text-slate-400"
                  }`}
                >
                  {t}M
                </button>
              );
            })}
          </div>
        </div>
        {/* </div> */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-700">
          {/* Left: Cancel */}
          <button
            onClick={onClose}
            className="text-slate-400 text-sm hover:text-slate-200 transition"
          >
            Cancel
          </button>

          {/* Right: Actions */}
          <div className="flex gap-3">
            {/* Save Draft */}
            {/* <button
              onClick={() => onSaveDraft({ ...form, status: "draft" })}
              className="px-5 py-2.5 rounded-xl text-sm font-medium
                 bg-slate-800 border border-slate-700 text-slate-300
                 hover:bg-slate-700 hover:border-slate-600
                 shadow-sm hover:shadow-md transition"
            >
              Save as Draft
            </button> */}

            {/* Publish */}
            <button
              onClick={() => onPublish(form)}
              className="relative px-6 py-2.5 rounded-xl text-sm font-semibold
                 bg-gradient-to-r from-emerald-400 to-emerald-500
                 text-slate-900
                 shadow-lg shadow-emerald-500/30
                 hover:shadow-xl hover:shadow-emerald-500/40
                 hover:-translate-y-[1px]
                 active:translate-y-0
                 transition-all"
            >
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <input
        {...props}
        className={`${FinledgerTheme.input.base} p-2.5 rounded-lg w-full text-sm`}
      />
    </div>
  );
}
