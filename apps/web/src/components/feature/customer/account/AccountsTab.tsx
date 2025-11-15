"use client"
import { Wallet, TrendingUp, Building2, Briefcase, Circle, Edit2, PlusCircle } from 'lucide-react';
import { FinledgerTheme } from '@/theme';
import { IAccount as Account, AccountType, AccountStatus, KYCData, IUser } from '@/types/user-account';
import { useState } from 'react';

import { CreateAccountModal } from '@/components/ui/modals/user-account/CreateAccountModal';
import { SuccessModal } from '@/components/ui/modals/user-account/AccountCreatedSuccessModal';
import { formatAddress, formatCurrency, formatDate, formatFullName } from '@/utils/formats';

interface AccountsTabProps {
  accounts: Account[];
  handleAccounts:(accounts:Account[])=>void
  userKycData:IUser,
  createAccount:(account:{
    nickname:string,
    type: string;
    currency: string;
  })=>void
}

const getAccountIcon = (type: AccountType) => {
  switch (type) {
    case 'checking':
      return Wallet;
    case 'savings':
      return TrendingUp;
    case 'business':
      return Briefcase;
    default:
      return Building2;
  }
};

  const getStatusColor = (status: AccountStatus) => {
    switch (status) {
      case 'active':
        return 'text-emerald-400';
      case 'frozen':
        return 'text-yellow-400';
      case 'closed':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };
export function AccountsTab({ userKycData,accounts: initialAccounts,createAccount }: AccountsTabProps) {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [accountsList, setAccountsList] = useState(initialAccounts);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);


 const kycData: KYCData = {
    fullName:formatFullName(userKycData.personalInfo),
    dateOfBirth:formatDate(new Date(userKycData.personalInfo.dateOfBirth)),
    email:userKycData.email,
    phoneNumber:userKycData.phone,
    address:formatAddress(userKycData.address),
    isComplete:true
 }


  const handleSaveAccount = (updatedAccount: Account) => {
    setAccountsList((prev) =>
      prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc))
    );
    setEditingAccountId(null);
  };


const handleCreateSuccess = (data: {
    nickname:string,
    type: string;
    currency:string
  }) => {
    createAccount(data);
    setIsCreateModalOpen(false);
    setIsSuccessModalOpen(true);
  };


    const handleGoToDashboard = () => {
    setIsSuccessModalOpen(false);
    console.log('Navigate to dashboard');
  };

  const handleManageAccount = () => {
    setIsSuccessModalOpen(false);
    console.log('Navigate to manage account');
  };

  const editingAccount = accountsList.find((acc) => acc.id === editingAccountId);
  const totalBalance = accountsList.reduce((sum, account) => sum + account.balance, 0);


  return (
    <div className="space-y-6">
    

      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <p className={`text-sm ${FinledgerTheme.text.muted} mb-2`}>Total Balance</p>
          <p className={`text-4xl font-bold ${FinledgerTheme.text.primary} mb-1`}>
            {formatCurrency(totalBalance, 'USD')}
          </p>
          <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
            Across {accountsList.length} account{accountsList.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className=" absolute top-1 right-1  inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Create Account
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {accountsList.map((account) => {
          const Icon = getAccountIcon(account.type);
          return (
            <div
              key={account.id}
              className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all`}
            >
              <div className={`absolute inset-0 ${FinledgerTheme.accent.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`p-3 ${FinledgerTheme.accent.gradient} ${FinledgerTheme.radius.md} ${FinledgerTheme.accent.glow}`}
                  >
                    <Icon className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`text-lg font-semibold ${FinledgerTheme.text.primary} capitalize`}>
                        {account.type} Account
                      </h4>
                      <div className="flex items-center gap-1">
                        <Circle className={`w-2 h-2 ${getStatusColor(account.status)} fill-current`} />
                        <span className={`text-xs ${getStatusColor(account.status)} capitalize`}>
                          {account.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className={`text-xs ${FinledgerTheme.text.muted} mb-1`}>
                          Account Number
                        </p>
                        <p className={`text-sm ${FinledgerTheme.text.secondary} font-mono`}>
                          {account.accountNumber}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${FinledgerTheme.text.muted} mb-1`}>Balance</p>
                        <p className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>
                          {formatCurrency(account.balance, account.currency)}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${FinledgerTheme.text.muted} mb-1`}>Currency</p>
                        <p className={`text-sm ${FinledgerTheme.text.secondary} font-semibold`}>
                          {account.currency}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setEditingAccountId(account.id)}
                  className={`p-2 hover:bg-slate-800/50 ${FinledgerTheme.radius.md} transition-colors flex-shrink-0`}
                  title="Edit account"
                >
                  <Edit2 className={`w-5 h-5 ${FinledgerTheme.text.secondary}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>


      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
        kycData={kycData}
      />

      {/* {accountData && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          accountData={accountData}
          onGoToDashboard={handleGoToDashboard}
          onManageAccount={handleManageAccount}
        />
      )} */}
    </div>
  );
}