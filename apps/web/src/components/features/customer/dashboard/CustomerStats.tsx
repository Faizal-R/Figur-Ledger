import { FinledgerTheme } from "@/theme";

const stats = [
  { label: "Total Accounts", value: "2" },
  { label: "Active Loans", value: "1" },
  { label: "Outstanding Amount", value: "₹2,10,000" },
];

export default function CustomerStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.lg} p-6`}
        >
          <p className="text-sm text-slate-400">{s.label}</p>
          <p className="text-2xl font-bold text-white mt-2">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
