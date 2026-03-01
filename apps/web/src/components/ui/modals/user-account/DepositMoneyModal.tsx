"use client";

import { useState } from "react";
import { X, Wallet, Zap, Activity, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/utils/formats";
import { IAccount } from "@/types/user-account";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface IDepositMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Partial<IAccount> | null;
  transactionType: "deposit" | "withdraw";
  onDeposit: (accountId: string, amount: number) => void;
  onWithdraw: (accountId: string, amount: number) => void;
}

export function TransactionMoneyModal({
  isOpen,
  onClose,
  account,
  transactionType,
  onDeposit,
  onWithdraw,
}: IDepositMoneyModalProps) {
  const { theme: t, mode } = useTheme();
  const [amount, setAmount] = useState("");

  if (!isOpen || !account) return null;

  const isDisabled = !amount || Number(amount) <= 0;
  const isDeposit = transactionType === "deposit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={cn(
          "relative w-full max-w-sm overflow-hidden flex flex-col shadow-3xl",
          mode === 'dark' ? "bg-[#0a0a0b] border border-white/10" : "bg-white border border-slate-200",
          t.radius.lg
        )}
      >
        {/* Animated Accent */}
        <div className={cn(
          "absolute top-0 left-0 w-full h-1.5",
          isDeposit ? "bg-[#c1ff72] shadow-[0_0_15px_#c1ff72]" : "bg-red-500 shadow-[0_0_15px_#ef4444]"
        )} />
        
        {/* Header Section */}
        <div className="p-5 border-b border-black/5 dark:border-white/5 bg-black/2 dark:bg-white/2">
           <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", isDeposit ? "bg-[#c1ff72]" : "bg-red-500")} />
                    <span className={cn("text-[9px] font-black uppercase tracking-[0.4em] opacity-40", t.text.muted)}>{isDeposit ? "Deposit" : "Withdraw"} Funds</span>
                 </div>
                 <h2 className={cn("text-xl font-black tracking-tighter", t.text.display)}>
                   Manage <span className={isDeposit ? "text-[#c1ff72]" : "text-red-500"}>Transfer.</span>
                 </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all"
              >
                <X size={18} />
              </button>
           </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Node Summary Card */}
          <div className={cn(
            "p-5 rounded-2xl border relative overflow-hidden group",
            mode === 'dark' ? "bg-black/60 border-white/5" : "bg-slate-50 border-slate-200"
          )}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Wallet size={32} />
            </div>
            
            <div className="space-y-3 relative z-10">
               <div>
                  <p className={cn("text-[9px] font-black uppercase tracking-widest opacity-30 mb-0.5", t.text.muted)}>Source Node Registry</p>
                  <h3 className={cn("text-base font-black tracking-tight", t.text.heading)}>{account.nickname}</h3>
                  <p className={cn("text-[9px] font-medium opacity-50 capitalize", t.text.muted)}>{account.type} CLUSTER / {account.accountNumber}</p>
               </div>
               
               <div className="pt-3 border-t border-black/5 dark:border-white/5">
                  <p className={cn("text-[9px] font-black uppercase tracking-widest opacity-30 mb-0.5", t.text.muted)}>Current Node Depth</p>
                  <p className={cn("text-2xl font-black tracking-tighter", t.text.display)}>
                    {formatCurrency(account.balance!, account.currency!)}
                  </p>
               </div>
            </div>
          </div>

          {/* Input Vector */}
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <span className={cn("text-[9px] font-black uppercase tracking-[0.3em] opacity-40", t.text.muted)}>Enter Amount</span>
                <div className="flex items-center gap-2">
                   <Zap size={10} className="text-[#c1ff72]" />
                   <span className="text-[9px] font-black text-[#c1ff72]">Instant Transfer</span>
                </div>
             </div>
             
             <div className="relative group">
                <div className={cn(
                  "absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black opacity-20 transition-opacity",
                  isDeposit ? "text-[#c1ff72]" : "text-red-500",
                  "group-focus-within:opacity-100"
                )}>
                   ₹
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={cn(
                    "w-full h-16 pl-12 pr-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 outline-none transition-all text-3xl font-black",
                    t.text.display,
                    mode === 'dark' ? "focus:border-white/20 focus:bg-black/40" : "focus:border-slate-400 focus:bg-white",
                    !isDeposit && Number(amount) > (account.balance || 0) && "text-red-500 border-red-500/30"
                  )}
                />
             </div>
             
             {!isDeposit && Number(amount) > (account.balance || 0) && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500 text-[9px] font-black uppercase tracking-widest px-4">
                  <Activity size={12} />
                   Insufficient Liquidity Balance
               </motion.div>
             )}
          </div>
        </div>

        {/* Execution Strip */}
        <div className="p-6 border-t border-black/5 dark:border-white/5 bg-black/4 dark:bg-white/4">
          <button
            disabled={isDisabled || (!isDeposit && Number(amount) > (account.balance || 0))}
            onClick={() => {
              if (isDeposit) {
                onDeposit(account.id!, Number(amount));
              } else {
                onWithdraw(account.id!, Number(amount));
              }
              setAmount("");
            }}
            className={cn(
              "w-full h-14 rounded-2xl font-black uppercase tracking-[0.5em] text-sm flex items-center justify-center gap-4 group transition-all duration-500 shadow-2xl relative overflow-hidden",
              isDeposit 
                ? mode === 'dark' 
                  ? "bg-[#c1ff72] text-[#0a1a15] hover:scale-[1.02] disabled:opacity-20 shadow-[#c1ff72]/20" 
                  : "bg-slate-900 text-white shadow-2xl disabled:opacity-50"
                : mode === 'dark'
                  ? "bg-red-500 text-white hover:bg-red-600 disabled:opacity-20"
                  : "bg-red-600 text-white hover:bg-red-700 shadow-2xl disabled:opacity-50"
            )}
          >
            {isDeposit ? (
              <>
                Deposit Funds <ArrowDownLeft size={18} className="group-hover:scale-125 transition-transform" />
              </>
            ) : (
              <>
                Withdraw Funds <ArrowUpRight size={18} className="group-hover:scale-125 transition-transform" />
              </>
            )}
            
            {/* Ambient Shine */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform pointer-events-none" />
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-3 opacity-20">
             <span className="text-[8px] font-black uppercase tracking-[0.5em]">Funds will be settled instantly</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
