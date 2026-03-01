"use client";
import React from "react";
import { 
  CheckCircle, XCircle, Clock, Download, 
  History, ArrowUpRight, Activity, Terminal
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { IPayment } from "@/types/IPayment";
import { IBiller } from "@/types/IBill";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/ui/pagination";

interface RecentPaymentsViewProps {
  payments: IPayment[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RecentPaymentsView: React.FC<RecentPaymentsViewProps> = ({ payments, currentPage, totalPages, onPageChange }) => {
  const { theme: t } = useTheme();

  const getStatusConfig = (status?: IPayment["status"]) => {
    switch (status) {
      case "SUCCESS":
        return {
          icon: <CheckCircle size={14} className="text-[#c1ff72]" />,
          text: "COMPLETED",
          color: "text-[#c1ff72]",
          bg: "bg-[#c1ff72]/10",
          border: "border-[#c1ff72]/20"
        };
      case "FAILED":
        return {
          icon: <XCircle size={14} className="text-red-400" />,
          text: "TERMINATED",
          color: "text-red-400",
          bg: "bg-red-400/10",
          border: "border-red-400/20"
        };
      case "PENDING":
      case "PROCESSING":
        return {
          icon: <Clock size={14} className="text-orange-400" />,
          text: "TRANSMITTING",
          color: "text-orange-400",
          bg: "bg-orange-400/10",
          border: "border-orange-400/20"
        };
      default:
        return {
          icon: <Activity size={14} className="text-slate-400" />,
          text: "UNKNOWN",
          color: "text-slate-400",
          bg: "bg-slate-500/10",
          border: "border-slate-500/20"
        };
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!payments.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-col items-center justify-center py-24 px-8 ${t.card.base} ${t.radius.lg} border border-dashed border-black/10 dark:border-white/10`}
      >
        <div className="w-24 h-24 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center mb-8 relative">
           <div className="absolute inset-0 bg-black/5 blur-xl rounded-full" />
           <History size={40} className={`${t.text.muted} opacity-40 relative z-10`} />
        </div>
        <div className="text-center space-y-3 max-w-sm">
           <h3 className={`text-2xl font-black tracking-tight ${t.text.heading}`}>System Idle</h3>
           <p className={`text-sm font-medium ${t.text.body} opacity-50`}>
             No transmission logs detected in the recent activity matrix. Proceed with a transaction to initialize logs.
           </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {payments.map((payment, index) => {
          const status = getStatusConfig(payment.status);
          const payee = payment.payeeId as IBiller;

          return (
            <motion.div
              key={payment._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 8 }}
              className={`relative overflow-hidden ${t.card.base} ${t.radius.lg} p-6 border border-black/5 dark:border-white/5 shadow-lg group transition-all duration-500 hover:border-[#c1ff72]/20 hover:shadow-2xl`}
            >
              {/* Decorative Signal Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-transparent via-[#c1ff72]/20 to-transparent group-hover:via-[#c1ff72] transition-colors" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                {/* Payee Info */}
                <div className="flex items-center gap-5">
                   <div className={`w-16 h-16 rounded-2xl ${t.card.base} border border-black/5 dark:border-white/5 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                      <Terminal size={28} className="text-[#c1ff72]" />
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <h4 className={`${t.text.heading} font-black text-xl tracking-tight`}>
                           {payee?.name || "Service Node"}
                         </h4>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${status.bg} ${status.color} border ${status.border}`}>
                            {status.text}
                         </span>
                      </div>
                      <p className={`${t.text.muted} text-[10px] font-black uppercase tracking-widest opacity-60`}>
                        Ref: {payment.referenceId?.slice(0, 16) || "NO_REF_ID"}
                      </p>
                   </div>
                </div>

                {/* Amount and Meta */}
                <div className="flex items-center justify-between md:justify-end gap-12 flex-1">
                   <div className="text-left md:text-right space-y-1">
                      <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${t.text.muted} opacity-40`}>Total Allocated</p>
                      <div className="flex items-baseline gap-2 md:justify-end">
                         <span className={`text-2xl font-black tracking-tighter ${t.text.display}`}>₹{payment.amount}</span>
                         <span className={`text-[10px] font-black ${t.text.muted}`}>INR</span>
                      </div>
                   </div>

                   <div className="hidden lg:block text-right space-y-1">
                      <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${t.text.muted} opacity-40`}>Time Stamp</p>
                      <p className={`text-xs font-black ${t.text.heading}`}>
                        {formatDate(payment.completedAt ?? payment.createdAt)}
                      </p>
                   </div>

                   <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-center ${t.text.muted} hover:text-[#c1ff72] hover:bg-[#c1ff72]/5 transition-colors`}
                        title="Download Data"
                      >
                        <Download size={18} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-center ${t.text.muted} hover:text-[#c1ff72] hover:bg-[#c1ff72]/5 transition-colors`}
                        title="Protocol Trace"
                      >
                        <ArrowUpRight size={18} />
                      </motion.button>
                   </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
     <Pagination
      currentPage={currentPage}
      totalPage={totalPages||1}
      onPageChange={onPageChange}
     />
    </div>
  );
};

export default RecentPaymentsView;
