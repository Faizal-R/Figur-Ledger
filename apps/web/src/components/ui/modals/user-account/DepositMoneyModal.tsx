"use client";

import { useState } from "react";
import { X, Wallet, ArrowDownCircle } from "lucide-react";
import { formatCurrency } from "@/utils/formats";
import { IAccount } from "@/types/user-account";

import { initiateRazorpayPayment } from "@/utils/razorpay";
export interface IDepositMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Partial<IAccount> | null;
  onDeposit: (accountId: string, amount: number) => void;
}

export function DepositMoneyModal({
  isOpen,
  onClose,
  account,
  onDeposit,
}:IDepositMoneyModalProps) {
  const [amount, setAmount] = useState("");

  if (!isOpen || !account) return null;

  const isDisabled = !amount || Number(amount) <= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
        bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto 
          bg-[#1a2536] rounded-2xl shadow-2xl shadow-black/50 
          border border-slate-800/70 animate-scaleIn">

        {/* HEADER */}
        <div className="sticky top-0 flex items-center justify-between p-6 
            bg-[#1a2536] border-b border-slate-800/60">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <ArrowDownCircle className="w-6 h-6 text-emerald-400" />
              Deposit Money
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Add funds to your <span className="capitalize">{account.type}</span> account
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-8">

          {/* ACCOUNT SUMMARY */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-emerald-400/10 
            border border-emerald-500/20 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-emerald-400" />
              {account.nickname}
            </h3>
            <p className="text-sm text-slate-400 capitalize">{account.type} Account</p>

            <div className="mt-4">
              <p className="text-xs text-slate-400 mb-1">Current Balance</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(account.balance!, account.currency!)}
              </p>
            </div>
          </div>

          {/* INPUT FIELD */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Deposit Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 bg-[#0f1721] border border-slate-700 rounded-xl 
                text-white placeholder-slate-500 focus:border-emerald-400 
                focus:ring-2 focus:ring-emerald-400/20 transition-all"
            />
            {amount && Number(amount) <= 0 && (
              <p className="text-xs text-red-400">Enter a valid amount</p>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-800/60 bg-[#19212e] rounded-b-2xl">
          <button
            disabled={isDisabled}
            onClick={() => {
              onDeposit(account.id!, Number(amount))
              setAmount("");
            }}
            className={`w-full py-3 rounded-xl font-semibold transition-all 
              ${isDisabled
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30"
              }`}
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
