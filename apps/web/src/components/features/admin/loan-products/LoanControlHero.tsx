"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function LoanControlHero() {
  const { theme: t } = useTheme();
  return (
    <div
      className={cn("relative overflow-hidden p-8", t.card.base, t.radius.lg)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#b0f061]/10 to-transparent" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className={cn("text-3xl font-black tracking-tighter uppercase", t.text.display)}>
            Loan Product Control <span className="text-[#4caf50]">Center</span>
          </h1>
          <p className={cn("mt-2 max-w-xl font-medium", t.text.body)}>
            Define, activate, and govern loan products used across the platform.
            Changes here directly affect customer eligibility and repayments.
          </p>
        </div>

        <div className="flex gap-4">
          <Kpi label="Total Products" value="12" />
          <Kpi label="Active" value="8" accent />
          <Kpi label="Drafts" value="4" />
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
  const { theme: t } = useTheme();
  return (
    <div
      className={cn(
        "px-6 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-105",
        accent
          ? "border-[#b0f061]/40 bg-[#b0f061]/10 text-[#2d5a4c]"
          : cn("border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5", t.text.body)
      )}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{label}</p>
      <p className="text-2xl font-black tracking-tighter mt-1">{value}</p>
    </div>
  );
}
