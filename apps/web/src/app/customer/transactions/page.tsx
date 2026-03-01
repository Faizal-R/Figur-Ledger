import { FigurLedgerTheme } from "@/theme";
import TransactionsClientPage from "@/components/client-pages/TransactionClientPage";

export default function TransactionsPage() {
  return (
    <div className={`min-h-screen p-8`}>
      <div className="max-w-7xl mx-auto space-y-10">
        <TransactionsClientPage />
      </div>
    </div>
  );
}
