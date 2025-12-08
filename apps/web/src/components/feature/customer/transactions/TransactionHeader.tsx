
import { FinledgerTheme } from "@/theme";

export default function TransactionHeader() {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 flex items-center justify-between`}
    >
      <div>
        <h2 className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>
          Transaction Ledger
        </h2>
        <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
          Immutable financial activity log
        </p>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        Read Only
      </span>
    </div>
  );
}
