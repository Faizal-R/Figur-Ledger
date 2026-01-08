import { FinledgerTheme } from "@/theme";

export default function LoanInsightPanel() {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border} p-6`}
    >
      <h3 className="font-semibold text-white mb-3">
        Platform Rules & Notes
      </h3>

      <ul className="text-sm text-slate-400 space-y-2 list-disc pl-5">
        <li>Loan products cannot be deleted once used in disbursement</li>
        <li>APR changes affect only new loan applications</li>
        <li>Inactive products remain visible in historical records</li>
        <li>All changes are audit logged</li>
      </ul>
    </div>
  );
}
