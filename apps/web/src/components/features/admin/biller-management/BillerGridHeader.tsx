"use client";
import { Filter } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function BillerGridHeader({ billerCount }: { billerCount: number }) {
  const { theme: t } = useTheme();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h2 className={cn("text-2xl font-black tracking-tighter uppercase", t.text.display)}>
        All Billers <span className="text-[#4caf50]">({billerCount})</span>
      </h2>
      
      <div className="flex flex-wrap items-center gap-4">
        {/* Filter Dropdown */}
        <div className="relative group">
          <Filter className={cn("absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 group-focus-within:text-[#b0f061]", t.text.muted)} size={16} />
          <select 
            className={cn(
              "pl-12 pr-10 py-2.5 rounded-xl border transition-all duration-300 outline-none font-bold text-xs tracking-widest uppercase appearance-none cursor-pointer",
              "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061] focus:ring-4 focus:ring-[#b0f061]/10",
              t.text.heading
            )}
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
          className={cn(
              "px-6 py-2.5 rounded-xl border transition-all duration-300 outline-none font-bold text-xs tracking-widest uppercase appearance-none cursor-pointer",
              "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061] focus:ring-4 focus:ring-[#b0f061]/10",
              t.text.heading
            )}
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