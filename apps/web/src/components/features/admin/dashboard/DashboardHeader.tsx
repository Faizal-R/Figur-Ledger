"use client";

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import { EliteTheme } from '@/theme';

interface DashboardHeaderProps {
  t: typeof EliteTheme.light;
  itemVariants: Variants;
}

export const DashboardHeader = ({ t, itemVariants }: DashboardHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
    <motion.div variants={itemVariants} className="space-y-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500")}>System Live</span>
      </div>
      <h1 className={cn("text-4xl font-black tracking-tight", t.text.heading)}>Dash<span className="text-emerald-500">board</span></h1>
      <p className={cn("text-sm font-medium opacity-60", t.text.muted)}>
        Overview of your financial ecosystem performance.
      </p>
    </motion.div>

    <motion.div variants={itemVariants} className="flex items-center gap-4">
       <div className={cn("hidden lg:flex px-4 py-2 border rounded-2xl items-center gap-6", t.card.base)}>
          <div className="text-center">
            <p className={cn("text-[9px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>Network</p>
            <p className={cn("text-sm font-black", t.text.heading)}>Mainnet</p>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
          <div className="text-center">
            <p className={cn("text-[9px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>Health</p>
            <p className={cn("text-sm font-black text-emerald-500")}>99.9%</p>
          </div>
       </div>
       <button className={cn("p-3 border rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-sm", t.card.base)}>
          <Zap size={20} className="text-emerald-500" />
       </button>
    </motion.div>
  </div>
);
