"use client";

import {
  Users,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Cpu,
  ArrowUpRight,
  Landmark,
  Settings,
  AlertCircle,
  Database,
  Globe,
  Plus
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboardOverview() {
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
          <h1 className={cn("text-3xl font-bold tracking-tight", t.text.heading)}>Admin Overview</h1>
          <p className={cn("text-sm font-medium opacity-60", t.text.muted)}>
            System status is <span className="text-green-600 font-bold">Excellent</span>. All services are running normally.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-3">
           <div className={cn("px-4 py-2 border rounded-xl flex items-center gap-3", t.card.base)}>
              <span className={cn("text-[10px] font-bold uppercase tracking-wider opacity-50", t.text.muted)}>System Health</span>
              <span className={cn("text-base font-bold text-green-600")}>99.9%</span>
           </div>
        </motion.div>
      </div>

      {/* 2. Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Total Users', val: '4,281', icon: Users, change: '+12% month', color: 'text-blue-500' },
           { label: 'Today\'s Volume', val: '₹24.8 Lakh', icon: Activity, change: '+8% today', color: 'text-green-600' },
           { label: 'System Latency', val: '0.42ms', icon: Cpu, change: 'Optimal', color: 'text-[#c1ff72]' },
           { label: 'Staff Online', val: '12', icon: Database, change: '14 Total', color: 'text-slate-500' }
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
                 <p className={cn("text-[10px] font-bold uppercase tracking-widest opacity-40", t.text.muted)}>{stat.label}</p>
                 <div className="flex items-baseline gap-2">
                    <h3 className={cn("text-2xl font-bold", t.text.heading)}>{stat.val}</h3>
                    <span className={cn("text-[9px] font-bold", stat.color)}>{stat.change}</span>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* 3. Operational Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Analytics Placeholder */}
        <div className="lg:col-span-8 space-y-6">
           <motion.div variants={item} className={cn("border overflow-hidden", t.card.base, t.radius.md)}>
              <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                 <h2 className={cn("text-lg font-bold", t.text.heading)}>Transaction Growth</h2>
                 <div className="flex gap-1.5">
                    {['24H', '7D', '30D'].map(p => (
                      <button key={p} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-bold", p === '7D' ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5")}>{p}</button>
                    ))}
                 </div>
              </div>
              <div className="p-20 text-center space-y-4 opacity-50">
                 <BarChart3 size={40} className="mx-auto text-slate-300" />
                 <p className={cn("text-xs font-medium", t.text.muted)}>Growth chart will appear here as more data is collected.</p>
              </div>
           </motion.div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/admin/employees" className={cn("p-6 border flex items-center justify-between hover:border-[#c1ff72] transition-colors", t.card.base, t.radius.md)}>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                       <Users size={20} />
                    </div>
                    <div>
                       <h4 className={cn("text-sm font-bold", t.text.heading)}>Manage Staff</h4>
                       <p className={cn("text-[10px] font-medium opacity-50", t.text.muted)}>14 Total Members</p>
                    </div>
                 </div>
                 <ArrowUpRight size={16} className="text-slate-300" />
              </Link>

              <Link href="/admin/loan-products" className={cn("p-6 border flex items-center justify-between hover:border-[#c1ff72] transition-colors", t.card.base, t.radius.md)}>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c1ff72]/10 text-[#c1ff72] flex items-center justify-center">
                       <Landmark size={20} />
                    </div>
                    <div>
                       <h4 className={cn("text-sm font-bold", t.text.heading)}>Loan Products</h4>
                       <p className={cn("text-[10px] font-medium opacity-50", t.text.muted)}>8 Active Schemes</p>
                    </div>
                 </div>
                 <ArrowUpRight size={16} className="text-slate-300" />
              </Link>
           </div>
        </div>

        {/* Status Sidebars */}
        <div className="lg:col-span-4 space-y-6">
           <motion.div variants={item} className={cn("p-6 border", t.card.base, t.radius.md, "bg-slate-900 text-white")}>
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <AlertCircle className="text-[#c1ff72]" size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Security Metrics</span>
                 </div>
                 <h3 className="text-xl font-bold leading-tight">No Security Alerts</h3>
                 <p className="text-white/40 text-xs font-medium leading-relaxed">System integrity is at 100%. No unauthorized access attempts detected.</p>
                 <button className={cn("w-full h-11 rounded-xl text-xs font-bold transition-all", t.button.primary)}>
                   Security Scan
                 </button>
              </div>
           </motion.div>

           <motion.div variants={item} className={cn("p-6 border", t.card.base, t.radius.md)}>
              <h4 className={cn("text-[10px] font-bold uppercase tracking-widest opacity-40 mb-6", t.text.muted)}>Subsystem Load</h4>
              <div className="space-y-5">
                 {[
                   { label: 'Auth Service', load: 14, color: 'bg-green-500' },
                   { label: 'Transaction API', load: 42, color: 'bg-[#c1ff72]' },
                   { label: 'Database IO', load: 28, color: 'bg-blue-500' }
                 ].map((s, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                         <span className={t.text.muted}>{s.label}</span>
                         <span className={t.text.heading}>{s.load}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <div className={cn("h-full rounded-full transition-all duration-1000", s.color)} style={{ width: `${s.load}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>

           <div className={cn("p-6 border flex items-center justify-center gap-3", t.card.base, t.radius.md)}>
              <Globe size={16} className="text-slate-400" />
              <span className={cn("text-[10px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>Version 2.4.9 Stabilized</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
