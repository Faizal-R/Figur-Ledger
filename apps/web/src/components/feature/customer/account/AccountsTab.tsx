"use client";
import {
  Wallet,
  TrendingUp,
  Building2,
  Briefcase,
  Circle,
  PlusCircle,
  Eye,
} from "lucide-react";
import { FinledgerTheme } from "@/theme";
import {
  IAccount as Account,
  AccountType,
  AccountStatus,
  KYCData,
  IUser,
} from "@/types/user-account";
import { useState } from "react";

import { CreateAccountModal } from "@/components/ui/modals/user-account/CreateAccountModal";
import { SuccessModal } from "@/components/ui/modals/user-account/AccountCreatedSuccessModal";
import {
  formatAddress,
  formatCurrency,
  formatDate,
  formatFullName,
} from "@/utils/formats";
import { ViewAccountModal } from "@/components/ui/modals/user-account/ViewAccountModal";
import { DepositMoneyModal } from "@/components/ui/modals/user-account/DepositMoneyModal";
import { initiateRazorpayPayment } from "@/utils/razorpay";
import { toast } from "sonner";
import {
  useProcessDeposit,
  useVerifyPayment,
} from "@/hooks/api/useTransaction";

interface AccountsTabProps {
  accounts: Account[];
  handleAccounts: (account: Account) => void; // <-- updated
  userKycData: IUser;
  createAccount: (
    data: {
      nickname: string;
      type: string;
      currency: string;
    },
    onSuccessCallback: (account: Account) => void
  ) => void;
}

const getAccountIcon = (type: AccountType) => {
  switch (type) {
    case "checking":
      return Wallet;
    case "savings":
      return TrendingUp;
    case "business":
      return Briefcase;
    default:
      return Building2;
  }
};

const getStatusColor = (status: AccountStatus) => {
  switch (status) {
    case "active":
      return "text-emerald-400";
    case "frozen":
      return "text-yellow-400";
    case "closed":
      return "text-red-400";
    default:
      return "text-slate-400";
  }
};

export function AccountsTab({
  userKycData,
  accounts,
  createAccount,
  handleAccounts,
}: AccountsTabProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [viewingAccount, setViewingAccount] = useState<Account | null>(null);

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositingAccount, setDepositingAccount] = useState<Account | null>(
    null
  );

  const [successData, setSuccessData] = useState<{
    accountNumber: string;
    ifsc: string;
    accountType: string;
  } | null>(null);

  const kycData: KYCData = {
    fullName: formatFullName(userKycData.personalInfo),
    dateOfBirth: formatDate(new Date(userKycData.personalInfo.dateOfBirth)),
    email: userKycData.email,
    phoneNumber: userKycData.phone,
    address: formatAddress(userKycData.address),
    isComplete: true,
  };

  const processDeposit = useProcessDeposit();
  const verifyDepositPayment = useVerifyPayment();

  const handleCreateSuccess = (data: {
    nickname: string;
    type: string;
    currency: string;
  }) => {
    createAccount(data, (account) => {
      handleAccounts(account);
      setSuccessData({
        accountNumber: account.accountNumber as string,
        ifsc: account.ifsc as string,
        accountType: account.type,
      });
      setIsCreateModalOpen(false);
      setIsSuccessModalOpen(true);
    });
  };

  const onHandleDeposit = async (accountId: string, amount: number) => {
    try {
      const response = await processDeposit.mutateAsync({
        accountId,
        amount,
      });

      if (!response.success) {
        toast(response.message);
        return;
      }

      const { orderId, amount: orderAmount, txId } = response.data;

      await initiateRazorpayPayment({
        amount: orderAmount,
        orderId,
        name: "FigurLedger",
        description: "Account Deposit",
        image: "https://your-image-url",
        prefill: {
          name: userKycData?.personalInfo?.firstName ?? "",
          email: userKycData?.email ?? "",
          contact: userKycData?.phone ?? "",
        },

        onSuccess: async (paymentResponse) => {
          const res = await verifyDepositPayment.mutateAsync({
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id,
            signature: paymentResponse.razorpay_signature,
            txId,
          });

          if (!res.success) {
            toast(res.message);
            return;
          }

          const updatedAccount = accounts.find((a) => a.id === accountId);

          if (updatedAccount) {
            handleAccounts({
              ...updatedAccount,
              balance: res.data.updatedAmount,
            });
          }
          setIsDepositModalOpen(false);
          toast("Deposit successful.");
        },

        onFailure: () => {
          toast("Payment failed or cancelled.");
        },
      });
    } catch (err) {
      toast("Unexpected error while processing deposit.");
      console.error(err);
    }
  };

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <p className={`text-sm ${FinledgerTheme.text.muted} mb-2`}>
            Total Balance
          </p>
          <p className={`text-4xl font-bold ${FinledgerTheme.text.primary} mb-1`}>
            {formatCurrency(totalBalance, "USD")}
          </p>
          <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
            Across {accounts.length} account{accounts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="absolute top-1 right-1 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Create Account
        </button>
      </div>

      {/* Account List */}
      <div className="grid grid-cols-1 gap-4">
        {accounts.map((account) => {
          const Icon = getAccountIcon(account.type);

          return (
            <div
              key={account.id}
              className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all`}
            >
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`p-3 ${FinledgerTheme.accent.gradient} ${FinledgerTheme.radius.md}`}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center text-white gap-3 mb-2">
                      <h4 className={`text-lg font-semibold capitalize`}>
                        {account.type} Account
                      </h4>
                      <div className="flex items-center gap-1">
                        <Circle
                          className={`w-2 h-2 ${getStatusColor(account.status)} fill-current`}
                        />
                        <span
                          className={`text-xs ${getStatusColor(account.status)} capitalize`}
                        >
                          {account.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Account Number</p>
                        <p className="text-sm text-slate-300 font-mono">
                          {account.accountNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Balance</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(account.balance, account.currency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Currency</p>
                        <p className="text-sm text-white font-semibold">
                          {account.currency}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setViewingAccount(account)}
                    className="p-2 hover:bg-slate-800/50 rounded-md"
                    title="View Account"
                  >
                    <Eye className="w-5 h-5 text-slate-300" />
                  </button>

                  <button
                    onClick={() => {
                      setDepositingAccount(account);
                      setIsDepositModalOpen(true);
                    }}
                    className="p-2 hover:bg-slate-800/50 rounded-md"
                    title="Deposit Money"
                  >
                    <Wallet className="w-5 h-5 text-slate-300" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
        kycData={kycData}
      />

      {successData && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          accountData={successData}
          onGoToDashboard={() => setIsSuccessModalOpen(false)}
          onManageAccount={() => setIsSuccessModalOpen(false)}
        />
      )}

      <ViewAccountModal
        isOpen={!!viewingAccount}
        onClose={() => setViewingAccount(null)}
        account={viewingAccount}
        kycData={kycData}
      />

      <DepositMoneyModal
        isOpen={isDepositModalOpen}
        onClose={() => {
          setIsDepositModalOpen(false);
          setDepositingAccount(null);
        }}
        account={depositingAccount}
        onDeposit={onHandleDeposit}
      />
    </div>
  );
}
