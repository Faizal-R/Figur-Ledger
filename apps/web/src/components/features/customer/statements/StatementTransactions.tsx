"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Search, Filter, Download, MoreHorizontal } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  type: 'debit' | 'credit';
  amount: number;
  balance: number;
}

interface StatementTransactionsProps {
  transactions: Transaction[];
  currency: string;
}

export default function StatementTransactions({ transactions, currency }: StatementTransactionsProps) {
  const { theme: t } = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className={cn(t.card.base, t.radius.lg, "overflow-hidden shadow-2xl")}>
      {/* Table Header / Toolbar */}
      <div className="p-6 border-b border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className={cn("text-lg font-black tracking-tighter uppercase", t.text.heading)}>Detailed Transactions</h3>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50", t.text.muted)} />
            <input 
              type="text" 
              placeholder="Search description..." 
              className={cn(
                "w-full pl-10 pr-4 py-2 text-xs font-medium bg-black/5 dark:bg-white/5 border-none", 
                t.radius.sm,
                t.text.body,
                "focus:ring-2 focus:ring-lime-400 outline-none transition-all"
              )}
            />
          </div>
          <button className={cn(t.button.glass, "p-2", t.radius.sm)}>
            <Filter className="w-4 h-4" />
          </button>
          <button className={cn(t.button.primary, "px-4 py-2 flex items-center gap-2", t.radius.sm)}>
            <Download className="w-4 h-4" />
            <span className="text-[10px] uppercase font-black">Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5 transition-colors">
              <th className={cn("px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]", t.text.muted)}>Date</th>
              <th className={cn("px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]", t.text.muted)}>Transaction Description</th>
              <th className={cn("px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-right", t.text.muted)}>Amount</th>
              <th className={cn("px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-right", t.text.muted)}>Balance</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {transactions.map((tx) => (
              <tr key={tx.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200">
                <td className="px-6 py-5">
                  <p className={cn("text-sm font-bold", t.text.heading)}>{formatDate(tx.date)}</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 flex items-center justify-center transition-all",
                      t.radius.sm,
                      tx.type === 'credit' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                      {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className={cn("text-sm font-black tracking-tight", t.text.heading)}>{tx.description}</p>
                      <p className={cn("text-[10px] font-medium opacity-50 font-mono", t.text.muted)}>REF: {tx.reference}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <p className={cn(
                    "text-sm font-black tracking-tighter",
                    tx.type === 'credit' ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {tx.type === 'credit' ? '+' : '-'} {formatCurrency(tx.amount)}
                  </p>
                </td>
                <td className="px-6 py-5 text-right">
                  <p className={cn("text-sm font-bold opacity-80", t.text.body)}>{formatCurrency(tx.balance)}</p>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className={cn("opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-black/10 dark:hover:bg-white/10", t.radius.full)}>
                    <MoreHorizontal className={cn("w-4 h-4", t.text.muted)} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 border-t border-black/5 dark:border-white/5 flex justify-center">
        <button className={cn("text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2", t.text.muted)}>
          Load More History
        </button>
      </div>
    </div>
  );
}
