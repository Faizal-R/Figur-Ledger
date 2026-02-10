
import { Building2, TrendingUp, Search } from "lucide-react";
import { FinledgerTheme } from "@/theme";
import { IBiller } from "@/types/IBill";

export default function BillerStatsBar({ billers }:{billers:IBiller[]}) {
  const activeBillers = billers.filter(b => b.isActive).length;
  
  return (
    <div className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Total Billers */}
          <div className="flex items-center gap-3">
            <div className={`p-3 ${FinledgerTheme.gradients.subtleEmerald} rounded-xl`}>
              <Building2 className="text-emerald-400" size={22} />
            </div>
            <div>
              <p className={`text-sm ${FinledgerTheme.text.secondary}`}>Total Billers</p>
              <p className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>
                {billers.length}
              </p>
            </div>
          </div>
          
          {/* Active Billers */}
          <div className="flex items-center gap-3">
            <div className={`p-3 ${FinledgerTheme.gradients.subtleEmerald} rounded-xl`}>
              <TrendingUp className="text-emerald-400" size={22} />
            </div>
            <div>
              <p className={`text-sm ${FinledgerTheme.text.secondary}`}>Active</p>
              <p className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>
                {activeBillers}
              </p>
            </div>
          </div>
          
          {/* Inactive Billers */}
          <div className="flex items-center gap-3">
            <div className={`p-3 ${FinledgerTheme.gradients.subtleEmerald} rounded-xl`}>
              <div className="text-emerald-400 text-lg font-bold">{(billers.length - activeBillers)}</div>
            </div>
            <div>
              <p className={`text-sm ${FinledgerTheme.text.secondary}`}>Inactive</p>
              <p className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>
                {billers.length - activeBillers}
              </p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search billers by name or category..."
            className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} pl-12 pr-4 py-3 rounded-full w-80`}
            id="biller-search-input"
          />
        </div>
      </div>
    </div>
  );
}