"use client";

import { useEffect, useState } from "react";
import { FinledgerTheme } from "@/theme";
import { useUserAccounts } from "@/hooks/api/useProfileAndAccount";
import { useAuthUserStore } from "@/store";
import { IAccount } from "@/types/user-account";

export default function AccountSelector({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [active, setActive] = useState("");
  const { user } = useAuthUserStore();

  const { data } = useUserAccounts(user?.id || "");
  const accounts: IAccount[] = data?.data || [];

  useEffect(() => {
    if (accounts.length && !active) {
      const firstId = accounts[0]?.id||'';
      setActive(firstId);
      onSelect(firstId);
    }
  }, [accounts, active, onSelect]);

  return (
    <div className="flex gap-4 overflow-x-auto pb-1">
      {accounts.map((acc) => {
        const isActive = active === acc.id;

        return (
          <button
            key={acc.id}
            onClick={() => {
              setActive(acc.id);
              onSelect(acc.id);
            }}
            className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.md}
              px-5 py-4 min-w-[230px] text-left transition
              ${
                isActive
                  ? "ring-2 ring-emerald-400 bg-emerald-500/10"
                  : "hover:bg-slate-800"
              }`}
          >
            <p className={`text-sm font-bold ${FinledgerTheme.text.primary}`}>
              {acc.nickname?.toUpperCase()}
            </p>
            <p className={`text-xs ${FinledgerTheme.text.muted}`}>
              {acc.type}
            </p>
            <p className={`mt-1 text-sm font-bold ${FinledgerTheme.text.primary}`}>
              ₹ {acc.balance.toLocaleString()} {acc.currency}
            </p>
          </button>
        );
      })}
    </div>
  );
}
