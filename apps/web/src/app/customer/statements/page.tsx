"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import StatementHeader from "@/components/features/customer/statements/StatementHeader";
import StatementSummary from "@/components/features/customer/statements/StatementSummary";
import StatementTransactions from "@/components/features/customer/statements/StatementTransactions";

/* =========================
   Dummy domain data (schema-true)
   ========================= */

const USER = {
  id: "u1",
  email: "faizal@example.com",
  phone: "+91 9999999999",
  avatarKey: null,
  personalInfo: {
    firstName: "Faizal",
    lastName: "R",
    dateOfBirth: new Date("1998-06-12"),
  },
  address: {
    street: "123 Elite Street",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    country: "India",
  },
  authUserId: "auth0|123",
};

const ACCOUNT = {
  id: "a1",
  userId: "u1",
  accountNumber: "910238475612",
  type: "SAVINGS",
  balance: 1250000,
  currency: "INR",
  status: "ACTIVE",
  nickname: "Primary",
  ifsc: "FIGR0001234",
};

/* =========================
   Statement Data
   ========================= */

const STATEMENT = {
  period: "Feb 01, 2026 — Feb 28, 2026",
  openingBalance: 1000000,
  totalCredits: 500000,
  totalDebits: 250000,
  closingBalance: 1250000,
};

const TRANSACTIONS = [
  {
    id: "1",
    date: "Feb 25, 2026",
    description: "Salary Credit — FIGUR TECH",
    debit: 0,
    credit: 500000,
    balance: 1250000,
  },
  {
    id: "2",
    date: "Feb 22, 2026",
    description: "Transfer to Savings",
    debit: 150000,
    credit: 0,
    balance: 750000,
  },
  {
    id: "3",
    date: "Feb 15, 2026",
    description: "Amazon India",
    debit: 25000,
    credit: 0,
    balance: 900000,
  },
  {
    id: "4",
    date: "Feb 10, 2026",
    description: "Starbucks",
    debit: 75000,
    credit: 0,
    balance: 925000,
  },
  {
    id: "5",
    date: "Feb 05, 2026",
    description: "Rent Payment",
    debit: 100000,
    credit: 0,
    balance: 1000000,
  },
];

/* =========================
   Page
   ========================= */

export default function BankStatementsPage() {
  const { theme: t } = useTheme();

  const fullName =
    USER.personalInfo.firstName + " " + USER.personalInfo.lastName;

  const address = `${USER.address.street}, ${USER.address.city}, ${USER.address.state} ${USER.address.zipCode}`;

  return (
    <div className={cn("min-h-screen pb-20 px-4 md:px-8 space-y-8")}>
      {/* Title */}
      <div className="pt-8 flex justify-between items-center">
        <div>
          <h2
            className={cn(
              "text-3xl font-black tracking-tighter uppercase",
              t.text.display
            )}
          >
            Account Statement
          </h2>
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-[0.3em] opacity-60",
              t.text.muted
            )}
          >
            Official Monthly Record
          </p>
        </div>

        <div
          className={cn(
            t.card.base,
            t.radius.full,
            "px-4 py-2 flex items-center gap-3 border-emerald-500/20"
          )}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              t.text.heading
            )}
          >
            Verified
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <StatementHeader
          accountInfo={{
            name: fullName,
            address,
            accountNumber: ACCOUNT.accountNumber,
            ifsc: ACCOUNT.ifsc,
            type: ACCOUNT.type,
          }}
        />

        {/* Summary */}
        <StatementSummary
          summary={{
            period: STATEMENT.period,
            beginningBalance: STATEMENT.openingBalance,
            totalCredits: STATEMENT.totalCredits,
            totalDebits: STATEMENT.totalDebits,
            closingBalance: STATEMENT.closingBalance,
            currency: ACCOUNT.currency,
          }}
        />

        {/* Transactions (READ ONLY) */}
        <StatementTransactions
          transactions={TRANSACTIONS.map((t) => ({
            id: t.id,
            date: t.date,
            description: t.description,
            reference: "",
            type: t.credit > 0 ? "credit" : "debit",
            amount: t.credit || t.debit,
            balance: t.balance,
          }))}
          currency={ACCOUNT.currency}
        />
      </div>
    </div>
  );
}