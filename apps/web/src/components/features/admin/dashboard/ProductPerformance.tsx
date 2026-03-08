"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

import { Variants } from 'framer-motion';
import { EliteTheme } from '@/theme';

interface ProductPerformanceProps {
  t: typeof EliteTheme.light;
  mode: string;
  itemVariants: Variants;
  data?: { name: string; count: number; volume: number }[];
  isLoading?: boolean;
}

export const ProductPerformance = ({ t, mode, itemVariants, data, isLoading }: ProductPerformanceProps) => {
  const chartData = data || [];
  const totalVolume = chartData.reduce((sum, item) => sum + item.volume, 0);

  return (
    <motion.div variants={itemVariants} className={cn("lg:col-span-5 border flex flex-col", t.card.base, t.radius.lg)}>
       <div className="p-8 pb-0">
          <h2 className={cn("text-xl font-black", t.text.heading)}>Product Performance</h2>
          <p className={cn("text-xs font-medium opacity-50", t.text.muted)}>Applications count by loan scheme.</p>
       </div>
       
       <div className="h-[300px] w-full p-8 pt-4">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-full w-full flex items-center justify-center opacity-40 text-xs font-black uppercase tracking-widest">
              No data available
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: mode === 'dark' ? '#f1f8f1' : '#0a1a15' }}
                      width={100}
                    />
                    <Tooltip 
                       cursor={{ fill: 'transparent' }}
                       contentStyle={{ 
                        backgroundColor: mode === 'dark' ? '#0a1a15' : '#ffffff', 
                        borderRadius: '12px', 
                        border: 'none',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#c1ff72" 
                      radius={[0, 8, 8, 0]} 
                      barSize={32}
                    />
                 </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-4">
                 <div className={cn("p-4 rounded-2xl bg-black text-white")}>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Total Disbursed</span>
                       <TrendingUp size={14} className="text-[#c1ff72]" />
                    </div>
                    <div className="flex items-baseline gap-2">
                       <h4 className="text-2xl font-black">₹{(totalVolume / 10000000).toFixed(2)} Cr</h4>
                       <span className="text-[10px] font-bold text-[#c1ff72]">+12% vs last month</span>
                    </div>
                 </div>
              </div>
            </>
          )}
       </div>
    </motion.div>
  );
};
