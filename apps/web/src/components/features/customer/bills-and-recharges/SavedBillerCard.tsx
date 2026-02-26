"use client";
import React from "react";
import { 
  ArrowRight, Zap, Droplets, Wifi, Smartphone, Tv, Flame, 
  Receipt, ChevronRight, ShieldCheck
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ISavedBiller } from "@/types/IBill";
import { motion } from "framer-motion";

interface Props {
  biller: ISavedBiller;
  onOpen: (biller: ISavedBiller) => void;
}

const SavedBillerCard: React.FC<Props> = ({ biller, onOpen }) => {
  const { theme: t } = useTheme();

  const getCategoryIcon = () => {
    switch(biller.category) {
      case 'ELECTRICITY': return <Zap size={22} />;
      case 'WATER': return <Droplets size={22} />;
      case 'INTERNET': return <Wifi size={22} />;
      case 'MOBILE': return <Smartphone size={22} />;
      case 'CABLE': return <Tv size={22} />;
      case 'GAS': return <Flame size={22} />;
      default: return <Receipt size={22} />;
    }
  };

  const getCategoryName = () => {
    switch(biller.category) {
      case 'ELECTRICITY': return "Power Grid";
      case 'WATER': return "Hydro Logic";
      case 'INTERNET': return "Fiber Link";
      case 'MOBILE': return "Cellular";
      case 'CABLE': return "Media Stream";
      case 'GAS': return "Thermal";
      default: return "Service Node";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      onClick={() => onOpen(biller)}
      className={`
        relative overflow-hidden ${t.card.base} ${t.radius.lg} border border-black/5 dark:border-white/5
        transition-all duration-500 cursor-pointer group shadow-xl hover:shadow-2xl hover:border-[#c1ff72]/30
      `}
    >
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#c1ff72]/5 blur-[80px] rounded-full -mr-16 -mt-16 group-hover:bg-[#c1ff72]/10 transition-colors" />
      
      <div className="relative z-10 p-7 space-y-8">
        {/* Header Info */}
        <div className="flex justify-between items-start">
           <div className="flex gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 bg-[#0a1a15] dark:bg-[#c1ff72] text-[#c1ff72] dark:text-[#0a1a15] shadow-xl group-hover:rotate-6`}>
                 {getCategoryIcon()}
              </div>
              <div className="space-y-1">
                 <h4 className={`${t.text.heading} text-xl font-black tracking-tight`}>
                   {biller.alias}
                 </h4>
                 <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted} opacity-60`}>
                      ID: {biller.consumerId.slice(0, 8)}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-slate-500 opacity-30" />
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] text-[#c1ff72]`}>
                      {getCategoryName()}
                    </span>
                 </div>
              </div>
           </div>
           
           <div className={`w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5 opacity-40 group-hover:opacity-100 transition-opacity`}>
              <ChevronRight size={18} className={t.text.muted} />
           </div>
        </div>

        {/* Data Matrix Divider */}
        <div className="flex items-center gap-3">
           <div className="h-px flex-1 bg-black/5 dark:border-white/5" />
           <div className="flex gap-1.5">
              {[1,2,3].map(i => (
                <div key={i} className={`w-1 h-1 rounded-full bg-[#c1ff72] transition-opacity duration-500`} style={{ opacity: 0.2 + (i * 0.1) }} />
              ))}
           </div>
           <div className="h-px flex-1 bg-black/5 dark:border-white/5" />
        </div>

        {/* Status & Action */}
        <div className="flex items-center justify-between">
           <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-[#c1ff72]" />
                 <span className={`text-[10px] font-black uppercase tracking-widest ${t.text.heading}`}>SECURE_NODE</span>
              </div>
              <p className={`text-[10px] font-bold ${t.text.muted} opacity-50`}>Auto-sync enabled</p>
           </div>
           
           <motion.div
             whileHover={{ x: 5 }}
             className={`h-12 px-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center gap-3 transition-colors group-hover:bg-[#c1ff72]/10 group-hover:border-[#c1ff72]/20`}
           >
              <span className={`text-[10px] font-black uppercase tracking-widest ${t.text.heading}`}>OPEN_HUB</span>
              <ArrowRight size={14} className="text-[#c1ff72]" />
           </motion.div>
        </div>
      </div>

      {/* Edge Accents */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-linear-to-tl from-[#c1ff72]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default SavedBillerCard;