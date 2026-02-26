"use client";
import { Building2, PlusCircle, Search } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function EmptyState() {
  const { theme: t } = useTheme();
  return (
    <div className={cn(t.card.base, t.radius.lg, "p-12 text-center")}>
      <div className="max-w-md mx-auto">
        <div className={cn("w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6", t.card.lime)}>
          <Building2 className={t.text.lime} size={32} />
        </div>
        
        <h3 className={cn("text-2xl font-black uppercase tracking-tighter mb-2", t.text.heading)}>
          No Billers Found
        </h3>
        <p className={cn("mb-6 font-medium", t.text.body)}>
          Get started by adding your first utility company or service provider
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className={cn(t.button.primary, "px-8 py-4 rounded-2xl flex items-center justify-center gap-3 uppercase font-black tracking-widest text-[12px]")}
            id="open-create-biller-empty"
          >
            <PlusCircle size={18} />
            Create First Biller
          </button>
          
          <button className={cn(t.button.glass, "px-8 py-4 rounded-2xl flex items-center justify-center gap-3 uppercase font-black tracking-widest text-[12px]")}>
            <Search size={18} />
            Explore Docs
          </button>
        </div>
        
        <div className={cn("mt-8 p-6 rounded-2xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5")}>
          <p className={cn("text-sm", t.text.body)}>
            <span className="font-black text-[#4caf50] uppercase tracking-widest mr-2">Tip:</span> 
            Billers are utility companies that customers can pay bills to.
          </p>
        </div>
      </div>
    </div>
  );
}