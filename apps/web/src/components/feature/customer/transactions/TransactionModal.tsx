"use client";

import { FinledgerTheme } from "@/theme";
import { X } from "lucide-react";

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
  failureReason?: string | null;
  createdAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionViewModal({
  open,
  onClose,
  transaction,
}: Props) {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-xl ${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 z-10`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${FinledgerTheme.text.primary}`}>
            Transaction Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg"
          >
            <X className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm">
          <Row label="Reference ID" value={transaction.referenceId} />
          <Row label="Type" value={transaction.type} />
          <Row
            label="Amount"
            value={`₹ ${transaction.amount} ${transaction.currency}`}
          />
          <Row label="Status" value={transaction.status} />
          <Row
            label="Sender Account"
            value={transaction.senderAccountId ?? "—"}
          />
          <Row
            label="Receiver Account"
            value={transaction.receiverAccountId ?? "—"}
          />
          <Row
            label="Date"
            value={new Date(transaction.createdAt).toLocaleString()}
          />

          {transaction.status === "FAILED" && transaction.failureReason && (
            <Row
              label="Failure Reason"
              value={transaction.failureReason}
              danger
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2 bg-slate-800 text-slate-300 ${FinledgerTheme.radius.md} hover:bg-slate-700`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex justify-between gap-6">
      <span className={`${FinledgerTheme.text.muted}`}>{label}</span>
      <span
        className={`font-medium ${
          danger ? "text-red-400" : FinledgerTheme.text.primary
        }`}
      >
        {value}
      </span>
    </div>
  );
}
