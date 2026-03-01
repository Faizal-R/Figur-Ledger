"use client";
import React from 'react';
import { Zap, Droplets, Wifi, Smartphone, Tv, Fuel, Home, Plus, Shield } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { IBiller } from '@/types/IBill';
import { motion } from 'framer-motion';

interface BillerCardProps {
  biller: IBiller;
  onClick: (biller: IBiller) => void;
}

const BillerCard: React.FC<BillerCardProps> = ({ biller, onClick }) => {
  const { theme: t } = useTheme();

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'ELECTRICITY': return <Zap size={22} />;
      case 'WATER': return <Droplets size={22} />;
      case 'INTERNET': return <Wifi size={22} />;
      case 'MOBILE': return <Smartphone size={22} />;
      case 'CABLE': return <Tv size={22} />;
      case 'GAS': return <Fuel size={22} />;
      default: return <Home size={22} />;
    }
  };

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'ELECTRICITY': return 'Energy Protocol';
      case 'WATER': return 'Hydro Infrastructure';
      case 'INTERNET': return 'Data Transmission';
      case 'MOBILE': return 'Cellular Mesh';
      case 'CABLE': return 'Broadcast Stream';
      case 'GAS': return 'Thermal System';
      default: return 'Service Interface';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(biller)}
      className={`group relative cursor-pointer ${t.card.base} ${t.radius.lg} border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl hover:border-[#c1ff72]/30`}
    >
      {/* Decorative Aura */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c1ff72]/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-[#c1ff72]/10 transition-colors" />
      
      <div className="relative z-10 p-6 space-y-6">
        {/* Header Icon & ID */}
        <div className="flex justify-between items-start">
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 bg-[#0a1a15] dark:bg-[#c1ff72] text-[#c1ff72] dark:text-[#0a1a15] shadow-xl group-hover:rotate-6`}>
              {getCategoryIcon(biller.category)}
           </div>
           <div className="text-right">
              <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${t.text.muted} opacity-40 mb-1`}>Network Node</p>
              <div className="flex items-center gap-2 justify-end">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] animate-pulse" />
                 <span className={`text-[10px] font-black ${t.text.heading} opacity-60`}>ACTIVE_V1</span>
              </div>
           </div>
        </div>

        {/* Biller Info */}
        <div className="space-y-1">
           <h4 className={`${t.text.heading} text-xl font-black tracking-tight leading-tight group-hover:text-[#c1ff72] transition-colors`}>
             {biller.name}
           </h4>
           <div className="flex items-center gap-2">
              <p className={`text-[10px] font-black uppercase tracking-widest text-[#c1ff72]`}>
                {getCategoryName(biller.category)}
              </p>
              <div className="w-1 h-1 rounded-full bg-slate-500 opacity-20" />
              <Shield size={10} className={`${t.text.muted} opacity-40`} />
           </div>
        </div>

        {/* Action Indicator */}
        <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-[#0a1a15] bg-black/5 dark:bg-white/5 flex items-center justify-center`} style={{ zIndex: 3-i }}>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] opacity-40" />
                </div>
              ))}
           </div>
           
           <motion.div
             whileHover={{ x: 5 }}
             className={`flex items-center gap-3 h-10 px-5 rounded-xl bg-[#c1ff72]/5 border border-[#c1ff72]/10 text-[10px] font-black uppercase tracking-widest text-[#c1ff72] transition-all group-hover:bg-[#c1ff72] group-hover:text-[#0a1a15]`}
           >
              <span>Initialize</span>
              <Plus size={14} strokeWidth={3} />
           </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#c1ff72]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default BillerCard;