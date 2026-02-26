"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

const transactions = [
  { id: 1, label: "EMI Paid", amount: "- ₹12,450", type: "DEBIT" },
  { id: 2, label: "Loan Disbursed", amount: "+ ₹2,50,000", type: "CREDIT" },
];

export default function RecentTransactions() {
  const { theme: t } = useTheme();
  return (
    <div className={cn(t.card.base, t.radius.lg, "p-8 border border-black/5 dark:border-white/5 shadow-xl")}>
      <div className="flex items-center gap-4 mb-8">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5")}>
           <Activity size={18} className={t.text.lime} />
        </div>
        <h3 className={cn("text-xl font-black uppercase tracking-tighter", t.text.heading)}>Ledger Stream.</h3>
      </div>

      <ul className="space-y-4">
        {transactions.map((tx) => (
          <li key={tx.id} className="flex justify-between items-center p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all group">
            <span className={cn("text-xs font-bold uppercase tracking-widest transition-transform group-hover:translate-x-1", t.text.muted)}>{tx.label}</span>
            <span className={cn(
              "text-sm font-black tracking-widest",
              tx.type === "CREDIT" ? "text-[#b0f061]" : t.text.heading
            )}>
              {tx.amount}
            </span>
          </li>
        ))}
      </ul>
      
      <button className={cn("mt-8 w-full py-3 rounded-xl uppercase text-[9px] font-black tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity underline-offset-8 border-t border-black/5 dark:border-white/5", t.text.muted)}>
        Access Complete Audit Log
      </button>
    </div>
  );
}
