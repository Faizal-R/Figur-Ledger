import { Percent, Calendar, DollarSign, TrendingUp, CheckCircle2 } from "lucide-react";
import { FinledgerTheme } from "@/theme";

interface LoanProduct {
  name: string;
  annualInterestRate: number;
  maxAmount: number;
  minAmount?: number;
  allowedTenuresInMonths: number[];
  isActive: boolean;
  processingTime?: string;
  features?: string[];
}

export default function LoanProductCard({
  product,
  onApply,
}: {
  product: LoanProduct;
  onApply: () => void;
}) {
  const maxTenure = Math.max(...product.allowedTenuresInMonths);
  const minAmount = product.minAmount || 5000;

  return (
    <div
      className={`
        ${FinledgerTheme.card}
        ${FinledgerTheme.radius.lg}
        ${FinledgerTheme.border}
        p-6
        relative
        transition-all
        duration-300
        w-full
        max-w-[340px]
        mx-auto
        group
        ${
          product.isActive
            ? "hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/30 cursor-pointer"
            : "opacity-50"
        }
      `}
    >


      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with product name and status badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1 leading-tight">
              {product.name}
            </h3>
            {product.processingTime && (
              <p className="text-xs text-slate-400">
                Approved in {product.processingTime}
              </p>
            )}
          </div>

          {product.isActive && (
            <div className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span className="font-medium">Active</span>
            </div>
          )}
        </div>

        {/* Interest rate - prominent display */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mb-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Percent className="w-4 h-4 text-emerald-400" />
            <span className="text-3xl font-bold text-white">
              {product.annualInterestRate}%
            </span>
          </div>
          <p className="text-xs text-slate-400">Annual Interest Rate</p>
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Max Amount */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Max Loan
              </p>
            </div>
            <p className="text-base font-bold text-white">
              ₹{(product.maxAmount / 100000).toFixed(1)}L
            </p>
          </div>

          {/* Tenure */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Tenure
              </p>
            </div>
            <p className="text-base font-bold text-white">
              Up to {maxTenure}mo
            </p>
          </div>
        </div>

        {/* Min amount info */}
        <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
          <p className="text-xs text-slate-400">
            Minimum loan amount:{" "}
            <span className="text-white font-medium">
              ₹{minAmount.toLocaleString()}
            </span>
          </p>
        </div>

        {/* Features list */}
        {product.features && product.features.length > 0 && (
          <div className="mb-5 space-y-2">
            {product.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Apply button */}
        <button
          disabled={!product.isActive}
          onClick={onApply}
          className={`
            w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300
            ${
              product.isActive
                ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/40 active:scale-[0.98]"
                : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          {product.isActive ? "Apply Now" : "Currently Unavailable"}
        </button>
      </div>

      {/* Corner decoration */}
      {product.isActive && (
        <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-emerald-400/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </div>
  );
}
