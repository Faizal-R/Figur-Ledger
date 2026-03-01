"use client";

import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  DollarSign,
  ChevronRight,
  Activity,
  History,
  RefreshCw,
  MoreVertical,
  Banknote,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export default function DashboardOverview() {
  const { theme: t, mode } = useTheme();

  const stats: DashboardStats = {
    totalBalance: 42910,
    monthlyIncome: 12500,
    monthlyExpenses: 4800,
    savingsRate: 61.6,
  };
  
  const creditScore = 784;

  const container = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 }
  };

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
  }: {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
    trend: 'up' | 'down';
  }) => (
    <motion.div
      variants={item}
      className={cn(
        "p-6 border transition-all duration-300",
        t.card.base,
        t.radius.md,
        "hover:shadow-md"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          mode === 'dark' ? "bg-white/5 text-[#c1ff72]" : "bg-slate-100 text-slate-900"
        )}>
          <Icon size={20} />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold",
          trend === 'up' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
        )}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <p className={cn("text-xs font-semibold mb-1", t.text.muted)}>{title}</p>
        <p className={cn("text-2xl font-bold tracking-tight", t.text.heading)}>{value}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="animate"
      className="space-y-8 pb-20"
    >
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/5">
        <motion.div variants={item} className="space-y-1">
          <h1 className={cn("text-3xl font-bold tracking-tight", t.text.heading)}>
            Good evening, <span className="text-[#4caf50]">Alex</span>
          </h1>
          <p className={cn("text-sm font-medium opacity-60", t.text.muted)}>
            Here's what's happening with your money today.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-3">
           <div className={cn("px-4 py-2 border rounded-xl flex items-center gap-3", t.card.base)}>
              <span className={cn("text-[10px] font-bold uppercase tracking-wider opacity-50", t.text.muted)}>Credit Score</span>
              <span className={cn("text-lg font-bold", t.text.heading)}>{creditScore}</span>
           </div>
           <button className={cn(
             "h-11 px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-all",
             t.button.onyx
           )}>
             <Plus size={18} />
             <span>Add Funds</span>
           </button>
        </motion.div>
      </div>

      {/* 2. Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          value={`₹${stats.totalBalance.toLocaleString()}`}
          change="+₹2,400"
          icon={Banknote}
          trend="up"
        />
        <StatCard
          title="Monthly Income"
          value={`₹${stats.monthlyIncome.toLocaleString()}`}
          change="+₹800"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Monthly Expenses"
          value={`₹${stats.monthlyExpenses.toLocaleString()}`}
          change="-₹400"
          icon={TrendingDown}
          trend="down"
        />
        <StatCard
          title="Savings Rate"
          value={`${stats.savingsRate.toFixed(1)}%`}
          change="+2.3%"
          icon={Activity}
          trend="up"
        />
      </div>

      {/* 3. Main Content Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Accounts & Transactions */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Recent Accounts */}
          <motion.div variants={item} className={cn("border overflow-hidden", t.card.base, t.radius.md)}>
            <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <h2 className={cn("text-lg font-bold", t.text.heading)}>Your Accounts</h2>
              <Link href="/customer/accounts" className="text-xs font-bold text-[#4caf50] hover:underline flex items-center gap-1">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 gap-4">
               {[
                 { name: 'Main Savings', num: '**** 8842', balance: 34120, type: 'Savings' },
                 { name: 'Expense Account', num: '**** 1092', balance: 8790, type: 'Current' }
               ].map((acc, idx) => (
                 <div 
                   key={idx}
                   className={cn(
                     "p-5 border transition-all cursor-pointer group hover:border-[#c1ff72]/50",
                     mode === 'dark' ? "bg-white/2 border-white/5" : "bg-slate-50 border-slate-100",
                     t.radius.sm
                   )}
                 >
                    <div className="flex justify-between items-start mb-6">
                       <div className={cn(
                         "w-10 h-10 rounded-xl flex items-center justify-center",
                         idx === 0 ? "bg-[#c1ff72] text-[#0a1a15]" : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400"
                       )}>
                          <CreditCard size={20} />
                       </div>
                       <span className={cn("text-[10px] font-bold opacity-40 uppercase", t.text.muted)}>{acc.num}</span>
                    </div>
                    <div>
                       <p className={cn("text-xs font-bold mb-1", t.text.heading)}>{acc.name}</p>
                       <p className={cn("text-2xl font-bold tracking-tight", t.text.heading)}>₹{acc.balance.toLocaleString()}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={item} className={cn("border overflow-hidden", t.card.base, t.radius.md)}>
            <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <h2 className={cn("text-lg font-bold", t.text.heading)}>Recent Activity</h2>
              <Link href="/customer/transactions" className="text-xs font-bold text-[#4caf50] hover:underline flex items-center gap-1">
                Full History <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="divide-y divide-slate-200 dark:divide-white/5">
               {[
                 { name: 'Amazon Web Services', type: 'debit', amount: 1420, date: 'Feb 24', icon: ArrowUpRight },
                 { name: 'Salary Credit', type: 'credit', amount: 5000, date: 'Feb 23', icon: ArrowDownRight },
                 { name: 'Netflix Subscription', type: 'debit', amount: 120, date: 'Feb 22', icon: ArrowUpRight }
               ].map((tx, idx) => (
                 <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/2 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "w-10 h-10 rounded-xl flex items-center justify-center",
                         tx.type === 'credit' ? "bg-green-500/10 text-green-600" : "bg-slate-100 dark:bg-white/5 text-slate-500"
                       )}>
                          <tx.icon size={18} />
                       </div>
                       <div>
                          <p className={cn("text-sm font-bold", t.text.heading)}>{tx.name}</p>
                          <p className={cn("text-[10px] font-medium opacity-50", t.text.muted)}>{tx.date}</p>
                       </div>
                    </div>
                    <p className={cn(
                      "text-sm font-bold",
                      tx.type === 'credit' ? "text-green-600" : t.text.heading
                    )}>
                      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                    </p>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Cards & Progress */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Quick Action Card */}
           <motion.div variants={item} className={cn("p-8 relative overflow-hidden text-white", t.radius.md, "bg-slate-900")}>
              <div className="relative z-10 space-y-6">
                 <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                   <DollarSign size={20} className="text-[#c1ff72]" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-xl font-bold leading-tight">Apply for a Loan</h3>
                    <p className="text-white/60 text-xs font-medium">Get instant approval for up to ₹5,00,000.</p>
                 </div>
                 <Link href="/customer/loans" className={cn(
                   "w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all",
                   t.button.primary
                 )}>
                   Check Eligibility <ArrowRight size={14} />
                 </Link>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#c1ff72]/10 blur-3xl rounded-full" />
           </motion.div>

           {/* Progress / Limits */}
           <motion.div variants={item} className={cn("p-6 border", t.card.base, t.radius.md)}>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <span className={cn("text-xs font-bold", t.text.heading)}>Credit Usage</span>
                    <span className={cn("text-xs font-bold", t.text.muted)}>74%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4caf50] rounded-full w-[74%]" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <p className={cn("text-[10px] font-bold uppercase opacity-40 mb-1", t.text.muted)}>Monthly Limit</p>
                       <p className={cn("text-sm font-bold", t.text.heading)}>₹1,00,000</p>
                    </div>
                    <div>
                       <p className={cn("text-[10px] font-bold uppercase opacity-40 mb-1", t.text.muted)}>Remaining</p>
                       <p className={cn("text-sm font-bold text-[#4caf50]")}>₹26,000</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
