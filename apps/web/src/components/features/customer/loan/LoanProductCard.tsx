import { FinledgerTheme } from "@/theme";

export default function LoanProductCard({
  product,
  onApply,
}: {
  product: any;
  onApply: () => void;
}) {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border}
      p-6 transition ${
        product.isActive
          ? "hover:-translate-y-1 hover:shadow-xl"
          : "opacity-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">
          {product.name}
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
          {product.annualInterestRate}% p.a
        </span>
      </div>

      {/* Meta */}
      <div className="text-sm text-slate-400 space-y-1 mb-5">
        <p>
          Amount: ₹{product.minAmount.toLocaleString()} – ₹{product.maxAmount.toLocaleString()}
        </p>
        <p>
          Tenure: {product.allowedTenuresInMonths.join(", ")} months
        </p>
      </div>

      {/* CTA */}
      <button
        disabled={!product.isActive}
        onClick={onApply}
        className={`w-full py-3 rounded-xl font-medium transition ${
          product.isActive
            ? FinledgerTheme.button.secondary
            : "bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        {product.isActive ? "View Details" : "Unavailable"}
      </button>
    </div>
  );
}
