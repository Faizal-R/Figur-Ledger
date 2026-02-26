"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Accounts", value: "2" },
  { label: "Active Loans", value: "1" },
  { label: "Outstanding Amount", value: "₹2,10,000" },
];

export default function CustomerStats() {
  const { theme: t } = useTheme();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={cn(t.card.base, t.radius.lg, "p-8 border border-black/5 dark:border-white/5 shadow-xl transition-all duration-300 hover:shadow-2xl")}
        >
          <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-60", t.text.muted)}>{s.label}</p>
          <p className={cn("text-3xl font-black tracking-tighter mt-2", t.text.heading)}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
