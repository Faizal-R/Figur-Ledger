"use client";

import { useGetAllLoanApplicationsByUserAndStatus } from "@/hooks/api/useLoan";
import { useAuthUserStore } from "@/store";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, IndianRupee, Clock, CheckCircle2 } from "lucide-react";

export default function MyLoansPage() {
  const router = useRouter();
  const { user } = useAuthUserStore();
  const { theme: t, mode } = useTheme();

  const { data, isLoading } = useGetAllLoanApplicationsByUserAndStatus(user?.id as string, "ACTIVE");

  const container = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="animate"
      className="space-y-8 pb-20"
    >
      <motion.div variants={item} className="space-y-1">
        <h1 className={cn("text-3xl font-bold tracking-tight", t.text.heading)}>My Loans</h1>
        <p className={cn("text-sm font-medium opacity-60", t.text.muted)}>View and manage your active loan applications.</p>
      </motion.div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
           {[1, 2].map(i => <div key={i} className={cn("h-48 animate-pulse rounded-2xl", mode === 'dark' ? "bg-white/5" : "bg-slate-100")} />)}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {(data?.data || []).length === 0 ? (
            <div className={cn("col-span-full p-12 text-center border-2 border-dashed rounded-3xl", mode === 'dark' ? "border-white/5" : "border-slate-200")}>
               <p className={cn("text-sm font-medium opacity-50", t.text.muted)}>No active loans found.</p>
            </div>
          ) : (
            (data?.data || []).map((loan: any) => (
              <motion.div
                key={loan._id}
                variants={item}
                className={cn(
                  "p-6 flex flex-col justify-between border hover:border-[#c1ff72] transition-colors",
                  t.card.base,
                  t.radius.md
                )}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-lg bg-[#c1ff72]/10 flex items-center justify-center text-[#c1ff72]">
                          <IndianRupee size={16} />
                       </div>
                       <h2 className={cn("text-lg font-bold", t.text.heading)}>
                         Loan #{loan._id.slice(-6).toUpperCase()}
                       </h2>
                    </div>

                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      loan.status === "ACTIVE" ? "bg-green-500/10 text-green-600" : "bg-slate-500/10 text-slate-500"
                    )}>
                      {loan.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Info label="Approved Amount" value={`₹${loan.approvedAmount.toLocaleString()}`} t={t} />
                    <Info label="Monthly EMI" value={`₹${loan.emiAmount.toLocaleString()}`} t={t} />
                    <Info label="Loan Tenure" value={`${loan.tenureInMonths} Months`} t={t} />
                    <div className="flex items-end">
                       <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                          <Clock size={12} className="text-slate-400" />
                          <span className={cn("text-[10px] font-bold", t.text.muted)}>In Progress</span>
                       </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/customer/loans/${loan._id}`)}
                  className={cn(
                    "mt-8 w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                    t.button.onyx
                  )}
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}

function Info({ label, value, t }: { label: string; value: string; t: any }) {
  return (
    <div className="space-y-1">
      <p className={cn("text-[10px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>{label}</p>
      <p className={cn("text-lg font-bold", t.text.heading)}>{value}</p>
    </div>
  );
}
