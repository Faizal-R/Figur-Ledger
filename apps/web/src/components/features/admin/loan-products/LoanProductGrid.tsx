"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import LoanProductModal from "@/components/ui/modals/admin/LoanProductModal";

import {
  useGetAllLoanProducts,
} from "@/hooks/api/useLoan";
import { ILoanProduct } from "@/types/ILoan";
import { cn } from "@/lib/utils";

export default function LoanProductGrid() {
  const { theme: t } = useTheme();
  const [selected, setSelected] = useState<ILoanProduct | null>(null);

  const { data, isLoading, error } = useGetAllLoanProducts();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(t.card.base, t.radius.lg, "p-6 relative overflow-hidden")}
          >
            {/* shimmer overlay */}
            <div
              className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]
              bg-gradient-to-r from-transparent via-white/5 to-transparent"
            />

            <div className="space-y-4 relative">
              {/* title */}
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700/60" />

              {/* code */}
              <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-700/40" />

              {/* details */}
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700/50" />
                <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700/50" />
                <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700/50" />
              </div>

              {/* button */}
              <div className="h-9 w-full rounded-xl bg-slate-200 dark:bg-slate-700/60 mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400">
        Failed to load loan products
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <p className="text-sm mb-2">No loan products found</p>
        <p className="text-xs">Create your first product to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(data.data || []).map((p: ILoanProduct) => (
          <div
            key={p.code}
            className={cn(
              "group relative p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
              t.card.base,
              t.radius.lg
            )}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#b0f061]/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={cn("font-bold", t.text.heading)}>{p.name}</h3>
                <Status status={p.isActive ? "active" : "inactive"} />
              </div>

              <p className={cn("text-xs font-bold uppercase tracking-widest", t.text.muted)}>{p.code}</p>

              <div className={cn("text-sm space-y-1", t.text.body)}>
                <p>
                  Amount: ₹{p.minAmount} – ₹{p.maxAmount}
                </p>
                <p>APR: {p.annualInterestRate}%</p>
                <p>
                  Tenures:{" "}
                  {Array.isArray(p.allowedTenuresInMonths) ? p.allowedTenuresInMonths.join(", ") : "—"} months
                </p>
              </div>

              <button
                onClick={() => setSelected(p)}
                className={cn(
                  t.button.onyx,
                  "w-full py-3 rounded-xl uppercase text-[10px] tracking-[0.2em] font-black"
                )}
              >
                Manage Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Manage Modal */}
      <LoanProductModal
        open={!!selected}
        editing={selected}
        onClose={() => setSelected(null)}
        onPublish={() => {}}
      />
    </>
  );
}

function Status({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
        status === "active"
          ? "bg-[#b0f061]/20 text-[#2d5a4c]"
          : "bg-red-500/20 text-red-500"
      )}
    >
      {status}
    </span>
  );
}
