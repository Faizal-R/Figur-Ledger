"use client";

import { FinledgerTheme } from "@/theme";

export default function TransferHeader() {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6`}
    >
      <h2 className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>
        Transfer Funds
      </h2>
      <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
        Send money securely between users
      </p>
    </div>
  );
}
