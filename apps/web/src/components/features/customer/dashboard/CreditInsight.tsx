import { FinledgerTheme } from "@/theme";

export default function CreditInsight() {
  return (
    <div className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.lg} p-6`}>
      <h3 className="text-white font-semibold mb-2">Credit Insight</h3>
      <p className="text-slate-400 text-sm">
        You have a strong repayment history. Continue timely EMIs to unlock lower interest rates.
      </p>
    </div>
  );
}
