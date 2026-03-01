"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function LoanApplicationSubmitted({
  onClose,
}: {
  onClose: () => void;
}) {
  const { theme: t } = useTheme();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* Success Animation Area */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#b0f061]/20 flex items-center justify-center mb-4 shadow-xl">
           <CheckCircle2 size={28} className="text-[#b0f061]" />
        </div>

        <h2 className={cn("text-2xl font-black tracking-tighter uppercase mb-2", t.text.display)}>
          Application <span className="text-[#b0f061]">Submitted.</span>
        </h2>

        <p className={cn("text-xs font-semibold opacity-50 mb-6 mx-auto leading-relaxed", t.text.body)}>
          Your application is now being reviewed.
        </p>

        <div className={cn("grid grid-cols-1 gap-3 text-left mb-6 p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-black/2 dark:bg-white/2")}>
           <InfoItem 
             icon={<Clock size={14} />} 
             label="Review" 
             text="Review within 24 hours." 
           />
           <InfoItem 
             icon={<ShieldCheck size={14} />} 
             label="Updates" 
             text="We'll notify you soon." 
           />
        </div>

        <button
          onClick={onClose}
          className={cn(
            t.button.onyx,
            "w-full h-11 rounded-xl uppercase text-[10px] font-black tracking-widest shadow-xl transition-all"
          )}
        >
          View Dashboard
        </button>
      </div>
    </motion.div>
  );
}

import { ReactNode } from "react";

function InfoItem({ icon, label, text }: { icon: ReactNode; label: string; text: string }) {
  const { theme: t } = useTheme();
  return (
    <div className="flex gap-4 items-center">
      <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 shadow-sm text-[#b0f061]">
         {icon}
      </div>
      <div>
         <p className={cn("text-[8px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>{label}</p>
         <p className={cn("text-[11px] font-bold opacity-70", t.text.body)}>{text}</p>
      </div>
    </div>
  );
}
