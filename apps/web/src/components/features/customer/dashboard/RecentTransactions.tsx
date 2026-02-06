import { FinledgerTheme } from "@/theme";

const transactions = [
  { id: 1, label: "EMI Paid", amount: "- ₹12,450" },
  { id: 2, label: "Loan Disbursed", amount: "+ ₹2,50,000" },
];

export default function RecentTransactions() {
  return (
    <div className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.lg} p-6`}>
      <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>

      <ul className="space-y-3 text-sm text-slate-400">
        {transactions.map((tx) => (
          <li key={tx.id} className="flex justify-between">
            <span>{tx.label}</span>
            <span className="text-white">{tx.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
