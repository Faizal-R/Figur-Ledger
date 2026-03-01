"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import LoanCalculator from "@/components/features/customer/loan/LoanCalculator";
import { X } from "lucide-react";

export default function LoanApplyModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: any;
}) {
  const { theme: t } = useTheme();
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className={cn(
          t.card.base,
          t.radius.lg,
          "w-full max-w-lg shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/5 dark:bg-white/5">
          <div>
            <h2 className={cn("text-2xl font-black uppercase tracking-tighter", t.text.heading)}>
              {product.name} <span className="text-[#b0f061]">Facility.</span>
            </h2>
            <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-1", t.text.muted)}>
              Institutional Liquidity Request
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X size={20} className={t.text.muted} />
          </button>
        </div>

        <div className="p-8">
          <LoanCalculator product={product} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
