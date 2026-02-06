"use client";

import { FinledgerTheme } from "@/theme";
import { useState } from "react";
import LoanCalculator from "@/components/features/customer/loan/LoanCalculator";

export default function LoanApplyModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: any;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center">
      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border}
        w-full max-w-md p-5`}
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          {product.name}
        </h2>

        <LoanCalculator product={product} onClose={onClose} />
      </div>
    </div>
  );
}
