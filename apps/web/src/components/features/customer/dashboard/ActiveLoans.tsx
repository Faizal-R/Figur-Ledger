"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const loans = [
  {
    id: "LN-101",
    name: "Personal Loan",
    emi: "₹12,450",
    tenure: "18 months",
    outstanding: "₹2,10,000",
    status: "Active",
  },
];

export default function ActiveLoans() {
  const { theme: t } = useTheme();
  return (
    <div className="space-y-6">
      <h2 className={cn("text-2xl font-black uppercase tracking-tighter hover:translate-x-1 transition-transform", t.text.heading)}>Institutional Debt.</h2>

      {loans.map((loan) => (
        <div
          key={loan.id}
          className={cn(t.card.base, t.radius.lg, "p-8 border border-black/5 dark:border-white/5 shadow-xl transition-all duration-300 relative overflow-hidden group")}
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#b0f061] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className={cn("text-xl font-black tracking-tight", t.text.heading)}>{loan.name}</h3>
              <p className={cn("text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mt-1", t.text.muted)}>FACILITY: {loan.id}</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#b0f061]/20 text-[#2d5a4c]">
              {loan.status}
            </span>
          </div>

          <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 border-t border-black/5 dark:border-white/5 pt-6", t.text.body)}>
            <div className="space-y-1">
               <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Monthly Installment</p>
               <p className="text-xl font-black tracking-tighter">{loan.emi}</p>
            </div>
            <div className="space-y-1">
               <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Duration Remaining</p>
               <p className="text-xl font-black tracking-tighter">{loan.tenure}</p>
            </div>
            <div className="space-y-1">
               <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Outstanding Protocol</p>
               <p className="text-xl font-black tracking-tighter">{loan.outstanding}</p>
            </div>
          </div>

          <button className={cn(t.button.onyx, "w-full py-4 rounded-2xl uppercase text-[10px] font-black tracking-[0.3em] transition-all")}>
            Review Amortization Table
          </button>
        </div>
      ))}
    </div>
  );
}
