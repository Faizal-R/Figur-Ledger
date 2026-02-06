"use client";

import { useEffect, useState } from "react";
import { FinledgerTheme } from "@/theme";
import { useUserAccounts } from "@/hooks/api/useProfileAndAccount";
import { useAuthUserStore } from "@/store";
import { IAccount } from "@/types/user-account";
import clsx from "clsx";

export default function AccountSelector({
  onSelect,
  className,
  itemClassName,
  minWidth = 230,
}: {
  onSelect: (id: string) => void;
  className?: string;
  itemClassName?: string;
  minWidth?: number;
}) {
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

  return (
    <div
      className={clsx(
        "flex gap-4 overflow-x-auto pb-1",
        className
      )}
    >
      {accounts.map((acc) => {
        const isActive = active === acc.id;

        return (
          <button
            key={acc.id}
            onClick={() => {
              setActive(acc.id);
              onSelect(acc.id);
            }}
            style={{ minWidth }}
            className={clsx(
              `${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.md}
               px-5 py-4 text-left transition`,
              isActive
                ? "ring-2 ring-emerald-400 bg-emerald-500/10"
                : "hover:bg-slate-800",
              itemClassName
            )}
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
