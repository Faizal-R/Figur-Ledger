"use client";

import { FinledgerTheme } from "@/theme";
import { useEffect, useState } from "react";
import LoanProductModal from "@/components/ui/modals/admin/LoanProductModal";

import {
  useCreateLoanProduct,
  useGetAllLoanProducts,
} from "@/hooks/api/useLoan";
import { toast } from "sonner";
import { ILoanProduct } from "@/types/ILoan";

export default function LoanProductGrid() {
  const [selected, setSelected] = useState<ILoanProduct | null>(null);

  const { data, isLoading, error } = useGetAllLoanProducts();
  console.log("data", data);
  const onSaveDraftLoanProduct = (payload: ILoanProduct) => {
    console.log(payload);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border}
            p-6 relative overflow-hidden`}
          >
            {/* shimmer overlay */}
            <div
              className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]
              bg-gradient-to-r from-transparent via-white/5 to-transparent"
            />

            <div className="space-y-4 relative">
              {/* title */}
              <div className="h-4 w-3/4 rounded bg-slate-700/60" />

              {/* code */}
              <div className="h-3 w-1/3 rounded bg-slate-700/40" />

              {/* details */}
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-slate-700/50" />
                <div className="h-3 w-2/3 rounded bg-slate-700/50" />
                <div className="h-3 w-1/2 rounded bg-slate-700/50" />
              </div>

              {/* button */}
              <div className="h-9 w-full rounded-xl bg-slate-700/60 mt-4" />
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
        {(data.data || []).map((p:ILoanProduct) => (
          <div
            key={p.code}
            className={`group relative ${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border} p-6 transition hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{p.name}</h3>
                <Status status={p.isActive?"active":"inactive"} />
              </div>

              <p className="text-xs text-slate-500">{p.code}</p>

              <div className="text-sm text-slate-300 space-y-1">
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
                className={`${FinledgerTheme.button.secondary} w-full py-2 rounded-xl`}
              >
                Manage Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Edit / Manage Modal */}
      <LoanProductModal
        open={!!selected}
        editing={selected}
        onClose={() => setSelected(null)}
        // onSaveDraft={onSaveDraftLoanProduct}
        onPublish={() => {}}
      />
    </>
  );
}

function Status({ status }: { status: string }) {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full ${
        status === "active"
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {status}
    </span>
  );
}
