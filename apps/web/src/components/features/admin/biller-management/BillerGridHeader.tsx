// src/components/admin/biller-management/components/BillerGridHeader.jsx
import { Filter } from "lucide-react";
import { FinledgerTheme } from "@/theme";

export default function BillerGridHeader({ billerCount }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className={`text-xl font-semibold ${FinledgerTheme.text.primary}`}>
        All Billers <span className="text-emerald-400">({billerCount})</span>
      </h2>
      
      <div className="flex items-center gap-3">
        {/* Filter Dropdown */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <select 
            className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} pl-10 pr-8 py-2 rounded-lg`}
            id="status-filter"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>
        
        {/* Category Filter */}
        <select 
          className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} px-4 py-2 rounded-lg`}
          id="category-filter"
        >
          <option>All Categories</option>
          <option value="ELECTRICITY">⚡ Electricity</option>
          <option value="WATER">💧 Water</option>
          <option value="GAS">🔥 Gas</option>
          <option value="TELECOM">📱 Telecom</option>
          <option value="INTERNET">🌐 Internet</option>
        </select>
      </div>
    </div>
  );
}