"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { User, MapPin, Landmark, BadgeCheck } from "lucide-react";

interface StatementHeaderProps {
  accountInfo: {
    name: string;
    address: string;
    accountNumber: string;
    ifsc: string;
    type: string;
  };
}

export default function StatementHeader({ accountInfo }: StatementHeaderProps) {
  const { theme: t } = useTheme();

  return (
    <div className={cn(t.card.base, t.radius.lg, "p-8 overflow-hidden relative")}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="flex items-center gap-5">
          <div className={cn("p-4 flex items-center justify-center", t.radius.md, t.card.lime, "shadow-xl shadow-lime-500/20")}>
            <User className="w-8 h-8 text-[#0a1a15]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={cn("text-2xl md:text-3xl font-black uppercase tracking-tight", t.text.heading)}>
                {accountInfo.name}
              </h1>
              <BadgeCheck className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
            </div>
            <p className={cn("text-xs font-black uppercase tracking-[0.2em] opacity-60 mt-1 flex items-center gap-2", t.text.muted)}>
              <Landmark className="w-3 h-3" /> {accountInfo.type} Account
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full md:w-auto">
          <div className="space-y-1">
            <p className={cn("text-[10px] font-black uppercase tracking-[0.25em] opacity-50", t.text.muted)}>Account Number</p>
            <p className={cn("text-xl font-bold font-mono tracking-wider", t.text.heading)}>{accountInfo.accountNumber}</p>
            <p className={cn("text-[10px] font-black opacity-60 uppercase tracking-widest px-2 py-0.5 inline-block border border-current rounded-full", t.text.muted)}>
              IFSC: {accountInfo.ifsc}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className={cn("text-[10px] font-black uppercase tracking-[0.25em] opacity-50 flex items-center gap-1", t.text.muted)}>
              <MapPin className="w-3 h-3" /> Correspondence Address
            </p>
            <p className={cn("text-sm font-medium leading-tight max-w-[200px]", t.text.body)}>
              {accountInfo.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
