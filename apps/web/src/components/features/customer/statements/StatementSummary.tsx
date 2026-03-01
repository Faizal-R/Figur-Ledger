"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, Calendar, Landmark } from "lucide-react";

interface StatementSummaryProps {
  summary: {
    beginningBalance: number;
    totalDebits: number;
    totalCredits: number;
    closingBalance: number;
    period: string;
    currency: string;
  };
}

export default function StatementSummary({ summary }: StatementSummaryProps) {
  const { theme: t } = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: summary.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {/* Period Card - Subtle Background */}
      <div className={cn(t.card.base, t.radius.lg, "p-5 md:p-6 border-dashed flex flex-col justify-between")}>
        <div>
          <p className={cn("text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60", t.text.muted)}>Statement Period</p>
          <div className="flex items-start md:items-center gap-2 mt-2">
            <Calendar className={cn("w-4 h-4 mt-0.5 md:mt-0", t.text.accent)} />
            <p className={cn("text-xs font-bold wrap-break-word", t.text.heading)}>{summary.period}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
          <p className={cn("text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40", t.text.muted)}>Status: Generated</p>
        </div>
      </div>

      {/* Beginning Balance */}
      <div className={cn(t.card.base, t.radius.lg, "p-5 md:p-6 hover:shadow-lg transition-all")}>
        <p className={cn("text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60", t.text.muted)}>Beginning Balance</p>
        <p className={cn("text-xl md:text-2xl font-black mt-2 tracking-tighter", t.text.heading)}>{formatCurrency(summary.beginningBalance)}</p>
        <div className="flex items-center gap-1 mt-3 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase">
          <Landmark className="w-3 h-3" /> Opening State
        </div>
      </div>

      {/* Cash Flow Summary */}
      <div className={cn(t.card.base, t.radius.lg, "p-5 md:p-6 border-opacity-50")}>
        <div className="flex justify-between items-start mb-4">
          <p className={cn("text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60", t.text.muted)}>Cash Flow Summary</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-emerald-500">
              <TrendingUp className="w-3 h-3" /> Credits
            </span>
            <span className={cn("text-xs md:text-sm font-black", t.text.heading)}>{formatCurrency(summary.totalCredits)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-rose-500">
              <TrendingDown className="w-3 h-3" /> Debits
            </span>
            <span className={cn("text-xs md:text-sm font-black", t.text.heading)}>{formatCurrency(summary.totalDebits)}</span>
          </div>
        </div>
      </div>

      {/* Closing Balance - Premium Card */}
      <div className={cn(t.card.lime, t.radius.lg, "p-5 md:p-6 shadow-xl shadow-lime-500/20 flex flex-col justify-between transform hover:scale-[1.02] transition-transform duration-300 cursor-default")}>
        <div>
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#0a1a15]/60">Closing Balance</p>
          <p className="text-2xl md:text-3xl font-black text-[#0a1a15] mt-1 tracking-tighter">{formatCurrency(summary.closingBalance)}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="bg-[#0a1a15]/10 p-1.5 rounded-full">
            <Wallet className="w-4 h-4 text-[#0a1a15]" />
          </div>
          <span className="text-[10px] md:text-xs font-black text-[#0a1a15]/80 uppercase tracking-tighter">Available for use</span>
        </div>
      </div>
    </div>
  );
}
