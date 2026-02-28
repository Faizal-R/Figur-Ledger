"use client";
import React, { useEffect, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { ShieldCheck, FileText } from "lucide-react";
import StatementHeader from "@/components/features/customer/statements/StatementHeader";
import StatementSummary from "@/components/features/customer/statements/StatementSummary";
import StatementTransactions from "@/components/features/customer/statements/StatementTransactions";
import StatementGenerator from "@/components/features/customer/statements/StatementGenerator";
import { useGenerateAccountStatement } from "@/hooks/api/useReport";
import { useUserAccounts } from "@/hooks/api/useProfileAndAccount";
import { useAuthUserStore } from "@/store";

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

interface StatementParams {
  accountId: string;
  type: "duration" | "fy" | "custom";
  value: string;
  customRange: { startDate: string; endDate: string };
}

export default function BankStatementsPage() {
  const { theme: t } = useTheme();
  const { user } = useAuthUserStore();

  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedAccountStatement, setGeneratedAccountStatement] =
    useState<any>(null);

  const [selectedParams, setSelectedParams] = useState<StatementParams>({
    accountId: "",
    type: "duration",
    value: "",
    customRange: { startDate: "", endDate: "" },
  });

  const { data: userAccounts } = useUserAccounts(user?.id!);

  /* ✅ set default account once accounts load */
  useEffect(() => {
    if (userAccounts?.data?.length && !selectedParams.accountId) {
      setSelectedParams((prev) => ({
        ...prev,
        accountId: userAccounts.data?.[0]?.id!,
      }));
    }
  }, [userAccounts, selectedParams.accountId]);

  // const {
  //   data: generatedAccountStatement,
  //   refetch: refetchGeneratedAccountStatement,
  // } = useGetGeneratedAccountStatement(selectedParams);

  const { generate, isLoading } = useGenerateAccountStatement();

  const handleGenerate = async (params: StatementParams) => {
    setSelectedParams(params);
    generate(params, {
      onSuccess: (data) => {
        setGeneratedAccountStatement(data.data);
        setIsGenerated(true);
      },
      onError: () => {
        setIsGenerated(false);
      },
    });
  };

  // const statement = generatedAccountStatement?.data;
  // console.log(statement)

  return (
    <div className={cn("min-h-screen pb-20 px-4 md:px-8 space-y-8")}>
      {/* Title */}
      <div className="pt-8 flex justify-between items-center">
        <div>
          <h2
            className={cn(
              "text-3xl font-black tracking-tighter uppercase",
              t.text.display,
            )}
          >
            Account Statement
          </h2>
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-[0.3em] opacity-60",
              t.text.muted,
            )}
          >
            Official Banking Records
          </p>
        </div>

        <div
          className={cn(
            t.card.base,
            t.radius.full,
            "px-4 py-2 hidden md:flex items-center gap-3 border-emerald-500/20",
          )}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              t.text.heading,
            )}
          >
            Verified Session
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Selection Area */}
        <StatementGenerator
          accounts={userAccounts?.data || []}
          onGenerate={handleGenerate}
        />

        {!isGenerated || !selectedParams ? (
          <div
            className={cn(
              t.card.base,
              t.radius.lg,
              "p-10 md:p-20 text-center space-y-4 border-dashed border-2 opacity-50",
            )}
          >
            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 opacity-20" />
            </div>
            <h3
              className={cn(
                "text-xl font-black uppercase tracking-tighter",
                t.text.heading,
              )}
            >
              Ready to generate
            </h3>
            <p
              className={cn(
                "max-w-md mx-auto text-sm font-medium",
                t.text.muted,
              )}
            >
              Select your preferred account and time duration above to view your
              detailed transaction history and balance summary.
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                Waiting for selection
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-full w-fit">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                Reporting Period:{" "}
                {selectedParams.type === "duration"
                  ? selectedParams.value.replace(/_/g, " ")
                  : `FY ${selectedParams.value}`}
              </span>
            </div>

            {/* Header */}
            <StatementHeader
              accountInfo={{
                name: generatedAccountStatement.user.name,
                address: generatedAccountStatement.user.address,
                accountNumber: generatedAccountStatement.account
                  .accountNumber as string,
                ifsc: generatedAccountStatement.account.ifsc as string,
                type: generatedAccountStatement.account.type as string,
              }}
            />

            {/* Summary */}
            <StatementSummary
              summary={{
                period: generatedAccountStatement.summary.statementPeriod,
                totalCredits: generatedAccountStatement.summary.totalCredits,
                totalDebits: generatedAccountStatement.summary.totalDebits,
                beginningBalance:
                  generatedAccountStatement.summary.beginningBalance,
                closingBalance:
                  generatedAccountStatement.summary.closingBalance,
                currency: generatedAccountStatement.account.currency,
              }}
            />

            {/* Transactions */}
            {isGenerated && (
              <StatementTransactions
                transactions={generatedAccountStatement.transactions.map(
                  (t) => ({
                    id: t.id,
                    date: t.date,
                    description: t.description,
                    reference:
                      "FIGR-" +
                      Math.random().toString(36).substr(2, 9).toUpperCase(),
                    type: t.entryType.toLowerCase() as "debit" | "credit",
                    amount: t.amount,
                    balance: t.balance,
                  }),
                )}
                currency={generatedAccountStatement.account.currency}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
