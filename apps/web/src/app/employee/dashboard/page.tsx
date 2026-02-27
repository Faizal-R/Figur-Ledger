"use client";

import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Search,
  ChevronRight,
  Shield,
  Zap,
  Activity,
  UserPlus,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function EmployeeDashboard() {
  const { theme: t, mode } = useTheme();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-20"
    >
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/5">
        <motion.div variants={item} className="space-y-1">
          <h1 className={cn("text-3xl font-bold tracking-tight", t.text.heading)}>Staff Dashboard</h1>
          <p className={cn("text-sm font-medium opacity-60", t.text.muted)}>
            You have <span className="text-[#4caf50] font-bold">14 pending</span> applications to review today.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-3">
           <div className={cn("px-4 py-2 border rounded-xl flex items-center gap-3", t.card.base)}>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className={cn("text-xs font-bold", t.text.heading)}>Online</span>
           </div>
        </motion.div>
      </div>

      {/* 2. Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Applications', val: '124', icon: FileText, sub: '14 new', color: 'text-blue-500' },
          { label: 'Active Reviews', val: '8', icon: Clock, sub: 'Assigned to you', color: 'text-orange-500' },
          { label: 'Approved Today', val: '42', icon: CheckCircle, sub: '+12% from yesterday', color: 'text-green-600' },
          { label: 'High Risk', val: '2', icon: AlertCircle, sub: 'Action required', color: 'text-red-500' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className={cn("p-6 border", t.card.base, t.radius.md)}
          >
             <div className="flex items-center justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5", stat.color)}>
                  <stat.icon size={20} />
                </div>
             </div>
             <div>
                <p className={cn("text-[10px] font-bold uppercase tracking-wider opacity-50", t.text.muted)}>{stat.label}</p>
                <div className="flex items-baseline gap-2">
                   <h3 className={cn("text-2xl font-bold", t.text.heading)}>{stat.val}</h3>
                   <span className={cn("text-[9px] font-bold", stat.color)}>{stat.sub}</span>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Main Operational View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pending Applications List */}
        <div className="lg:col-span-8 space-y-6">
           <motion.div variants={item} className={cn("border overflow-hidden", t.card.base, t.radius.md)}>
              <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                 <h2 className={cn("text-lg font-bold", t.text.heading)}>Pending Reviews</h2>
                 <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search applications..." className="h-9 pl-9 pr-4 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs outline-none focus:border-[#4caf50] w-48" />
                 </div>
              </div>
              
              <div className="divide-y divide-slate-200 dark:divide-white/5">
                 {[
                   { user: 'Alexa Omega', product: 'Personal Loan', amount: '₹42,000', risk: 'Low', time: '2 mins ago' },
                   { user: 'Victor Nine', product: 'Home Loan', amount: '₹1,25,000', risk: 'Medium', time: '14 mins ago' },
                   { user: 'Neon Soul', product: 'Business Loan', amount: '₹2,50,000', risk: 'High', time: '42 mins ago' }
                 ].map((app, i) => (
                   <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/2 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500">
                            <Users size={20} />
                         </div>
                         <div>
                            <p className={cn("text-sm font-bold", t.text.heading)}>{app.user}</p>
                            <div className="flex items-center gap-2">
                               <span className={cn("text-[10px] font-medium opacity-50", t.text.muted)}>{app.product}</span>
                               <span className={cn(
                                 "text-[10px] font-bold",
                                 app.risk === 'High' ? 'text-red-500' : 'text-green-600'
                               )}>{app.risk} Risk</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <p className={cn("text-lg font-bold", t.text.heading)}>{app.amount}</p>
                            <p className={cn("text-[10px] font-medium opacity-40", t.text.muted)}>{app.time}</p>
                         </div>
                         <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                      </div>
                   </div>
                 ))}
              </div>
              
              <Link href="/employee/applications" className={cn("block w-full py-4 text-center text-xs font-bold border-t border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all", t.text.muted)}>
                 View All Applications
              </Link>
           </motion.div>
        </div>

        {/* Side Intel */}
        <div className="lg:col-span-4 space-y-6">
           <motion.div variants={item} className={cn("p-6 border", t.card.base, t.radius.md, "bg-slate-900 text-white")}>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Shield className="text-[#c1ff72]" size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Security Controls</span>
                 </div>
                 <h3 className="text-xl font-bold leading-tight">Master Verification</h3>
                 <p className="text-white/50 text-xs font-medium leading-relaxed">Emergency controls for account freezing and review overrides are active.</p>
                 <button className={cn("w-full h-11 rounded-xl text-xs font-bold transition-all", t.button.primary)}>
                   Admin Panel
                 </button>
              </div>
           </motion.div>

           <motion.div variants={item} className={cn("p-6 border", t.card.base, t.radius.md)}>
              <h4 className={cn("text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4", t.text.muted)}>Today's Distribution</h4>
              <div className="space-y-3">
                 {[
                   { label: 'Approved', count: 124, color: 'bg-green-500' },
                   { label: 'Rejected', count: 12, color: 'bg-red-500' },
                   { label: 'Pending', count: 89, color: 'bg-blue-500' }
                 ].map((d, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className={cn("w-2 h-2 rounded-full", d.color)} />
                         <span className={cn("text-xs font-bold", t.text.heading)}>{d.label}</span>
                      </div>
                      <span className={cn("text-xs font-bold opacity-50", t.text.muted)}>{d.count}</span>
                   </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}