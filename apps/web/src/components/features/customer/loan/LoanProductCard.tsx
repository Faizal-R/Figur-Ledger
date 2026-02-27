"use client";
import { Percent, Calendar, DollarSign, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

interface LoanProduct {
  name: string;
  annualInterestRate: number;
  maxAmount: number;
  minAmount?: number;
  allowedTenuresInMonths: number[];
  isActive: boolean;
  processingTime?: string;
  features?: string[];
}

export default function LoanProductCard({
  product,
  onApply,
}: {
  product: LoanProduct;
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
        p-8
        relative
        transition-all
        duration-700
        w-full
        max-w-[400px]
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
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={`px-4 py-1.5 rounded-full border border-[#c1ff72]/30 bg-[#c1ff72]/5 flex items-center gap-2`}>
           <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-[#c1ff72]">Liquidity Node</span>
        </div>
        {product.isActive && (
           <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#4caf50]">
              <CheckCircle2 size={12} />
              <span>Verified</span>
           </div>
        )}
      </div>

      {/* Main Info */}
      <div className="relative z-10 space-y-6">
        <div>
           <h3 className={`text-3xl font-black tracking-tighter ${t.text.display} mb-1 leading-tight`}>
             {product.name}
           </h3>
           <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted}`}>
             {product.processingTime ? `Deployment Speed: ${product.processingTime}` : "Institutional Grade Product"}
           </p>
        </div>

        {/* Central Display */}
        <div className={`p-8 ${mode === 'dark' ? 'bg-white/5' : 'bg-black/5'} ${t.radius.md} border border-black/5 dark:border-white/5 text-center relative overflow-hidden group-hover:border-[#c1ff72]/30 transition-colors`}>
           <div className="absolute top-0 left-0 w-1 h-full bg-[#c1ff72]" />
           <div className="flex items-center justify-center gap-2 mb-2">
              <Percent size={20} className="text-[#c1ff72]" />
              <span className={`text-5xl font-black tracking-tighter ${t.text.display}`}>
                {product.annualInterestRate}%
              </span>
           </div>
           <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted}`}>Fixed APY Rate</p>
        </div>

        {/* Key Data Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className={`p-5 bg-black/5 dark:bg-white/5 ${t.radius.md} border border-black/5 dark:border-white/5`}>
              <div className="flex items-center gap-2 mb-2">
                 <TrendingUp size={14} className="text-[#c1ff72]" />
                 <span className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted}`}>Max Cap</span>
              </div>
              <p className={`text-xl font-black tracking-tighter ${t.text.heading}`}>
                 ${(product.maxAmount / 1000).toLocaleString()}K
              </p>
           </div>
           <div className={`p-5 bg-black/5 dark:bg-white/5 ${t.radius.md} border border-black/5 dark:border-white/5`}>
              <div className="flex items-center gap-2 mb-2">
                 <Calendar size={14} className="text-[#c1ff72]" />
                 <span className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted}`}>Window</span>
              </div>
              <p className={`text-xl font-black tracking-tighter ${t.text.heading}`}>
                 {maxTenure} Mo.
              </p>
           </div>
        </div>

        {/* Min Entry */}
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-2">
              <DollarSign size={14} className={t.text.muted} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted}`}>Injection Floor</span>
           </div>
           <span className={`text-sm font-black tracking-tighter ${t.text.heading}`}>
              ${minAmount.toLocaleString()}
           </span>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
           {(product.features || ["Zero Prepayment", "Instant Approval"]).slice(0, 2).map((feat, i) => (
             <span key={i} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-lg ${t.text.muted} border border-black/5 dark:border-white/5`}>
                {feat}
             </span>
           ))}
        </div>

        {/* Action */}
        <button
          onClick={onApply}
          className={`
            w-full h-16 ${t.button.primary} ${t.radius.md} font-black uppercase tracking-[0.3em] text-sm
            flex items-center justify-center gap-4 group/btn shadow-xl
          `}
        >
          Initialize Request
          <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#c1ff72]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#c1ff72]/20 to-transparent" />
    </motion.div>
  );
}
