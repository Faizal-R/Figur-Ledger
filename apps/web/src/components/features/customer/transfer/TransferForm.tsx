"use client";

import { useState } from "react";
import AccountSelector from "@/components/features/customer/account/AccountSelector";
import { useTransferAmount } from "@/hooks/api/useTransaction";
import { useVerifyUserAccount } from "@/hooks/api/useProfileAndAccount";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Search,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface VerifiedAccount {
  accountId: string;
}

export default function TransferForm() {
  const { theme: t, mode } = useTheme();
  const [fromAccountId, setFromAccountId] = useState("");
  const [receiverAccountInput, setReceiverAccountInput] = useState("");
  const [verifiedAccount, setVerifiedAccount] =
    useState<VerifiedAccount | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const transferMutation = useTransferAmount();
  const verifyAccountMutation = useVerifyUserAccount();

  const verifyReceiver = () => {
    if (!receiverAccountInput) {
      setError("Please enter a recipient ID");
      return;
    }
    setError(null);
    setVerifiedAccount(null);

    verifyAccountMutation.mutate(receiverAccountInput, {
      onSuccess: (data: any) => {
        setVerifiedAccount({ accountId: data.accountId });
        toast.success("Recipient verified successfully");
      },
      onError: (err: any) => {
        setError("Invalid recipient ID");
        toast.error("Recipient not found");
      },
    });
  };

  const handleTransfer = () => {
    if (!fromAccountId) {
      setError("Please select an account to send from");
      return;
    }
    if (!verifiedAccount) {
      setError("Please verify the recipient first");
      return;
    }
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
     console.log(verifiedAccount)
    setError(null);
    transferMutation.mutate(
      {
        senderAccountId: fromAccountId,
        receiverAccountId: verifiedAccount.accountId,
        amount: numericAmount,
      },
     
      
    );
    
          setAmount("");
          setReceiverAccountInput("");
          setVerifiedAccount(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "max-w-xl mx-auto p-6 md:p-8 space-y-6 border shadow-lg",
        t.card.base,
        t.radius.lg,
      )}
    >
      {/* 1. Source Account */}
      <div className="space-y-3">
        <label
          className={cn(
            "text-[10px] font-bold uppercase tracking-widest opacity-60",
            t.text.muted,
          )}
        >
          Select Source
        </label>
        <AccountSelector
          onSelect={setFromAccountId}
          className="pb-0"
          itemClassName="min-w-[210px] p-3 rounded-xl"
        />
      </div>

      {/* 2. Recipient */}
      <div className="space-y-3">
        <label
          className={cn(
            "text-[10px] font-bold uppercase tracking-widest opacity-60",
            t.text.muted,
          )}
        >
          Recipient Account ID
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </div>
          <input
            value={receiverAccountInput}
            onChange={(e) => {
              setReceiverAccountInput(e.target.value);
              setVerifiedAccount(null);
              setError(null);
            }}
            placeholder="ACC-XXXX-XXXX"
            className={cn(
              "w-full h-12 pl-12 pr-28 rounded-xl bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/5 outline-none transition-all text-sm font-bold",
              t.text.heading,
              "focus:border-[#4caf50]",
            )}
          />

          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <button
              onClick={verifyReceiver}
              disabled={
                verifyAccountMutation.isPending || !receiverAccountInput
              }
              className={cn(
                "h-9 px-4 rounded-lg text-[10px] font-bold flex items-center gap-2 transition-all",
                mode === "dark"
                  ? "bg-[#c1ff72] text-[#0a1a15]"
                  : "bg-slate-900 text-white",
                "disabled:opacity-50",
              )}
            >
              {verifyAccountMutation.isPending ? "..." : "Verify"}
              {!verifyAccountMutation.isPending && <CheckCircle2 size={12} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {verifiedAccount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 text-[10px] font-bold"
            >
              <ShieldCheck size={12} />
              Identity Confirmed
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 text-[10px] font-bold"
            >
              <AlertCircle size={12} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Amount */}
      <div className="space-y-3">
        <label
          className={cn(
            "text-[10px] font-bold uppercase tracking-widest opacity-60",
            t.text.muted,
          )}
        >
          Amount to Send
        </label>
        <div className="relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold opacity-30">
            ₹
          </div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="0.00"
            disabled={!verifiedAccount}
            className={cn(
              "w-full h-16 pl-14 pr-6 rounded-xl bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/5 outline-none transition-all text-3xl font-bold",
              t.text.heading,
              !verifiedAccount && "opacity-30 cursor-not-allowed",
              "focus:border-[#4caf50]",
            )}
          />
        </div>
      </div>

      {/* 4. Action */}
      <div className="pt-2 space-y-4">
        <button
          onClick={handleTransfer}
          disabled={transferMutation.isPending || !verifiedAccount || !amount}
          className={cn(
            "w-full h-14 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md",
            mode === "dark"
              ? "bg-[#c1ff72] text-[#0a1a15]"
              : "bg-slate-900 text-white",
            "disabled:opacity-50 hover:scale-[1.01] active:scale-[0.98]",
          )}
        >
          {transferMutation.isPending ? "Processing..." : "Transfer Now"}
          {!transferMutation.isPending && <ArrowRight size={18} />}
        </button>

        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5">
          <p className={cn("text-[10px] font-bold opacity-50", t.text.muted)}>
            Network Fee
          </p>
          <p className="text-[10px] font-bold text-green-600">ZERO FEE</p>
        </div>
      </div>
    </motion.div>
  );
}
