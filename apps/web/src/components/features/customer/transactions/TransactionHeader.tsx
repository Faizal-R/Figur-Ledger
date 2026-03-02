"use client";
import { ShieldCheck, Activity, Terminal, Search, Filter } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TransactionHeader() {
  const { theme: t, mode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden p-10 border shadow-3xl group",
        t.card.base,
        t.radius.lg,
        "border-black/5 dark:border-white/10"
      )}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#b0f061]/5 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute top-0 left-0 w-2 h-full bg-[#b0f061] shadow-[0_0_15px_rgba(176,240,97,0.3)]" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
        <div className="flex items-center gap-8">
           <div className={cn(
             "w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-6",
             mode === 'dark' ? t.card.lime + " text-[#0a1a15]" : "bg-[#0a1a15] text-white"
           )}>
              <Terminal size={28} />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#b0f061] animate-pulse" />
                 <span className={cn("text-[10px] font-black uppercase tracking-[0.4em] opacity-60", t.text.muted)}>Financial Telemetry</span>
              </div>
              <h2 className={cn("text-4xl md:text-5xl font-black tracking-tighter uppercase", t.text.display)}>
                Transaction <span className="text-[#b0f061]">Ledger.</span>
              </h2>
           </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           {/* System Badges */}
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-[#b0f061]/20 bg-[#b0f061]/5 backdrop-blur-md transition-all hover:bg-[#b0f061]/10">
              <Activity size={14} className="text-[#b0f061]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#b0f061]">Live Protocol Feed</span>
           </div>
           
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
              <ShieldCheck size={14} className={t.text.muted} />
              <span className={cn("text-[10px] font-black uppercase tracking-widest", t.text.muted)}>Immutable Logic</span>
           </div>

         
          
        </div>
      </div>

      {/* Footer Scanner */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-[#b0f061]/30 to-transparent" />
    </motion.div>
  );
}
