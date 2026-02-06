import { FinledgerTheme } from "@/theme";

export default function LoanControlHero() {
  return (
    <div
      className={`relative overflow-hidden ${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border} p-8`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Loan Product Control Center
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            Define, activate, and govern loan products used across the platform.
            Changes here directly affect customer eligibility and repayments.
          </p>
        </div>

        <div className="flex gap-4">
          <Kpi label="Total Products" value="6" />
          <Kpi label="Active" value="4" accent />
          <Kpi label="Drafts" value="2" />
        </div>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`px-5 py-3 rounded-xl border backdrop-blur ${
        accent
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
          : "border-slate-700 bg-slate-800/40 text-slate-300"
      }`}
    >
      <p className="text-xs">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
