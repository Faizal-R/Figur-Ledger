"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { EliteTheme } from '@/theme';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  change: string;
  trend: 'up' | 'down';
  color: string;
  t: typeof EliteTheme.light;
}

const modeColor = (color: string) => {
  if (color.includes('emerald')) return 'bg-emerald-500/10';
  if (color.includes('blue')) return 'bg-blue-500/10';
  if (color.includes('amber')) return 'bg-amber-500/10';
  if (color.includes('purple')) return 'bg-purple-500/10';
  return 'bg-slate-500/10';
};

export const StatCard = ({ label, value, icon: Icon, change, trend, color, t }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={cn("p-6 border relative overflow-hidden group", t.card.base, t.radius.md)}
  >
    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={80} className={color} />
    </div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/5", modeColor(color))}>
          <Icon size={24} className={color} />
        </div>
        <div className={cn("px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1", trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className={cn("text-xs font-semibold uppercase tracking-wider opacity-60", t.text.muted)}>{label}</p>
        <h3 className={cn("text-3xl font-black mt-1", t.text.heading)}>{value}</h3>
      </div>
    </div>
  </motion.div>
);
