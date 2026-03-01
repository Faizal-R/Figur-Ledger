import { useGetAllLoanEmis, useGetAllLoanApplicationsByUserAndStatus } from "@/hooks/api/useLoan";
import { useTheme } from "@/context/ThemeContext";
import { useAuthUserStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ShieldCheck, 
  Calendar, AlertCircle,
  TrendingUp, Download, Receipt, Zap, History, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ILoanApplication } from "@/types/ILoan";
import { EliteTheme } from "@/theme";

type ThemeType = typeof EliteTheme.light;

type ScheduleStatus = "PAID" | "PENDING" | "OVERDUE";

interface RepaymentSchedule {
  scheduleNumber: number;
  dueDate: string;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  status: ScheduleStatus;
}

export default function LoanDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthUserStore();
  const { theme: t } = useTheme();
  const [selected, setSelected] = useState<RepaymentSchedule | null>(null);

  const { data: emiData, isLoading: emisFetching, error: emiError } = useGetAllLoanEmis(id);
  const { data: loanData, isLoading: loansFetching } = useGetAllLoanApplicationsByUserAndStatus(user?.id as string, "ACTIVE");

  const loan = useMemo(() => {
    return loanData?.data.find((l: ILoanApplication) => l._id === id || l.id === id);
  }, [loanData, id]);

  const schedules: RepaymentSchedule[] = emiData?.data || [];
  const nextEmi = schedules.find((s: RepaymentSchedule) => s.status === "PENDING" || s.status === "OVERDUE");
  
  const totalPaid = schedules
    .filter((s: RepaymentSchedule) => s.status === "PAID")
    .reduce((acc: number, s: RepaymentSchedule) => acc + s.totalAmount, 0);
  
  const totalLoanAmount = loan?.totalPayableAmount || schedules.reduce((acc: number, s) => acc + s.totalAmount, 0);
  const progressPercent = totalLoanAmount > 0 ? (totalPaid / totalLoanAmount) * 100 : 0;

  if (emisFetching || loansFetching) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center bg-black/5 dark:bg-[#050a09]")}>
        <div className="flex flex-col items-center gap-4">
           <Zap className="animate-pulse text-[#c1ff72]" size={40} />
           <p className={cn("text-[10px] font-black uppercase tracking-[0.4em]", t.text.muted)}>Initializing Secure Node</p>
        </div>
      </div>
    );
  }

  if (emiError || !loan) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center bg-black/5 dark:bg-[#050a09]")}>
        <div className="text-center space-y-4">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <h2 className={cn("text-xl font-black uppercase tracking-tighter text-red-400")}>Protocol Retrieval Error</h2>
          <p className={cn("text-sm opacity-60", t.text.muted)}>Loan signature could not be verified on the ledger network.</p>
          <button 
            onClick={() => router.back()}
            className={cn("mt-6 h-12 px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest", t.button.onyx)}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="animate"
      className={cn("min-h-screen pb-20 px-6 pt-10", t.background)}
    >
      {/* Top Header */}
      <motion.div variants={item} className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => router.back()}
             className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/5", t.card.base)}
           >
              <ArrowLeft size={20} className={t.text.heading} />
           </button>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <ShieldCheck size={14} className="text-[#c1ff72]" />
                 <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-50", t.text.muted)}>Secure Ledger Protocol</span>
              </div>
              <h1 className={cn("text-3xl font-black tracking-tighter uppercase", t.text.heading)}>
                Loan <span className="text-[#c1ff72]">Details.</span>
              </h1>
           </div>
        </div>

        <div className={cn("hidden md:flex flex-col items-end pt-2")}>
           <span className={cn("text-[9px] font-black uppercase tracking-widest opacity-40 mb-1", t.text.muted)}>Deployment ID</span>
           <span className={cn("text-xs font-black uppercase tracking-tighter font-mono bg-black/10 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5", t.text.heading)}>
             #{ (loan._id || loan.id || "").slice(-12).toUpperCase() }
           </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Stats & Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Card */}
          <motion.div 
            variants={item}
            className={cn("p-8 relative overflow-hidden group shadow-2xl", t.card.base, t.radius.lg)}
          >
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#c1ff72]/5 blur-3xl rounded-full -mr-32 -mt-32" />
             
             <div className="flex flex-wrap gap-10 items-end relative z-10">
                <div className="space-y-1">
                   <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-40", t.text.muted)}>Approved Principal</p>
                   <h2 className={cn("text-5xl font-black tracking-tighter", t.text.heading)}>₹{ (loan.approvedAmount || 0).toLocaleString() }</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6 pb-2">
                   <MiniStat label="Tenure" value={`${loan.tenureInMonths} Months`} icon={<Calendar size={12} />} t={t} />
                   <MiniStat label="Rate" value={`${loan.annualInterestRate}% PA`} icon={<TrendingUp size={12} />} t={t} />
                   <MiniStat label="Monthly EMI" value={`₹${ (loan.emiAmount || 0).toLocaleString() }`} icon={<Receipt size={12} />} t={t} />
                </div>
             </div>

             {/* Repayment Progress */}
             <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 relative z-10">
                <div className="flex justify-between items-end mb-4">
                   <div>
                      <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-40 mb-1", t.text.muted)}>Repayment Progress</p>
                      <h4 className={cn("text-sm font-black tracking-tight", t.text.heading)}>
                        ₹{totalPaid.toLocaleString()} <span className="opacity-40 font-bold ml-1">/ ₹{totalLoanAmount.toLocaleString()}</span>
                      </h4>
                   </div>
                   <span className="text-xl font-black tracking-tighter text-[#c1ff72]">{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${progressPercent}%` }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                     className="h-full bg-linear-to-r from-[#c1ff72] to-[#4caf50]"
                   />
                </div>
             </div>
          </motion.div>

          {/* Repayment Timeline */}
          <motion.div variants={item} className="space-y-6">
             <div className="flex justify-between items-end">
                <div>
                   <h3 className={cn("text-xl font-black tracking-tighter uppercase", t.text.heading)}>Repayment <span className="text-[#c1ff72]">Nodes.</span></h3>
                   <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>Execution History & Forecast</p>
                </div>
                <div className="flex gap-2">
                   <StatusLegend label="Paid" color="bg-emerald-500" t={t} />
                   <StatusLegend label="Pending" color="border border-emerald-400" t={t} />
                </div>
             </div>

             <div className={cn("p-6 overflow-hidden", t.card.base, t.radius.lg)}>
                <div className="flex gap-10 overflow-x-auto pb-6 snap-x pointer-events-auto">
                   {schedules.map((s) => (
                      <TimelineItem 
                        key={s.scheduleNumber} 
                        s={s} 
                        t={t} 
                        isSelected={selected?.scheduleNumber === s.scheduleNumber}
                        onClick={() => setSelected(s)} 
                      />
                   ))}
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right Section: Next EMI & Details */}
        <div className="space-y-8">
           {/* Next Payment Card */}
           {nextEmi && (
              <motion.div 
                variants={item}
                className={cn("p-8 bg-[#c1ff72] shadow-[0_20px_40px_rgba(193,255,114,0.3)] relative overflow-hidden", t.radius.lg)}
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={80} className="text-black" />
                 </div>
                 <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/50 mb-1">Upcoming EMI</p>
                    <h3 className="text-4xl font-black tracking-tighter text-black mb-6">
                      ₹{nextEmi.totalAmount.toLocaleString()}
                    </h3>
                    <div className="flex items-center gap-6 mb-8">
                       <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-1">Due Date</p>
                          <p className="text-sm font-black text-black">
                             {new Date(nextEmi.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                       </div>
                       <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-1">Status</p>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/10 border border-black/10">
                             <div className={cn("w-1.5 h-1.5 rounded-full", nextEmi.status === 'OVERDUE' ? "bg-red-600 animate-pulse" : "bg-black/40")} />
                             <span className="text-[9px] font-black uppercase text-black">{nextEmi.status}</span>
                          </div>
                       </div>
                    </div>
                    <button className="w-full h-14 rounded-2xl bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                       Initialize Repayment
                    </button>
                 </div>
              </motion.div>
           )}

           {/* Selected Component Card/Drawer Content */}
           <AnimatePresence mode="wait">
              {selected ? (
                <motion.div 
                  key={`selected-${selected.scheduleNumber}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn("p-8 relative", t.card.base, t.radius.lg)}
                >
                   <button 
                     onClick={() => setSelected(null)}
                     className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                   >
                      <X size={16} className={t.text.heading} />
                   </button>

                   <div className="mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-[#c1ff72]/10 flex items-center justify-center text-[#c1ff72] mb-4">
                         <History size={20} />
                      </div>
                      <h3 className={cn("text-xl font-black tracking-tighter uppercase", t.text.heading)}>Node #{selected.scheduleNumber}</h3>
                      <p className={cn("text-[9px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>Detailed Transaction Analysis</p>
                   </div>

                   <div className="space-y-4">
                      <DrawerRow label="Scheduled Date" value={new Date(selected.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} t={t} />
                      <DrawerRow label="Principal Allocation" value={`₹${selected.principalAmount.toLocaleString()}`} t={t} />
                      <DrawerRow label="Interest Overhead" value={`₹${selected.interestAmount.toLocaleString()}`} t={t} />
                      <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5">
                        <DrawerRow label="Terminal Settlement" value={`₹${selected.totalAmount.toLocaleString()}`} t={t} strong />
                      </div>
                   </div>

                   <button className={cn("mt-8 w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3", t.button.glass)}>
                      <Download size={14} />
                      Download Receipt
                   </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty-selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn("p-8 border-2 border-dashed border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center py-20", t.radius.lg)}
                >
                   <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4 opacity-40">
                      <Zap size={24} className={t.text.muted} />
                   </div>
                   <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-30 max-w-[180px]", t.text.muted)}>
                     Select a repayment node to view detailed telemetry
                   </p>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function MiniStat({ label, value, icon, t }: { label: string; value: string; icon: ReactNode; t: ThemeType }) {
  return (
    <div className="space-y-1">
       <div className="flex items-center gap-1.5 opacity-40">
          <span className="text-[#c1ff72]">{icon}</span>
          <p className={cn("text-[8px] font-black uppercase tracking-widest", t.text.muted)}>{label}</p>
       </div>
       <p className={cn("text-lg font-black tracking-tighter whitespace-nowrap", t.text.heading)}>{value}</p>
    </div>
  );
}

function TimelineItem({ s, t, isSelected, onClick }: { s: RepaymentSchedule; t: ThemeType; isSelected: boolean; onClick: () => void }) {
  const isPaid = s.status === "PAID";
  const isOverdue = s.status === "OVERDUE";

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center min-w-[80px] snap-center cursor-pointer group transition-all duration-300",
        isSelected ? "scale-110" : "opacity-70 hover:opacity-100"
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm shadow-xl transition-all duration-500",
            isPaid
              ? "bg-[#c1ff72] text-[#0a1a15]"
              : isOverdue
              ? "bg-red-600 text-white animate-pulse"
              : "border-2 border-[#1a3a32] dark:border-[#c1ff72]/30 text-white/50 bg-black/5 dark:bg-white/2"
          )}
        >
          {s.scheduleNumber}
        </div>
        {isSelected && (
          <motion.div 
            layoutId="active-indicator"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#c1ff72] shadow-[0_0_10px_#c1ff72]" 
          />
        )}
      </div>

      <div className="mt-4 text-center">
        <span className={cn("block text-[8px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>
          {new Date(s.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        <span className={cn("block text-[11px] font-black tracking-tighter mt-0.5", t.text.heading)}>
          ₹{Math.round(s.totalAmount/1000)}k
        </span>
      </div>
    </div>
  );
}

function StatusLegend({ label, color, t }: { label: string; color: string; t: ThemeType }) {
  return (
    <div className="flex items-center gap-1.5">
       <div className={cn("w-2 h-2 rounded-full", color)} />
       <span className={cn("text-[8px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>{label}</span>
    </div>
  );
}

function DrawerRow({ 
  label, 
  value, 
  t, 
  strong 
}: { 
  label: string; 
  value: string; 
  t: ThemeType; 
  strong?: boolean 
}) {
  return (
    <div className="flex justify-between items-center group/row">
      <span className={cn("text-[9px] font-black uppercase tracking-widest opacity-40 group-hover/row:opacity-60 transition-opacity", t.text.muted)}>{label}</span>
      <span className={cn(
        "font-black tracking-tight transition-all", 
        strong ? t.text.heading + " text-lg" : t.text.body + " text-sm"
      )}>
        {value}
      </span>
    </div>
  );
}
