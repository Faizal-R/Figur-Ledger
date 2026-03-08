"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { Variants } from 'framer-motion';
import { EliteTheme } from '@/theme';

interface LoanHealthChartProps {
  t: typeof EliteTheme.light;
  mode: string;
  itemVariants: Variants;
  data?: { name: string; value: number }[];
  isLoading?: boolean;
}

export const LoanHealthChart = ({ t, mode, itemVariants, data, isLoading }: LoanHealthChartProps) => {
  const colors = {
    'Approved': '#10b981',
    'Rejected': '#ef4444',
    'Pending': '#f59e0b'
  };

  const chartData = data?.map(d => ({
    ...d,
    color: colors[d.name as keyof typeof colors] || '#6366f1'
  })) || [];

  return (
    <motion.div variants={itemVariants} className={cn("lg:col-span-4 border flex flex-col", t.card.base, t.radius.lg)}>
      <div className="p-8 pb-0">
        <h2 className={cn("text-xl font-black", t.text.heading)}>Loan Health</h2>
        <p className={cn("text-xs font-medium opacity-50", t.text.muted)}>Approval vs Rejection breakdown.</p>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {isLoading ? (
          <div className="h-[240px] w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
          </div>
        ) : (
          <>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: mode === 'dark' ? '#0a1a15' : '#ffffff', 
                      borderRadius: '12px', 
                      border: 'none',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 gap-3 w-full mt-4">
              {chartData.map((s, i) => (
                <div key={i} className={cn("flex items-center justify-between p-3 rounded-2xl border border-white/5 bg-white/5")}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className={cn("text-[11px] font-bold", t.text.heading)}>{s.name}</span>
                    </div>
                    <span className={cn("text-[11px] font-black", t.text.heading)}>{s.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
