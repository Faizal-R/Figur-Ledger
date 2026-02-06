"use client";

import {  useState } from "react";
import { FinledgerTheme } from "@/theme";
import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from "lucide-react";
import TransactionViewModal from "./TransactionModal";
import { useTransactionHistory } from "@/hooks/api/useTransaction";


type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";

interface Transaction {
  id: string;
  referenceId: string;
  senderAccountId: string | null;
  receiverAccountId: string | null;
  amount: number;
  currency: string;
  status: TransactionStatus;
  type: TransactionType;
  createdAt: string;
}


const TABS: { label: string; value: "ALL" | TransactionType }[] = [
  { label: "All", value: "ALL" },
  { label: "Deposits", value: "DEPOSIT" },
  { label: "Transfers", value: "TRANSFER" },
  { label: "Withdrawals", value: "WITHDRAW" },
];

export default function TransactionTable({accountId}: {accountId:string}) {
 console.log("AccountId in TransactionTable:",accountId);

  const {
    data,
    isLoading,
  } = useTransactionHistory(accountId || "");
  console.log("Transactions:", data?.data);

  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ALL" | TransactionType>("ALL");

  const filtered =
    activeTab === "ALL"
      ? data?.data
      : data?.data.filter((t) => t.type === activeTab);
    
// const filtered=DUMMY_TRANSACTIONS

  if (isLoading) return <Skeleton />;
  return (
    <div className="space-y-6">
      {/* ✅ Tabs */}
      <div className="flex gap-3">
        {TABS.map((tab) => {
          const active = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                active
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ✅ Cards */}
      <div className="space-y-4">
        {(filtered||[]).length === 0 ? (
          <EmptyState />
        ) : (
          (filtered||[]).map((txn) => (
            <div
              key={txn.id}
              className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-5 flex items-center justify-between hover:scale-[1.01] transition-all`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <Icon type={txn.type} />
                <div>
                  <p className={`font-semibold ${FinledgerTheme.text.primary}`}>
                    {txn.referenceId}
                  </p>
                  <p className={`text-xs ${FinledgerTheme.text.muted}`}>
                    {new Date(txn.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* CENTER */}
              <div className="text-center">
                <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
                  {txn.type}
                </p>
                <StatusBadge status={txn.status} />
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-6">
                <p
                  className={`text-lg font-bold ${FinledgerTheme.text.primary}`}
                >
                  ₹ {txn.amount}
                </p>
                <button
                  onClick={() => {
                    setSelectedTxn(txn);
                    setOpen(true);
                  }}
                  className={`px-4 py-2 text-sm ${FinledgerTheme.button.primary} ${FinledgerTheme.radius.md}`}
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <TransactionViewModal
        open={open}
        onClose={() => setOpen(false)}
        transaction={selectedTxn}
      />
    </div>
  );
}

/* ✅ Icon */
function Icon({ type }: { type: TransactionType }) {
  const map = {
    DEPOSIT: <ArrowDownLeft className="text-emerald-400" size={26} />,
    WITHDRAW: <ArrowUpRight className="text-red-400" size={26} />,
    TRANSFER: <RefreshCcw className="text-yellow-400" size={26} />,
  };

  return (
    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
      {map[type]}
    </div>
  );
}

/* ✅ Status */
function StatusBadge({ status }: { status: TransactionStatus }) {
  const map = {
    SUCCESS: "bg-emerald-500/15 text-emerald-400",
    PENDING: "bg-yellow-500/15 text-yellow-400",
    FAILED: "bg-red-500/15 text-red-400",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}

/* ✅ Empty State */
function EmptyState() {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-10 text-center`}
    >
      <p className={FinledgerTheme.text.secondary}>No transactions found</p>
    </div>
  );
}

/* ✅ Skeleton */
function Skeleton() {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 animate-pulse space-y-4`}
    >
      <div className="h-4 bg-slate-700 rounded" />
      <div className="h-4 bg-slate-700 rounded" />
      <div className="h-4 bg-slate-700 rounded" />
    </div>
  );
}
