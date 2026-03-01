"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function LoanApplicationSubmitted({
  onClose,
}: {
  onClose: () => void;
}) {
  const { theme: t } = useTheme();
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        t.card.base,
        t.radius.lg,
        "w-full max-w-xl p-12 border border-black/5 dark:border-white/10 shadow-3xl overflow-hidden relative"
      )}
    >
      {/* Decorative pulse background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#b0f061]/5 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse" />
      
      <div className="text-center relative z-10">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-[#b0f061]/20 flex items-center justify-center mb-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
           <CheckCircle2 size={40} className="text-[#b0f061]" />
        </div>

        <h2 className={cn("text-4xl font-black tracking-tighter uppercase mb-4", t.text.display)}>
          Protocol <span className="text-[#b0f061]">Transmission</span> Success.
        </h2>

        <p className={cn("text-sm font-medium leading-relaxed opacity-60 mb-10 max-w-sm mx-auto", t.text.body)}>
          Your liquidity request has been successfully broadcast to the Ledger Network and is awaiting institutional verification.
        </p>

        <div className={cn("grid grid-cols-1 gap-4 text-left mb-10 p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]")}>
           <InfoItem 
             icon={<Clock size={16} />} 
             label="Verification Window" 
             text="Full cryptographic audit complete within 24 operational hours." 
           />
           <InfoItem 
             icon={<ShieldCheck size={16} />} 
             label="Governance Protocol" 
             text="System notifications will trigger upon consensus finality." 
           />
           <InfoItem 
             icon={<Activity size={16} />} 
             label="Asset Lock" 
             text="Zero principal deduction until institutional disbursement." 
           />
        </div>

        <button
          onClick={onClose}
          className={cn(
            t.button.onyx,
            "w-full h-16 rounded-3xl uppercase text-[11px] font-black tracking-[0.4em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
          )}
        >
          Return to Console
        </button>
      </div>
    </motion.div>
  );
}

function InfoItem({ icon, label, text }: { icon: any; label: string; text: string }) {
  const { theme: t } = useTheme();
  return (
    <div className="flex gap-5 items-start">
      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1 shadow-sm">
         <span className="text-[#b0f061]">{icon}</span>
      </div>
      <div>
         <p className={cn("text-[9px] font-black uppercase tracking-widest opacity-40 mb-1", t.text.muted)}>{label}</p>
         <p className={cn("text-[13px] font-bold leading-tight opacity-70", t.text.body)}>{text}</p>
      </div>
    </div>
  );
}
