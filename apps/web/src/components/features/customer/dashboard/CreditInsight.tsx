"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function CreditInsight() {
  const { theme: t } = useTheme();
  return (
    <div className={cn(t.card.base, t.radius.lg, "p-10 border border-black/5 dark:border-white/5 relative overflow-hidden group")}>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b0f061]/10 blur-3xl rounded-full" />
      
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <Sparkles size={18} className="text-[#b0f061]" />
        <h3 className={cn("text-xl font-black uppercase tracking-tighter", t.text.heading)}>Health Metric.</h3>
      </div>
      
      <p className={cn("text-sm font-medium leading-relaxed italic border-l-2 border-[#b0f061] pl-6 py-2 transition-all group-hover:pl-8 group-hover:border-[#4caf50]", t.text.body)}>
        "Your repayment velocity is optimal. Maintain current protocol adherence to trigger favorable interest adjustments."
      </p>
    </div>
  );
}
