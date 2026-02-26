"use client";
import { X, Hash, Clock, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownLeft, RefreshCcw, IndianRupee } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils/formats";

type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";

interface Transaction {
  id: string;
  referenceId: string;
  senderAccountId: string | null;
  receiverAccountId: string | null;
  amount: number;
  currency: string;
  status: TransactionStatus;
  type: TransactionType;
  failureReason?: string | null;
  createdAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionViewModal({
  open,
  onClose,
  transaction,
}: Props) {
  const { theme: t, mode } = useTheme();

  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "relative w-full max-w-md overflow-hidden flex flex-col shadow-2xl",
          t.card.base,
          t.radius.lg
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/2">
           <h3 className={cn("text-lg font-bold", t.text.heading)}>Receipt</h3>
           <button
             onClick={onClose}
             className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400"
           >
             <X size={20} />
           </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
           {/* Amount Hero */}
           <div className="text-center space-y-2">
              <div className={cn(
                "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-transform hover:scale-110",
                transaction.type === 'WITHDRAW' ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-600"
              )}>
                 <Icon type={transaction.type} />
              </div>
              <h4 className={cn("text-3xl font-black tracking-tight", t.text.heading)}>
                 {transaction.type === 'WITHDRAW' ? '-' : '+'} {formatCurrency(transaction.amount, transaction.currency)}
              </h4>
              <div className="flex justify-center">
                 <StatusIndicator status={transaction.status} />
              </div>
           </div>

           {/* Details List */}
           <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/5">
              <DetailRow label="Reference ID" value={transaction.referenceId} icon={Hash} t={t} />
              <DetailRow label="Transaction Type" value={transaction.type} icon={RefreshCcw} t={t} />
              <DetailRow 
                label="Date & Time" 
                value={new Date(transaction.createdAt).toLocaleString()} 
                icon={Clock} 
                t={t} 
              />
              <DetailRow 
                label="Source" 
                value={transaction.senderAccountId || "External Source"} 
                icon={ArrowDownLeft} 
                t={t} 
              />
              <DetailRow 
                label="Destination" 
                value={transaction.receiverAccountId || "Self Account"} 
                icon={ArrowUpRight} 
                t={t} 
              />
           </div>

           {transaction.status === 'FAILED' && transaction.failureReason && (
             <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3">
                <AlertCircle className="text-red-500 shrink-0" size={16} />
                <p className="text-xs font-bold text-red-600 leading-tight">
                  {transaction.failureReason}
                </p>
             </div>
           )}
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
             Done
           </button>
        </div>
      </motion.div>
    </div>
  );
}

function DetailRow({ label, value, icon: Icon, t }: { label: string; value: string; icon: any; t: any }) {
  return (
    <div className="flex items-center justify-between gap-4">
       <div className="flex items-center gap-2">
          <Icon size={14} className="text-slate-400" />
          <span className={cn("text-[10px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>{label}</span>
       </div>
       <span className={cn("text-xs font-bold text-right truncate max-w-[180px]", t.text.heading)}>{value}</span>
    </div>
  );
}

function Icon({ type }: { type: TransactionType }) {
  const map = {
    DEPOSIT: <ArrowDownLeft size={24} />,
    WITHDRAW: <ArrowUpRight size={24} />,
    TRANSFER: <RefreshCcw size={24} />,
  };
  return map[type];
}

function StatusIndicator({ status }: { status: TransactionStatus }) {
  const map = {
    SUCCESS: { icon: CheckCircle2, color: "text-green-600", label: "Payment Successful" },
    PENDING: { icon: Clock, color: "text-orange-500", label: "Processing..." },
    FAILED: { icon: AlertCircle, color: "text-red-500", label: "Payment Failed" },
  };
  const { icon: SIcon, color, label } = map[status];
  return (
    <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10")}>
       <SIcon size={12} className={color} />
       <span className={cn("text-[9px] font-bold uppercase tracking-widest", color)}>{label}</span>
    </div>
  );
}
