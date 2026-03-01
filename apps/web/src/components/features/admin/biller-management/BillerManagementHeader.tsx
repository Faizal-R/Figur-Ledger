"use client";
import { PlusCircle, Terminal, Activity, Zap, Cpu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BillerManagementHeader({onOpenCreateModal}: {onOpenCreateModal: () => void}) {
  const { theme: t, mode } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden p-10 md:p-12 rounded-[2.5rem] border transition-all duration-500 shadow-3xl group mb-12",
        mode === 'dark' ? "bg-black/20 border-white/10" : "bg-white border-slate-200 shadow-xl"
      )}
    >
      {/* Decorative High-Tech Overlays */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c1ff72]/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute top-0 left-0 w-2 h-full bg-[#c1ff72] shadow-[0_0_20px_#c1ff72]" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
        <div className="flex items-center gap-10">
           <div className={cn(
             "w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:rotate-6",
             mode === 'dark' ? "bg-[#c1ff72] text-[#0a1a15]" : "bg-slate-900 text-white"
           )}>
              <Cpu size={32} />
           </div>
           
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-[#c1ff72] animate-pulse" />
                 <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${t.text.muted} opacity-60`}>Registry Controller active</span>
              </div>
              <h2 className={`text-5xl md:text-6xl font-black tracking-tighter ${t.text.display} leading-none`}>
                Biller <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-[#c1ff72] dark:via-white dark:to-[#81c784]">Network.</span>
              </h2>
              <p className={cn("text-xs font-medium opacity-50", t.text.muted)}>Manage institutional node providers and service bridge endpoints.</p>
           </div>
        </div>

        <div className="flex items-center gap-6">
           {/* Terminal Feed Badge */}
           <div className="hidden md:flex items-center gap-3 px-6 py-3 rounded-2xl border border-black/5 dark:border-white/10 bg-linear-to-r from-black/5 to-transparent dark:from-white/5 dark:to-transparent">
              <Activity size={14} className="text-[#c1ff72]" />
              <span className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted}`}>Protocol Sync: OK</span>
           </div>

           <motion.button
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={onOpenCreateModal}
             className={cn(
               "h-16 px-10 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all flex items-center gap-4 group/btn",
               mode === 'dark' ? "bg-[#c1ff72] text-[#0a1a15]" : "bg-slate-900 text-white"
             )}
             id="open-create-biller-modal"
           >
             <PlusCircle size={20} className="group-hover/btn:rotate-90 transition-transform duration-500" />
             Synchronize New Biller
           </motion.button>
        </div>
      </div>

      {/* Logic Grid Visual */}
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-linear-to-b from-transparent via-[#c1ff72]/10 to-transparent pointer-events-none" />
    </motion.div>
  );
}