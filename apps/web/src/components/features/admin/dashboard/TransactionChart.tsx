"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Variants } from 'framer-motion';
import { EliteTheme } from '@/theme';

interface TransactionChartProps {
  t: typeof EliteTheme.light;
  mode: string;
  itemVariants: Variants;
  data?: { date: string; volume: number }[];
  isLoading?: boolean;
  period: "monthly" | "yearly";
  setPeriod: (period: "monthly" | "yearly") => void;
}

export const TransactionChart = ({ 
  t, 
  mode, 
  itemVariants, 
  data, 
  isLoading, 
  period, 
  setPeriod 
}: TransactionChartProps) => {
  const chartData = data?.map(d => ({
    name: d.date,
    amount: d.volume
  })) || [];

  return (
    <motion.div variants={itemVariants} className={cn("lg:col-span-8 border overflow-hidden", t.card.base, t.radius.lg)}>
      <div className="p-8 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className={cn("text-xl font-black", t.text.heading)}>Transaction Volume</h2>
          <p className={cn("text-xs font-medium opacity-50", t.text.muted)}>Cash flow analysis across your platform.</p>
        </div>
        <div className={cn("flex p-1 gap-1 border rounded-xl w-full sm:w-auto", t.card.base)}>
          {(['monthly', 'yearly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "flex-1 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                period === p 
                  ? "bg-[#c1ff72] text-[#0a1a15] shadow-sm" 
                  : cn("hover:bg-slate-100 dark:hover:bg-white/5", t.text.muted)
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[400px] w-full p-6">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mode === 'dark' ? '#ffffff10' : '#00000005'} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: mode === 'dark' ? '#6a8d73' : '#4a635d' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: mode === 'dark' ? '#6a8d73' : '#4a635d' }}
                tickFormatter={(val) => `₹${val >= 1000 ? val/1000 + 'k' : val}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: mode === 'dark' ? '#0a1a15' : '#ffffff', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  fontSize: '12px',
                  fontWeight: 900
                }} 
                itemStyle={{ color: '#10b981' }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#10b981" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorAmt)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

