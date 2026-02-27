"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useUserAccounts } from "@/hooks/api/useProfileAndAccount";
import { useAuthUserStore } from "@/store";
import { IAccount } from "@/types/user-account";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Wallet, CreditCard, Landmark, CheckCircle2 } from "lucide-react";

export default function AccountSelector({
  onSelect,
  className,
  itemClassName,
}: {
  onSelect: (id: string) => void;
  className?: string;
  itemClassName?: string;
}) {
  const { theme: t, mode } = useTheme();
  const [active, setActive] = useState("");
  const { user } = useAuthUserStore();

  const { data } = useUserAccounts(user?.id || "");
  const accounts: IAccount[] = data?.data || [];

  useEffect(() => {
    if (accounts.length && !active) {
      const firstId = accounts[0]?.id ?? "";
      setActive(firstId);
      onSelect(firstId);
    }
  }, [accounts, active, onSelect]);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "checking":
        return Wallet;
      case "business":
        return Landmark;
      default:
        return CreditCard;
    }
  };

  const isDark = mode === "dark";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3
          className={`text-[11px] font-black uppercase tracking-[0.3em] ${t.text.muted} opacity-60`}
        >
          Select Liquidity Source
        </h3>
        <div className="h-px flex-1 bg-black/5 dark:bg-white/5 mx-6" />
      </div>

      <div
        className={cn(
          "flex gap-6 overflow-x-auto pb-6 custom-scrollbar no-scrollbar",
          className
        )}
      >
        {accounts.map((acc) => {
          const isActive = active === acc.id;
          const Icon = getIcon(acc.type);

          return (
            <motion.button
              key={acc.id}
              whileHover={{
                y: -5,
               
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActive(acc.id);
                onSelect(acc.id);
              }}
              className={cn(
                "relative min-w-[280px] p-6 rounded-[2rem] border transition-all duration-500 text-left overflow-hidden group",

                isActive
                  ? isDark
                    ? "bg-[linear-gradient(145deg,#0b1410,#0e1f18)] border border-[#1f3d2b] "
                    : "bg-[#76d100] border-transparent shadow-[0_20px_40px_rgba(193,255,114,0.15)]"
                  : "bg-black/5 dark:bg-white/[0.03] border-black/5 dark:border-white/10 hover:border-[#c1ff72]/30",

                itemClassName
              )}
            >
              {/* Active check */}
              {isActive && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2
                    size={20}
                    className={
                      isDark ? "text-[#76d100]" : "text-[#c1ff72]"
                    }
                  />
                </div>
              )}

              <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-lg",
                      isActive
                        ? isDark
                          ? "bg-[#11261b] text-[#76d100] shadow-[0_0_20px_rgba(118,209,0,0.25)]"
                          : "bg-white/10 text-white"
                        : "bg-black/5 dark:bg-white/5 text-slate-400 group-hover:text-[#c1ff72]"
                    )}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <p
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest leading-none mb-1 transition-colors",
                        isActive
                          ? isDark
                            ? "text-[#9fe870]/70"
                            : "text-white/50"
                          : "text-slate-500"
                      )}
                    >
                      {acc.type} NODE
                    </p>

                    <p
                      className={cn(
                        "text-sm font-black tracking-tight transition-colors",
                        isActive
                          ? isDark
                            ? "text-[#e8fff3]"
                            : "text-white"
                          : t.text.heading
                      )}
                    >
                      {acc.nickname || "REGISTRY_ALPHA"}
                    </p>
                  </div>
                </div>

                {/* Balance */}
                <div>
                  <p
                    className={cn(
                      "text-[9px] font-black uppercase tracking-[0.2em] mb-1 transition-colors",
                      isActive
                        ? isDark
                          ? "text-[#9fe870]/60"
                          : "text-white/40"
                        : "text-slate-500"
                    )}
                  >
                    Available Liquidity
                  </p>

                  <div className="flex items-baseline gap-2">
                    <p
                      className={cn(
                        "text-2xl font-black tracking-tighter transition-colors",
                        isActive
                          ? isDark
                            ? "text-[#e8fff3]"
                            : "text-white"
                          : t.text.heading
                      )}
                    >
                      ₹{acc.balance.toLocaleString()}
                    </p>

                    <span
                      className={cn(
                        "text-[10px] font-black tracking-widest transition-colors",
                        isActive
                          ? isDark
                            ? "text-[#9fe870]/80"
                            : "text-white/60"
                          : "text-slate-500"
                      )}
                    >
                      {acc.currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Green glow */}
              {isActive && (
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#76d100]/30 blur-3xl rounded-full pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}