// src/components/admin/biller-management/components/EmptyState.jsx
import { Building2, PlusCircle, Search } from "lucide-react";
import { FinledgerTheme } from "@/theme";

export default function EmptyState() {
  return (
    <div className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.cardRounded} p-12 text-center`}>
      <div className="max-w-md mx-auto">
        <div className={`w-20 h-20 mx-auto ${FinledgerTheme.gradients.emeraldTeal} rounded-2xl flex items-center justify-center mb-6`}>
          <Building2 className="text-white" size={32} />
        </div>
        
        <h3 className={`text-xl font-bold ${FinledgerTheme.text.primary} mb-2`}>
          No Billers Found
        </h3>
        <p className={`${FinledgerTheme.text.secondary} mb-6`}>
          Get started by adding your first utility company or service provider
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className={`${FinledgerTheme.button.primary} px-6 py-3 rounded-full flex items-center justify-center gap-2`}
            id="open-create-biller-empty"
          >
            <PlusCircle size={18} />
            Create First Biller
          </button>
          
          <button className={`${FinledgerTheme.button.secondary} px-6 py-3 rounded-full flex items-center justify-center gap-2`}>
            <Search size={18} />
            View Documentation
          </button>
        </div>
        
        <div className={`mt-8 p-4 ${FinledgerTheme.gradients.subtleEmerald} rounded-xl border ${FinledgerTheme.border}`}>
          <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
            <span className="font-semibold text-emerald-400">Tip:</span> Billers are utility companies that customers can pay bills to.
          </p>
        </div>
      </div>
    </div>
  );
}