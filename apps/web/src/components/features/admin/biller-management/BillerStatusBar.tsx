"use client";
import { Building2, TrendingUp, Search } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { IBiller } from "@/types/IBill";
import { cn } from "@/lib/utils";

export default function BillerStatsBar({ billers }: { billers: IBiller[] }) {
  const { theme: t } = useTheme();
  const activeBillers = billers.filter(b => b.isActive).length;
  
  return (
    <div className={cn(t.card.base, t.radius.lg, "p-8 shadow-xl transition-all duration-500 hover:shadow-2xl border border-black/5 dark:border-white/5")}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex flex-wrap items-center gap-10">
          {/* Total Billers */}
          <div className="flex items-center gap-4 group">
            <div className={cn("p-4 rounded-2xl transition-all duration-300 group-hover:scale-110", t.card.lime)}>
              <Building2 className={t.text.lime} size={24} />
            </div>
            <div>
              <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-60", t.text.muted)}>Total Billers</p>
              <p className={cn("text-3xl font-black tracking-tighter mt-0.5", t.text.heading)}>
                {billers.length}
              </p>
            </div>
          </div>
          
          {/* Active Billers */}
          <div className="flex items-center gap-4 group">
            <div className={cn("p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 bg-[#b0f061]/20")}>
              <TrendingUp className="text-[#2d5a4c]" size={24} />
            </div>
            <div>
              <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-60", t.text.muted)}>Active</p>
              <p className={cn("text-3xl font-black tracking-tighter mt-0.5", t.text.heading)}>
                {activeBillers}
              </p>
            </div>
          </div>
          
          {/* Inactive Billers */}
          <div className="flex items-center gap-4 group">
            <div className={cn("p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 bg-red-500/10")}>
              <div className="text-red-500 text-xl font-black">{billers.length - activeBillers}</div>
            </div>
            <div>
              <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-60", t.text.muted)}>Inactive</p>
              <p className={cn("text-3xl font-black tracking-tighter mt-0.5", t.text.heading)}>
                {billers.length - activeBillers}
              </p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative group w-full lg:w-96">
          <Search className={cn("absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 group-focus-within:text-[#b0f061]", t.text.muted)} size={20} />
          <input
            type="text"
            placeholder="Search billers by name or category..."
            className={cn(
              "w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 focus:ring-4 focus:ring-[#b0f061]/20 outline-none font-bold text-sm tracking-tight",
              "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061]",
              t.text.heading
            )}
            id="biller-search-input"
          />
        </div>
      </div>
    </div>
  );
}