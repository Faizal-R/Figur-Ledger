"use client";
import React, { useState, useEffect } from "react";
import {
  X, Zap, Droplets, Wifi, Smartphone, Tv, Flame, 
  Download, Bell, Calendar, 
  Receipt,
  History,
  ShieldCheck, Banknote, CheckCircle
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ISavedBiller } from "@/types/IBill";
import { IAccount } from "@/types/user-account";
import { motion, AnimatePresence } from "framer-motion";

interface BillBreakdownItem {
  description: string;
  amount: number;
}

export interface BillDetailData {
  totalAmount?: number;
  dueDate?: string;
  billNumber?: string;
  breakdown?: BillBreakdownItem[];
}

interface BillDetailsModalProps {
  isOpen: boolean;
  biller: ISavedBiller | null;
  onClose: () => void;
  onPayNow: (
    biller: ISavedBiller,
    amount: number,
    accountId: string,
    billDetails: BillDetailData | null
  ) => void;
  accounts: IAccount[];
  billDetails?: BillDetailData | null;
}

const BillDetailsModal: React.FC<BillDetailsModalProps> = ({
  isOpen,
  biller,
  onClose,
  onPayNow,
  accounts,
  billDetails,
}) => {
  const { theme: t } = useTheme();
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  useEffect(() => {
    if (accounts?.[0]?.id) {
      setSelectedAccount(accounts[0].id);
    }
  }, [accounts]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ELECTRICITY": return <Zap size={24} />;
      case "WATER": return <Droplets size={24} />;
      case "INTERNET": return <Wifi size={24} />;
      case "MOBILE": return <Smartphone size={24} />;
      case "CABLE": return <Tv size={24} />;
      case "GAS": return <Flame size={24} />;
      default: return <Receipt size={24} />;
    }
  };

  if (!isOpen || !biller) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-3xl max-h-[90vh] overflow-hidden ${t.card.base} ${t.radius.md} border border-white/10 shadow-3xl flex flex-col md:flex-row`}
          >
            {/* Header Signal Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#c1ff72] to-transparent opacity-30 z-20" />

            {/* LEFT SECTION: Bill Intel */}
            <div className="w-full md:w-[60%] p-6 border-b md:border-b-0 md:border-r border-white/5 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start">
                <div className="flex gap-5">
                   <div className={`w-16 h-16 rounded-2xl bg-[#0a1a15] dark:bg-[#c1ff72] text-[#c1ff72] dark:text-[#0a1a15] flex items-center justify-center shadow-xl`}>
                      {getCategoryIcon(biller.category)}
                   </div>
                   <div>
                      <h2 className={`${t.text.heading} text-2xl font-black tracking-tighter leading-none mb-1`}>{biller.alias}</h2>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted} opacity-60`}>Consumer ID: {biller.consumerId}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-500 opacity-20" />
                        <span className={`text-[10px] font-black uppercase tracking-widest text-[#c1ff72] opacity-80`}>{biller.category}</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-4">
                 <div className={`p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted} opacity-40`}>Amount Due</p>
                    <p className={`text-xl font-black tracking-tight ${t.text.display}`}>₹{billDetails?.totalAmount || biller.dueAmount || "0.00"}</p>
                 </div>
                 <div className={`p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted} opacity-40`}>Due Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#c1ff72]" />
                      <p className={`text-sm font-black ${t.text.heading}`}>{billDetails?.dueDate || biller.dueDate}</p>
                    </div>
                 </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <History size={16} className="text-[#c1ff72]" />
                    <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${t.text.heading}`}>Bill Details</h3>
                 </div>
                 <div className={`space-y-3 p-6 rounded-2xl ${t.card.base} border border-white/5`}>
                   {(billDetails?.breakdown || [
                     { description: "Current Cycle Usage", amount: biller.dueAmount },
                     { description: "Network Access Fee", amount: 0 }
                   ]).map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5 last:border-0">
                       <span className={`text-xs font-bold ${t.text.body} opacity-60`}>{item.description}</span>
                      <span className={`text-sm font-black ${t.text.heading}`}>₹{item.amount}</span>
                     </div>
                   ))}
                   <div className="pt-4 flex justify-between items-center">
                     <span className={`text-sm font-black uppercase tracking-widest ${t.text.display}`}>Net Payable</span>
                     <span className={`text-2xl font-black text-[#c1ff72] tracking-tighter`}>₹{billDetails?.totalAmount || biller.dueAmount || "0.00"}</span>
                   </div>
                 </div>
              </div>

              {/* Utility Actions */}
              <div className="flex gap-3">
                <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className={`flex-1 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest ${t.text.heading} hover:bg-[#c1ff72]/5 hover:border-[#c1ff72]/20 transition-all`}
                >
                   <Download size={16} />
                   Download Bill
                </motion.button>
                <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className={`w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center ${t.text.muted} hover:text-[#c1ff72] transition-colors`}
                >
                   <Bell size={18} />
                </motion.button>
              </div>
            </div>

            {/* RIGHT SECTION: Transaction Matrix */}
            <div className={`w-full md:w-[40%] p-6 bg-black/10 dark:bg-black/40 space-y-6 flex flex-col justify-between`}>
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${t.text.heading}`}>Pay From</h3>
                   <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className={`w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-white/40 hover:text-white transition-colors`}
                   >
                      <X size={18} />
                   </motion.button>
                </div>

                {/* Account Scroller */}
                <div className="space-y-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {accounts.map((account) => (
                     <motion.div
                       key={account.id}
                       onClick={() => setSelectedAccount(account.id)}
                       whileHover={{ x: 5 }}
                       className={`
                         relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                         ${selectedAccount === account.id 
                           ? `bg-[#c1ff72]/10 border-[#c1ff72]/40 shadow-[0_0_20px_rgba(193,255,114,0.1)]` 
                           : `bg-black/20 border-white/5 hover:border-[#c1ff72]/20`
                         }
                       `}
                     >
                       {selectedAccount === account.id && (
                         <div className="absolute top-0 right-0 w-16 h-16 bg-[#c1ff72]/10 blur-xl rounded-full -mr-8 -mt-8" />
                       )}
                       
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl ${selectedAccount === account.id ? 'bg-[#c1ff72] text-[#0a1a15]' : 'bg-white/5 text-white/40'} flex items-center justify-center shadow-lg transition-colors`}>
                                <Banknote size={16} />
                             </div>
                             <div>
                                <p className={`text-sm font-black ${selectedAccount === account.id ? 'text-[#c1ff72]' : 'text-white/60'} transition-colors`}>{account.nickname}</p>
                                <p className={`text-[10px] font-bold opacity-40 ${t.text.muted}`}>Available: ₹{account.balance.toLocaleString()}</p>
                             </div>
                          </div>
                          {selectedAccount === account.id && (
                             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                               <CheckCircle size={18} className="text-[#c1ff72]" />
                             </motion.div>
                          )}
                       </div>
                     </motion.div>
                   ))}
                </div>
              </div>

              {/* Execution Command */}
              <div className="space-y-6">
                 <div className="flex items-center gap-3 justify-center mb-2">
                    <ShieldCheck size={14} className="text-[#c1ff72] opacity-40" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted} opacity-40`}>Secure Payment</span>
                 </div>
                 
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   disabled={!selectedAccount}
                   onClick={() => onPayNow(biller, billDetails?.totalAmount || biller.dueAmount, selectedAccount, billDetails || null)}
                   className={`
                     w-full h-16 rounded-2xl bg-[#c1ff72] text-[#0a1a15] font-black text-xs uppercase tracking-[0.3em]
                     flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(193,255,114,0.2)]
                     disabled:opacity-50 disabled:grayscale transition-all
                   `}
                 >
                   <Banknote size={20} />
                   <span>Pay Bill Now</span>
                 </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BillDetailsModal;
