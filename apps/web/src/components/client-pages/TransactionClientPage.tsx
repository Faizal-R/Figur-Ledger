"use client";

import { useState } from "react";
import AccountSelector from "@/components/feature/customer/account/AccountSelector";
import TransactionTable from "@/components/feature/customer/transactions/TransactionCard";
import TransactionHeader from "@/components/feature/customer/transactions/TransactionHeader";

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
