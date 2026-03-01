"use client";
import React from 'react';
import { Bell, CreditCard, Shield, Zap, Info, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  totalDue: number;
  savedBillersCount: number;
  upcomingBills: number;
}

const Header: React.FC<HeaderProps> = ({ totalDue, savedBillersCount, upcomingBills }) => {
  const { theme: t, mode } = useTheme();

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12">
      {/* Upper Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-black/5 dark:border-white/5">
        <div className="space-y-4 max-w-2xl">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#c1ff72] animate-pulse" />
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${t.text.muted}`}>Utility Hub Telemetry</span>
           </div>
           <h1 className={`text-5xl font-black tracking-tighter ${t.text.display}`}>
             Bills & <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1a3a32] to-[#4caf50] dark:from-[#c1ff72] dark:to-[#81c784]">Recharges</span>
           </h1>
           <p className={`${t.text.body} text-lg opacity-80 font-medium`}>
             Orchestrate your external liquidity flows and utility protocol settlements through our unified transmission interface.
           </p>
        </div>

        <div className="flex items-center gap-4">
           <div className={`${t.card.base} ${t.radius.lg} px-6 py-4 border border-black/5 dark:border-white/5 flex items-center gap-4 shadow-lg group`}>
              <div className="w-10 h-10 rounded-xl bg-[#c1ff72]/10 flex items-center justify-center">
                 <Shield size={18} className="text-[#c1ff72]" />
              </div>
              <div>
                 <p className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted}`}>Protocol</p>
                 <p className={`text-xs font-black ${t.text.heading}`}>SECURE_V3</p>
              </div>
           </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <motion.div 
        variants={{
          show: { transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Total Due Card */}
        <motion.div 
          variants={item}
          whileHover={{ y: -5 }}
          className={`${t.card.base} ${t.radius.lg} p-8 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden group`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c1ff72]/5 blur-3xl rounded-full" />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
               <div className="w-14 h-14 bg-[#0a1a15] dark:bg-[#c1ff72] rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6">
                  <CreditCard className="text-[#c1ff72] dark:text-[#0a1a15]" size={24} />
               </div>
               <Info size={16} className={`${t.text.muted} opacity-40`} />
            </div>
            <div>
               <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted} mb-1`}>Outstanding Volume</p>
               <div className="flex items-baseline gap-2">
                  <p className={`text-4xl font-black tracking-tighter ${t.text.display}`}>₹{totalDue.toLocaleString()}</p>
                  <span className={`text-[10px] font-black ${t.text.muted}`}>INR</span>
               </div>
               <p className={`text-[10px] font-bold ${t.text.muted} opacity-60 mt-2`}>Across {savedBillersCount} registered nodes</p>
            </div>
          </div>
        </motion.div>

        {/* Saved Billers Card */}
        <motion.div 
          variants={item}
          whileHover={{ y: -5 }}
          className={`${t.card.base} ${t.radius.lg} p-8 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden group`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4caf50]/5 blur-3xl rounded-full" />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
               <div className="w-14 h-14 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-black/5 dark:border-white/5 shadow-sm">
                  <Bell className={t.text.muted} size={24} />
               </div>
               <ArrowUpRight size={16} className={`${t.text.muted} opacity-40`} />
            </div>
            <div>
               <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted} mb-1`}>Active Syncs</p>
               <p className={`text-4xl font-black tracking-tighter ${t.text.display}`}>{savedBillersCount}</p>
               <p className={`text-[10px] font-bold ${t.text.muted} opacity-60 mt-2`}>Verified protocol connections</p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Bills Card */}
        <motion.div 
          variants={item}
          whileHover={{ y: -5 }}
          className={`${t.card.base} ${t.radius.lg} p-8 border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden group`}
        >
          <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
               <div className={`w-14 h-14 ${upcomingBills > 0 ? 'bg-orange-500/10' : 'bg-black/5 dark:bg-white/5'} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <Zap className={upcomingBills > 0 ? 'text-orange-500' : t.text.muted} size={24} />
               </div>
               <div className={`w-2 h-2 rounded-full ${upcomingBills > 0 ? 'bg-orange-500 animate-ping' : 'bg-slate-400 opacity-20'}`} />
            </div>
            <div>
               <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted} mb-1`}>Pending Sessions</p>
               <p className={`text-4xl font-black tracking-tighter ${t.text.display}`}>{upcomingBills}</p>
               <p className={`text-[10px] font-bold ${t.text.muted} opacity-60 mt-2`}>Priority 1: Next 7-day window</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;