"use client";
import {
  Wallet,
  TrendingUp,
  Building2,
  Briefcase,
  Eye,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  Activity
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import {
  IAccount as Account,
  AccountType,
  AccountStatus,
  KYCData,
  IUser,
} from "@/types/user-account";
import { useState } from "react";
import { motion } from "framer-motion";

import { CreateAccountModal } from "@/components/ui/modals/user-account/CreateAccountModal";
import { SuccessModal } from "@/components/ui/modals/user-account/AccountCreatedSuccessModal";
import {
  formatAddress,
  formatDate,
  formatFullName,
} from "@/utils/formats";
import { ViewAccountModal } from "@/components/ui/modals/user-account/ViewAccountModal";
import { TransactionMoneyModal } from "@/components/ui/modals/user-account/DepositMoneyModal";

import { toast } from "sonner";
import {
  useProcessDeposit,
  useProcessWithdrawal,
} from "@/hooks/api/useTransaction";
import { cn } from "@/lib/utils";

interface AccountsTabProps {
  accounts: Account[];
  handleAccounts: (account: Account) => void;
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
    case "checking": return Wallet;
    case "savings": return TrendingUp;
    case "business": return Briefcase;
    default: return Building2;
  }
};

const getStatusConfig = (status: AccountStatus) => {
  switch (status) {
    case "active": return { color: "text-[#b0f061]", bg: "bg-[#b0f061]/10" };
    case "frozen": return { color: "text-orange-500", bg: "bg-orange-500/10" };
    default: return { color: "text-slate-500", bg: "bg-slate-500/10" };
  }
};

export function AccountsTab({
  userKycData,
  accounts,
  createAccount,
  handleAccounts,
}: AccountsTabProps) {
  const { theme: t, mode } = useTheme();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [viewingAccount, setViewingAccount] = useState<Account | null>(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [transactionType, setTransactionType] = useState<"deposit" | "withdraw">("deposit");

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
  const processWithdrawal = useProcessWithdrawal();

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
    const referenceId = `dep-${Date.now()}`;
    try {
      const response = await processDeposit.mutateAsync({ accountId, amount, referenceId });
      if (!response.success) { toast.error(response.message); return; }
      handleAccounts({ ...selectedAccount!, balance: response.data.balance });
      setIsDepositModalOpen(false);
      setSelectedAccount(null);
      toast.success("Deposit successful");
    } catch (err) { toast.error("Something went wrong"); }
  };

  const onHandleWithdraw = async (accountId: string, amount: number) => {
    if (amount > (selectedAccount?.balance ?? 0)) { toast.error("Insufficient balance"); return; }
    
    const referenceId = `wd-${Date.now()}`;
    processWithdrawal.mutate({ accountId, amount, referenceId }, {
      onSuccess: (response) => {
        if (!response.success) { toast.error(response.message); return; }
        handleAccounts({ ...selectedAccount!, balance: response.data.balance });
        setIsDepositModalOpen(false);
        setSelectedAccount(null);
        toast.success("Withdrawal successful");
      }
    });
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-12">
      {/* 1. Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("p-10 border relative overflow-hidden group shadow-3xl", t.card.base, t.radius.lg, "border-black/5 dark:border-white/10")}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b0f061]/5 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
          <div className="space-y-2">
             <div className="flex items-center gap-3">
                <Activity size={14} className="text-[#b0f061]" />
                <p className={cn("text-[10px] font-black uppercase tracking-[0.4em] opacity-60", t.text.muted)}>Aggregated Liquidity</p>
             </div>
             <h2 className={cn("text-6xl font-black tracking-tighter", t.text.display)}>
                ₹{totalBalance.toLocaleString()}
             </h2>
             <p className={cn("text-xs font-medium opacity-40", t.text.muted)}>Managed across {accounts.length} institutional endpoints</p>
          </div>

          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className={cn("h-16 px-10 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all flex items-center gap-4", t.button.onyx)}
          >
            <Plus size={20} />
            Initialize Vault
          </button>
        </div>
      </motion.div>

      {/* 2. Account Grid */}
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
           <h3 className={cn("text-2xl font-black uppercase tracking-tighter opacity-80", t.text.heading)}>Linked Nodes.</h3>
        </div>

        {accounts.map((account, idx) => {
          const Icon = getAccountIcon(account.type);
          const status = getStatusConfig(account.status);

          return (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "p-8 border flex flex-col lg:flex-row lg:items-center gap-10 group transition-all duration-500 shadow-xl hover:shadow-2xl",
                t.card.base,
                t.radius.lg,
                "border-black/5 dark:border-white/5 hover:border-[#b0f061]/30"
              )}
            >
              <div className="flex items-center gap-6 lg:w-1/3">
                 <div className={cn(
                   "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 shadow-lg",
                   mode === 'dark' ? "bg-white/5 text-[#b0f061]" : "bg-black/5 text-[#1a3a32]"
                 )}>
                    <Icon size={28} />
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h4 className={cn("text-xl font-black tracking-tight capitalize", t.text.heading)}>
                         {account.nickname || `${account.type} Account`}
                       </h4>
                       <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest", status.bg, status.color)}>
                         {account.status}
                       </span>
                    </div>
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-40", t.text.muted)}>{account.accountNumber}</p>
                 </div>
              </div>

              <div className="flex-1 space-y-1">
                 <p className={cn("text-[9px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>Available Protocol Assets</p>
                 <p className={cn("text-3xl font-black tracking-tighter", t.text.heading)}>
                   ₹{account.balance.toLocaleString()}
                 </p>
              </div>

              <div className="flex items-center gap-4 lg:ml-auto">
                 <button
                   onClick={() => setViewingAccount(account)}
                   status-label="Details"
                   className={cn("h-14 px-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all hover:bg-black/10 dark:hover:bg-white/10")}
                 >
                   <Eye size={20} className={t.text.heading} />
                 </button>
                 
                 <button
                   onClick={() => {
                      setTransactionType("deposit");
                      setSelectedAccount(account);
                      setIsDepositModalOpen(true);
                   }}
                   className={cn("h-14 px-8 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all", t.button.onyx)}
                 >
                   <ArrowUpCircle size={18} className="text-[#b0f061]" />
                   <span>Inbound</span>
                 </button>

                 <button
                   onClick={() => {
                      setTransactionType("withdraw");
                      setSelectedAccount(account);
                      setIsDepositModalOpen(true);
                   }}
                   className={cn("h-14 px-8 rounded-2xl border flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all", t.card.base, "hover:border-red-500/30 hover:bg-red-500/5 text-red-500")}
                 >
                   <ArrowDownCircle size={18} />
                   <span>Outbound</span>
                 </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Modals */}
      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
        kycData={kycData}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        accountData={successData!}
        onGoToDashboard={() => setIsSuccessModalOpen(false)}
        onManageAccount={() => setIsSuccessModalOpen(false)}
      />

      <ViewAccountModal
        isOpen={!!viewingAccount}
        onClose={() => setViewingAccount(null)}
        account={viewingAccount}
        kycData={kycData}
      />

      <TransactionMoneyModal
        isOpen={isDepositModalOpen}
        onClose={() => {
          setIsDepositModalOpen(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
        transactionType={transactionType}
        onDeposit={onHandleDeposit}
        onWithdraw={onHandleWithdraw}
      />
    </div>
  );
}
