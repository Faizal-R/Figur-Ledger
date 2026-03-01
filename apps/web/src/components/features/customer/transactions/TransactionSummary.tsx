"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface Summary {
  deposits: number;
  withdrawals: number;
  pending: number;
}

export default function TransactionSummary() {
  const [stats, setStats] = useState<Summary>({
    deposits: 0,
    withdrawals: 0,
    pending: 0,
  });

  useEffect(() => {
    fetch("/api/transactions/summary")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Volume Inbound" value={`₹${stats.deposits.toLocaleString()}`} />
      <Card title="Volume Outbound" value={`₹${stats.withdrawals.toLocaleString()}`} />
      <Card title="Pending Resolution" value={`₹${stats.pending.toLocaleString()}`} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  const { theme: t } = useTheme();
  return (
    <div
      className={cn(
        t.card.base,
        t.radius.lg,
        "p-8 border border-black/5 dark:border-white/5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
      )}
    >
      <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3", t.text.muted)}>{title}</p>
      <h3 className={cn("text-3xl font-black tracking-tighter transition-all group-hover:text-[#b0f061]", t.text.heading)}>
        {value}
      </h3>
      <div className="mt-4 h-1 w-0 bg-[#b0f061] group-hover:w-full transition-all duration-500 rounded-full" />
    </div>
  );
}
