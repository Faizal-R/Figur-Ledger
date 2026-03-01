"use client";
import { Percent, Calendar, DollarSign, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

import { ILoanProduct } from "@/types/ILoan";

export default function LoanProductCard({
  product,
  onApply,
}: {
  product: ILoanProduct;
  onApply: () => void;
}) {
  const { theme: t, mode } = useTheme();
  const maxTenure = Math.max(...product.allowedTenuresInMonths);
  const minAmount = product.minAmount || 5000;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`
        ${t.card.base}
        ${t.radius.lg}
        p-6
        relative
        transition-all
        duration-700
        w-full

        max-w-[360px]
        mx-auto
        group
        border border-black/5 dark:border-white/5
        shadow-2xl
        overflow-hidden
        ${!product.isActive && "opacity-50 grayscale pointer-events-none"}
      `}
    >
      {/* Structural Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c1ff72]/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#4caf50]/5 blur-3xl rounded-full" />
      
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`px-3 py-1 rounded-full border border-[#c1ff72]/30 bg-[#c1ff72]/5 flex items-center gap-2`}>
           <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest text-[#c1ff72]">Verified Product</span>
        </div>
        {product.isActive && (
           <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#4caf50]">
              <CheckCircle2 size={10} />
              <span>Available</span>
           </div>
        )}
      </div>

      {/* Main Info */}
      <div className="relative z-10 space-y-4">
        <div>
           <h3 className={`text-2xl font-black tracking-tighter ${t.text.display} mb-1 leading-tight`}>
             {product.name}
           </h3>
           <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${t.text.muted}`}>
             {product.processingTime ? `Processing: ${product.processingTime}` : "Verified Loan Product"}
           </p>
        </div>

        {/* Central Display */}
        <div className={`p-6 ${mode === 'dark' ? 'bg-white/5' : 'bg-black/5'} ${t.radius.md} border border-black/5 dark:border-white/5 text-center relative overflow-hidden group-hover:border-[#c1ff72]/30 transition-colors`}>
           <div className="absolute top-0 left-0 w-1 h-full bg-[#c1ff72]" />
           <div className="flex items-center justify-center gap-2 mb-1">
              <Percent size={16} className="text-[#c1ff72]" />
              <span className={`text-4xl font-black tracking-tighter ${t.text.display}`}>
                {product.annualInterestRate}%
              </span>
           </div>
           <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${t.text.muted}`}>Annual Interest Rate</p>
        </div>

        {/* Key Data Grid */}
        <div className="grid grid-cols-2 gap-3">
           <div className={`p-4 bg-black/5 dark:bg-white/5 ${t.radius.md} border border-black/5 dark:border-white/5`}>
              <div className="flex items-center gap-1.5 mb-1">
                 <TrendingUp size={12} className="text-[#c1ff72]" />
                 <span className={`text-[8px] font-black uppercase tracking-widest ${t.text.muted}`}>Max Amount</span>
              </div>
              <p className={`text-lg font-black tracking-tighter ${t.text.heading}`}>
                 ₹{(product.maxAmount / 1000).toLocaleString()}K
              </p>
           </div>
           <div className={`p-4 bg-black/5 dark:bg-white/5 ${t.radius.md} border border-black/5 dark:border-white/5`}>
              <div className="flex items-center gap-1.5 mb-1">
                 <Calendar size={12} className="text-[#c1ff72]" />
                 <span className={`text-[8px] font-black uppercase tracking-widest ${t.text.muted}`}>Tenure</span>
              </div>
              <p className={`text-lg font-black tracking-tighter ${t.text.heading}`}>
                 {maxTenure} Mo.
              </p>
           </div>
        </div>

        {/* Min Entry */}
        <div className="flex items-center justify-between px-1">
           <div className="flex items-center gap-2">
              <DollarSign size={12} className={t.text.muted} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted}`}>Min Amount</span>
           </div>
           <span className={`text-sm font-black tracking-tighter ${t.text.heading}`}>
              ₹{minAmount.toLocaleString()}
           </span>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
           {(product.features || ["Zero Prepayment", "No Hidden Charges"]).slice(0, 2).map((feat, i) => (
             <span key={i} className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-black/5 dark:bg-white/5 rounded-lg ${t.text.muted} border border-black/5 dark:border-white/5`}>
                {feat}
             </span>
           ))}
        </div>

        {/* Action */}
        <button
          onClick={onApply}
          className={`
            w-full h-14 ${t.button.primary} ${t.radius.md} font-black uppercase tracking-[0.3em] text-[11px]
            flex items-center justify-center gap-3 group/btn shadow-xl
          `}
        >
          Apply Now
          <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#c1ff72]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#c1ff72]/20 to-transparent" />
    </motion.div>
  );
}
