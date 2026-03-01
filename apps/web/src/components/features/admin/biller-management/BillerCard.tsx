"use client";
import { IBiller } from "@/types/IBill";
import {
  Building2,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  ExternalLink,
  Zap,
  Droplets,
  Flame,
  Smartphone,
  Globe,
  DollarSign,
  ShieldCheck,
  GraduationCap,
  Activity,
  ChevronRight,
  Terminal
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BillerCard({
  biller,
}: {
  biller: IBiller;
  theme?: any;
}) {
  const { theme: t, mode } = useTheme();

  const categoryConfig: Record<string, { icon: any, color: string }> = {
    ELECTRICITY: { icon: Zap, color: "text-amber-400" },
    WATER: { icon: Droplets, color: "text-blue-400" },
    GAS: { icon: Flame, color: "text-orange-400" },
    TELECOM: { icon: Smartphone, color: "text-purple-400" },
    INTERNET: { icon: Globe, color: "text-indigo-400" },
    TAX: { icon: DollarSign, color: "text-[#c1ff72]" },
    INSURANCE: { icon: ShieldCheck, color: "text-[#4caf50]" },
    EDUCATION: { icon: GraduationCap, color: "text-rose-400" },
  };

  const config = categoryConfig[biller.category] || { icon: Building2, color: "text-slate-400" };
  const Icon = config.icon;

  const maskId = (id?: string, prefix = "ID") => {
    if (!id) return "N/A";
    return `${prefix}-${id.slice(-5).toUpperCase()}`;
  };

  const formattedDate = biller.createdAt
    ? new Date(biller.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "NOT_SYNCED";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden p-8 rounded-[2.5rem] border transition-all duration-500 group shadow-2xl",
        mode === 'dark' ? "bg-black/20 border-white/5 hover:border-[#c1ff72]/20" : "bg-white border-slate-200 shadow-xl"
      )}
    >
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#c1ff72]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#c1ff72]/5 blur-3xl rounded-full" />

      {/* Header: Provider Intel */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className={cn(
            "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shadow-xl group-hover:rotate-6",
            mode === 'dark' ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-200"
          )}>
            <Icon size={28} className={config.color} />
          </div>

          <div>
            <h3 className={cn("text-xl font-black tracking-tight mb-1 group-hover:text-[#c1ff72] transition-colors", t.text.heading)}>
              {biller.name}
            </h3>
            <div className="flex items-center gap-2">
               <div className={cn("w-1 h-1 rounded-full bg-current", config.color)} />
               <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] opacity-40", t.text.muted)}>
                 {biller.category} PROVIDER
               </span>
            </div>
          </div>
        </div>

        <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-slate-500 opacity-0 group-hover:opacity-100 transition-all">
           <ExternalLink size={16} />
        </div>
      </div>

      {/* Protocol ID Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          <p className={cn("text-[8px] font-black uppercase tracking-widest opacity-30 mb-1", t.text.muted)}>BILLER_ID</p>
          <p className={cn("text-xs font-black tracking-widest", t.text.heading)}>{maskId(biller._id, "BLR")}</p>
        </div>
        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          <p className={cn("text-[8px] font-black uppercase tracking-widest opacity-30 mb-1", t.text.muted)}>VAULT_RECEPTION</p>
          <p className={cn("text-xs font-black tracking-widest", t.text.heading)}>{maskId(biller.collectionAccountId, "ACC")}</p>
        </div>
      </div>

      {/* Communications Feed */}
      <div className="flex flex-wrap gap-2 mb-8 border-t border-black/5 dark:border-white/5 pt-6 relative z-10">
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
          <Mail size={12} className="text-[#c1ff72]" />
          <span className={cn("text-[10px] font-bold opacity-60", t.text.muted)}>{biller.contact?.email || "LINK_OFFLINE"}</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
          <Phone size={12} className="text-[#c1ff72]" />
          <span className={cn("text-[10px] font-bold opacity-60", t.text.muted)}>{biller.contact?.phone || "COMMS_VOID"}</span>
        </div>
      </div>

      {/* Footer Status Strip */}
      <div className="flex items-center justify-between relative z-10">
         <div className="flex items-center gap-3 px-4 py-1.5 rounded-lg bg-[#c1ff72]/5 border border-[#c1ff72]/10 text-[#c1ff72] text-[9px] font-black uppercase tracking-[0.2em]">
            <Activity size={10} />
            SYNCED: {formattedDate}
         </div>
         <button className={cn(
           "px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
           mode === 'dark' ? "bg-white/5 text-white hover:bg-[#c1ff72] hover:text-[#0a1a15]" : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
         )}>
           Terminal View <ChevronRight size={12} />
         </button>
      </div>

      {/* Technical Background Scan Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-[#c1ff72]/20 to-transparent pointer-events-none" />
    </motion.div>
  );
}
