"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Variants } from 'framer-motion';
import { EliteTheme } from '@/theme';

interface BillerNetworkProps {
  t: typeof EliteTheme.light;
  itemVariants: Variants;
  data?: { count: number; list: any[] };
  isLoading?: boolean;
}

export const BillerNetwork = ({ t, itemVariants, data, isLoading }: BillerNetworkProps) => {
  const billers = data?.list || [];

  return (
    <motion.div variants={itemVariants} className={cn("lg:col-span-7 border overflow-hidden", t.card.base, t.radius.lg)}>
       <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className={cn("text-xl font-black", t.text.heading)}>Biller Network</h2>
            <p className={cn("text-xs font-medium opacity-50", t.text.muted)}>Merchant and aggregator performance.</p>
          </div>
          <Link href="/admin/billers" className={cn("text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:underline flex items-center gap-1")}>
            Manage Billers <ArrowRight size={12} />
          </Link>
       </div>
       
       <div className="p-4 overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
          ) : billers.length === 0 ? (
            <div className="p-20 text-center opacity-40 text-xs font-black uppercase tracking-widest">
              No billers found
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5">
                     <th className={cn("p-4 text-[10px] font-black uppercase tracking-tighter opacity-40", t.text.muted)}>Biller</th>
                     <th className={cn("p-4 text-[10px] font-black uppercase tracking-tighter opacity-40", t.text.muted)}>Category</th>
                     <th className={cn("p-4 text-[10px] font-black uppercase tracking-tighter opacity-40", t.text.muted)}>Volume</th>
                     <th className={cn("p-4 text-[10px] font-black uppercase tracking-tighter opacity-40", t.text.muted)}>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {billers.map((biller, idx) => (
                    <motion.tr 
                      key={biller.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                       <td className="p-4">
                          <span className={cn("text-xs font-black", t.text.heading)}>{biller.name}</span>
                          <p className={cn("text-[10px] font-bold opacity-40 mt-0.5", t.text.muted)}>{biller.id}</p>
                       </td>
                       <td className="p-4">
                          <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-white/5", t.text.muted)}>
                             {biller.category}
                          </span>
                       </td>
                       <td className="p-4">
                          <div className="flex items-center gap-2">
                             <span className={cn("text-xs font-black", t.text.heading)}>{biller.volume}</span>
                             <span className="text-[9px] font-bold text-emerald-500">{biller.growth}</span>
                          </div>
                       </td>
                       <td className="p-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase",
                            biller.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                          )}>
                             {biller.status}
                          </span>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
          )}
       </div>
    </motion.div>
  );
};
