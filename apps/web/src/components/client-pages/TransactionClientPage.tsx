"use client";

import { useState } from "react";
import AccountSelector from "@/components/features/customer/account/AccountSelector";
import TransactionTable from "@/components/features/customer/transactions/TransactionCard";
import TransactionHeader from "@/components/features/customer/transactions/TransactionHeader";

export default function TransactionsClientPage() {
  const [activeAccountId, setActiveAccountId] = useState<string>("");

  return (
    <div className="space-y-8">
      <TransactionHeader />

      <AccountSelector onSelect={setActiveAccountId} />

      {activeAccountId && (
        <TransactionTable accountId={activeAccountId} />
      )}
    </div>
  );
}
