"use client";
import {
  X,
  CreditCard,
  Landmark,
  Hash,
  BadgeDollarSign,
  ShieldCheck,
  Zap,
  Activity,
  History,
  Calendar,
  ChevronRight,
  Cpu,
  Terminal,
  IndianRupee,
  Clock
} from "lucide-react";
import { IAccount, KYCData } from "@/types/user-account";
import { KYCPreview } from "@/components/features/customer/account/KYCPreview";
import { formatCurrency, formatDate } from "@/utils/formats";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ViewAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: IAccount | null;
  kycData: KYCData;
}

export function ViewAccountModal({
  isOpen,
  onClose,
  account,
  kycData,
}: ViewAccountModalProps) {
  const { theme: t, mode } = useTheme();

  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={cn(
          "relative w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl",
          t.card.base,
          t.radius.lg
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
           <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                mode === 'dark' ? "bg-[#c1ff72] text-[#0a1a15]" : "bg-slate-900 text-white"
              )}>
                 <Landmark size={20} />
              </div>
              <div>
                 <h3 className={cn("text-lg font-bold", t.text.heading)}>Account Details</h3>
                 <p className={cn("text-[10px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>
                    {account.type} Account • {account.id?.slice(-8).toUpperCase()}
                 </p>
              </div>
           </div>
           <button
             onClick={onClose}
             className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400"
           >
             <X size={20} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
          {/* Balance Section */}
          <div className={cn(
            "p-8 rounded-3xl border relative overflow-hidden group",
            mode === 'dark' ? "bg-gradient-to-br from-[#c1ff72]/10 to-transparent border-[#c1ff72]/20" : "bg-slate-900 border-transparent shadow-lg"
          )}>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
               <div className="space-y-1">
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest opacity-50", mode === 'dark' ? "text-[#c1ff72]" : "text-white")}>Current Balance</p>
                  <h4 className={cn("text-4xl font-bold tracking-tight", mode === 'dark' ? "text-white" : "text-white")}>
                     {formatCurrency(account.balance, account.currency)}
                  </h4>
               </div>
               <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className={cn("text-xs font-bold uppercase tracking-widest", mode === 'dark' ? "text-[#c1ff72]" : "text-[#c1ff72]")}>
                    {account.status}
                  </span>
               </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <DetailItem label="Account Number" value={account.accountNumber as string} icon={Hash} t={t} />
             <DetailItem label="IFSC Code" value={account.ifsc as string} icon={Cpu} t={t} />
             <DetailItem label="Currency" value={account.currency} icon={IndianRupee} t={t} />
             <DetailItem label="Account Type" value={account.type.toUpperCase()} icon={CreditCard} t={t} />
          </div>

          {/* System Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-white/5">
             <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5">
                <Calendar size={18} className="text-slate-400" />
                <div>
                   <p className={cn("text-[9px] font-bold uppercase tracking-wider opacity-40 mb-0.5", t.text.muted)}>Created On</p>
                   <p className={cn("text-xs font-bold", t.text.heading)}>{formatDate(new Date(account.createdAt))}</p>
                </div>
             </div>
             <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5">
                <Clock size={18} className="text-slate-400" />
                <div>
                   <p className={cn("text-[9px] font-bold uppercase tracking-wider opacity-40 mb-0.5", t.text.muted)}>Last Updated</p>
                   <p className={cn("text-xs font-bold", t.text.heading)}>{formatDate(new Date(account.updatedAt))}</p>
                </div>
             </div>
          </div>

          {/* Owner Info */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/5">
             <KYCPreview kycData={kycData} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
           <button
             onClick={onClose}
             className={cn(
               "w-full h-12 rounded-xl text-xs font-bold transition-all shadow-sm",
               mode === 'dark' ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-900 text-white hover:bg-slate-800"
             )}
           >
             Close Details
           </button>
        </div>
      </motion.div>
    </div>
  );
}

function DetailItem({ label, value, icon: Icon, t }: { label: string; value: string; icon: any; t: any }) {
  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 group hover:border-[#c1ff72] transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-[#4caf50] opacity-60" />
        <span className={cn("text-[10px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>{label}</span>
      </div>
      <p className={cn("text-sm font-bold tracking-wider truncate", t.text.heading)}>{value}</p>
    </div>
  );
}
