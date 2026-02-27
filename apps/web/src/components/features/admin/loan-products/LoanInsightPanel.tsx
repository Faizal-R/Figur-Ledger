"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function LoanInsightPanel() {
  const { theme: t } = useTheme();
  return (
    <div
      className={cn(t.card.base, t.radius.lg, "p-6")}
    >
      <h3 className={cn("font-bold uppercase tracking-widest text-[13px] mb-4", t.text.heading)}>
        Platform Rules & Notes
      </h3>

      <ul className={cn("text-sm space-y-3 list-disc pl-5", t.text.body)}>
        <li>Loan products cannot be deleted once used in disbursement</li>
        <li>APR changes affect only new loan applications</li>
        <li>Inactive products remain visible in historical records</li>
        <li>All changes are audit logged</li>
      </ul>
    </div>
  );
}
