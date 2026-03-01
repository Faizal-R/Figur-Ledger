"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Wallet, FileText, History, Calendar, LayoutGrid } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAccount } from "@/types/user-account";


interface StatementGeneratorProps {
  onGenerate: (params: { 
    accountId: string; 
    type: "duration" | "fy"|"custom"; 
    value: string; 
    customRange: { startDate: string; endDate: string } 
  }) => void;
  accounts: IAccount[];
}

export default function StatementGenerator({ onGenerate, accounts }: StatementGeneratorProps) {
  const { theme: t } = useTheme();
  console.log(accounts)
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.id || "");
  const [selectionType, setSelectionType] = useState<"duration" | "fy">("duration");
  const [duration, setDuration] = useState("current_month");
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [customRange, setCustomRange] = useState({ startDate: "", endDate: "" });

  const durations = [
    { id: "current_month", label: "Current Month" },
    { id: "last_month", label: "Last Month" },
    { id: "last_2_months", label: "Last 2 Months" },
    { id: "current_fy", label: "Current Financial Year" },
    { id: "last_fy", label: "Last Financial Year" },
    { id: "custom", label: "Custom Date Range" },
  ];

  const financialYears = [
    "2025-2026",
    "2024-2025",
    "2023-2024",
    "2022-2023",
  ];

  const handleGenerate = () => {
    alert(selectedAccount)
    onGenerate({
      accountId: selectedAccount,
      type: duration === "custom" ? "custom" : selectionType,
      value: selectionType === "duration" ? duration : financialYear,
      customRange: duration === "custom" ? customRange : { startDate: "", endDate: "" },
    });
  };
  useEffect(()=>{
    setSelectedAccount(accounts[0]?.id || "");
  },[accounts])

  return (
    <div className={cn(t.card.base, t.radius.lg, "p-6 md:p-8 shadow-2xl overflow-hidden relative border-black/5 dark:border-white/5")}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />
      
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn("p-3 rounded-2xl bg-lime-500/10 text-lime-500 shadow-inner")}>
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className={cn("text-2xl font-black tracking-tighter uppercase leading-none", t.text.heading)}>
                Generate Report
              </h3>
              <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mt-1", t.text.muted)}>
                Custom Statement Filtering
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">
            <button 
              onClick={() => setSelectionType("duration")}
              className={cn(
                "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all",
                selectionType === "duration" ? cn("bg-white dark:bg-green-900 shadow-sm", t.radius.full, t.text.heading) : cn("opacity-50", t.text.muted)
              )}
            >
              By Duration
            </button>
            <button 
              onClick={() => setSelectionType("fy")}
              className={cn(
                "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all",
                selectionType === "fy" ? cn("bg-white dark:dark:bg-green-900 shadow-sm shadow-sm", t.radius.full, t.text.heading) : cn("opacity-50", t.text.muted)
              )}
            >
              By Finance Year
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Account Selection */}
          <div className="space-y-3">
            <label className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-60 flex items-center gap-2", t.text.muted)}>
              <Wallet className="w-3 h-3" /> Select Account
            </label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger
                className={cn(
                  "w-full h-auto bg-black/5! dark:bg-white/5! border-black/5 dark:border-white/5 px-4 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-lime-500/50 transition-all cursor-pointer group",
                  t.radius.md,
                  t.text.heading
                )}
              >
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Select Account" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 text-white">
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id} className="focus:bg-lime-500 focus:text-black font-bold py-3 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-lime-500" />
                      {acc.nickname} • <span className="opacity-50 text-xs">**** {acc.accountNumber?.slice(-4)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration Selection */}
          <div className={cn("space-y-3 transition-opacity duration-300", selectionType !== "duration" && "opacity-30")}>
            <label 
              className={cn("text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all", t.text.muted)}
            >
              <Calendar className="w-3 h-3" /> Duration Period
            </label>
            <Select 
              disabled={selectionType !== "duration"} 
              value={duration} 
              onValueChange={setDuration}
            >
              <SelectTrigger
                className={cn(
                  "w-full h-auto appearance-none bg-black/5 dark:bg-white/5 border px-4 py-4 text-sm font-bold outline-none transition-all cursor-pointer disabled:cursor-not-allowed",
                  selectionType === "duration" ? "border-lime-500/30 ring-2 ring-lime-500/10 shadow-lg shadow-lime-500/5" : "border-black/5 dark:border-white/5",
                  t.radius.md,
                  t.text.heading
                )}
              >
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 text-white">
                {durations.map((d) => (
                  <SelectItem key={d.id} value={d.id} className="focus:bg-lime-500 focus:text-black font-bold py-3 transition-colors">
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Financial Year Selection */}
          <div className={cn("space-y-3 transition-opacity duration-300", selectionType !== "fy" && "opacity-30")}>
            <label 
              className={cn("text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all", t.text.muted)}
            >
              <LayoutGrid className="w-3 h-3" /> Record Year
            </label>
            <Select 
              disabled={selectionType !== "fy"} 
              value={financialYear} 
              onValueChange={setFinancialYear}
            >
              <SelectTrigger
                className={cn(
                  "w-full h-auto appearance-none bg-black/5 dark:bg-white/5 border px-4 py-4 text-sm font-bold outline-none transition-all cursor-pointer disabled:cursor-not-allowed",
                  selectionType === "fy" ? "border-lime-500/30 ring-2 ring-lime-500/10 shadow-lg shadow-lime-500/5" : "border-black/5 dark:border-white/5",
                  t.radius.md,
                  t.text.heading
                )}
              >
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 text-white">
                {financialYears.map((fy) => (
                  <SelectItem key={fy} value={fy} className="focus:bg-lime-500 focus:text-black font-bold py-3 transition-colors">
                    {fy} Financial Year
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Custom Date Range (Conditional) */}
        {selectionType === "duration" && duration === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-3">
              <label className={cn("text-[9px] font-black uppercase tracking-widest opacity-50", t.text.muted)}>Start Date</label>
              <input 
                type="date" 
                value={customRange.startDate}
                onChange={(e) => setCustomRange({...customRange, startDate: e.target.value})}
                className={cn("w-full bg-black/10 dark:bg-white/10 px-4 py-3 text-xs font-bold outline-none border border-black/5 dark:border-white/5 focus:border-lime-500/50 transition-all", t.radius.md, t.text.heading)} 
              />
            </div>
            <div className="space-y-3">
              <label className={cn("text-[9px] font-black uppercase tracking-widest opacity-50", t.text.muted)}>End Date</label>
              <input 
                type="date" 
                value={customRange.endDate}
                onChange={(e) => setCustomRange({...customRange, endDate: e.target.value})}
                className={cn("w-full bg-black/10 dark:bg-white/10 px-4 py-3 text-xs font-bold outline-none border border-black/5 dark:border-white/5 focus:border-lime-500/50 transition-all", t.radius.md, t.text.heading)} 
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleGenerate}
            className={cn(
              "w-full md:w-auto px-10 py-5 flex items-center justify-center md:justify-start gap-3 transition-all active:scale-95 group relative overflow-hidden shadow-xl shadow-lime-500/20",
              t.button.primary,
              t.radius.lg
            )}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <FileText className="w-5 h-5 relative z-10" />
            <span className="text-xs font-black uppercase tracking-widest relative z-10">Generate Statement Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

