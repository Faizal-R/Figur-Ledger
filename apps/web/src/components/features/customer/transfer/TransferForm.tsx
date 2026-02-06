"use client";

import { useState } from "react";
import { FinledgerTheme } from "@/theme";
import AccountSelector from "@/components/features/customer/account/AccountSelector";
import { useTransferAmount } from "@/hooks/api/useTransaction";
import { useVerifyUserAccount } from "@/hooks/api/useProfileAndAccount";
import { toast } from "sonner";

interface VerifiedAccount {
  accountId: string;
}

export default function TransferForm() {
  const [fromAccountId, setFromAccountId] = useState("");
  const [receiverAccountInput, setReceiverAccountInput] = useState("");
  const [verifiedAccount, setVerifiedAccount] =
    useState<VerifiedAccount | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const transferMutation = useTransferAmount();
  const verifyAccountMutation = useVerifyUserAccount();

  /* ✅ VERIFY RECEIVER ACCOUNT (POST ONLY, RETURNS accountId ONLY) */
  const verifyReceiver = () => {
    if (!receiverAccountInput) {
      setError("Enter receiver account number");
      return;
    }

    setError(null);
    setVerifiedAccount(null);

    verifyAccountMutation.mutate(receiverAccountInput, {
      onSuccess: (data) => {
        console.log("dataReceived:Verified", data);
        setVerifiedAccount({
          accountId: data.accountId.accountId, // ✅ only what you need
        });
      },
      onError: (err: any) => {
        setError(err.message || "Invalid account");
      },
    });
  };

 
  const handleTransfer = () => {
    if (!fromAccountId) {
      setError("Select sender account");
      return;
    }

    if (!verifiedAccount) {
      setError("Verify receiver first");
      return;
    }

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Enter valid transfer amount");
      return;
    }

    setError(null);

    transferMutation.mutate(
      {
        senderAccountId: fromAccountId,
        receiverAccountId: verifiedAccount.accountId,
        amount: numericAmount,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setAmount("");
          setReceiverAccountInput("");
          setVerifiedAccount(null);
        },
      }
    );
  };

  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-8 space-y-6`}
    >
 
      <div>
        <p
          className={`mb-2 text-sm font-semibold ${FinledgerTheme.text.primary}`}
        >
          From Account
        </p>
        <AccountSelector onSelect={setFromAccountId} />
      </div>

      {/* ✅ RECEIVER + VERIFY */}
      <div>
        <p
          className={`mb-2 text-sm font-semibold ${FinledgerTheme.text.primary}`}
        >
          Receiver Account Number
        </p>

        <div className="flex gap-2">
          <input
            value={receiverAccountInput}
            onChange={(e) => {
              setReceiverAccountInput(e.target.value);
              setVerifiedAccount(null);
              setAmount(""); // ✅ reset amount on change
              setError(null);
            }}
            placeholder="Enter receiver account number"
            className={`flex-1 px-4 py-3 rounded-xl ${FinledgerTheme.input.base} ${FinledgerTheme.input.focus}`}
          />

          <button
            onClick={verifyReceiver}
            disabled={verifyAccountMutation.isPending}
            className={`px-4 rounded-xl ${FinledgerTheme.button.secondary}`}
          >
            {verifyAccountMutation.isPending ? "Verifying..." : "Verify"}
          </button>
        </div>

        {/* ✅ VERIFIED BADGE ONLY (NO USERNAME LEAK) */}
        {verifiedAccount && (
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs border border-emerald-500/30">
            ✅ Account Verified
          </div>
        )}

        {/* ✅ ERROR */}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {/* ✅ AMOUNT (LOCKED UNTIL VERIFIED) */}
      <div>
        <p
          className={`mb-2 text-sm font-semibold ${FinledgerTheme.text.primary}`}
        >
          Amount
        </p>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder={
            verifiedAccount ? "Enter amount" : "Verify receiver to enter amount"
          }
          disabled={!verifiedAccount}
          className={`w-full px-4 py-3 rounded-xl ${
            FinledgerTheme.input.base
          } ${FinledgerTheme.input.focus} ${
            !verifiedAccount ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </div>

      {/* ✅ ACTION */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={handleTransfer}
          disabled={transferMutation.isPending || !verifiedAccount}
          className={`px-6 py-3 ${FinledgerTheme.button.primary} ${FinledgerTheme.radius.lg}`}
        >
          {transferMutation.isPending ? "Processing..." : "Transfer Now"}
        </button>
      </div>
    </div>
  );
}
