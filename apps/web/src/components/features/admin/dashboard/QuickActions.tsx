"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Users, Landmark, Clock } from 'lucide-react';

import { Variants } from 'framer-motion';
import { EliteTheme } from '@/theme';

interface QuickActionsProps {
  t: typeof EliteTheme.light;
  itemVariants: Variants;
}

export const QuickActions = ({ t, itemVariants }: QuickActionsProps) => {
  const actions = [
    { label: 'Manage Staff', icon: Users, href: '/admin/employees', desc: 'Add or remove admin users.' },
    { label: 'Loan Schemes', icon: Landmark, href: '/admin/loan-products', desc: 'Configure interest rates and terms.' },
    { label: 'System Logs', icon: Clock, href: '/admin/logs', desc: 'View technical audit trails.' }
  ];

  return (
    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {actions.map((act, i) => (
         <Link 
           key={i} 
           href={act.href}
           className={cn("p-6 border group hover:border-emerald-500/50 transition-all shadow-sm", t.card.base, t.radius.lg)}
         >
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <act.icon size={24} />
               </div>
               <div>
                  <h4 className={cn("text-sm font-black", t.text.heading)}>{act.label}</h4>
                  <p className={cn("text-[10px] font-medium opacity-50", t.text.muted)}>{act.desc}</p>
               </div>
            </div>
         </Link>
       ))}
    </motion.div>
  );
};
