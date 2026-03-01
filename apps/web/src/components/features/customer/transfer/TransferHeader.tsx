"use client";
import { ArrowLeftRight, ShieldCheck, Zap } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TransferHeader() {
  const { theme: t, mode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 md:p-8 border shadow-sm max-w-xl mx-auto",
        t.card.base,
        t.radius.lg
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
           <div className={cn(
             "w-12 h-12 rounded-xl flex items-center justify-center shadow-md",
             mode === 'dark' ? "bg-[#c1ff72] text-[#0a1a15]" : "bg-slate-900 text-white"
           )}>
              <ArrowLeftRight size={20} />
           </div>
           
           <div className="space-y-0.5">
              <h1 className={cn("text-2xl font-bold tracking-tight", t.text.heading)}>
                Send <span className="text-[#4caf50]">Money</span>
              </h1>
              <p className={cn("text-[10px] font-medium opacity-50 uppercase tracking-wider", t.text.muted)}>Instant & Secure Transfers</p>
           </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
           <ShieldCheck size={12} className="text-[#4caf50]" />
           <span className={cn("text-[9px] font-bold uppercase tracking-widest text-[#4caf50]")}>Verified</span>
        </div>
      </div>
    </motion.div>
  );
}
