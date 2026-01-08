"use client";

import { useEffect, useState } from "react";
import { FinledgerTheme } from "@/theme";

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
      <Card title="Total Deposits" value={`₹ ${stats.deposits}`} />
      <Card title="Total Withdrawals" value={`₹ ${stats.withdrawals}`} />
      <Card title="Pending Transfers" value={`₹ ${stats.pending}`} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 backdrop-blur-md ${FinledgerTheme.accent.glow}`}
    >
      <p className={`${FinledgerTheme.text.muted} text-sm mb-2`}>{title}</p>
      <h3 className={`text-3xl font-bold ${FinledgerTheme.text.primary}`}>
        {value}
      </h3>
    </div>
  );
}
