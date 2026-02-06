
"use client"
import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  DollarSign,
  PiggyBank,
  Award,
  ChevronRight,
  Target,
} from 'lucide-react';
import { FinledgerTheme } from '@/theme';
import { IAccount } from '@/types/user-account';
// import { supabase } from '../lib/supabase';
// import { Account, Transaction, LoanProduct, UserLoan } from '../types';

interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export default function DashboardOverview() {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [availableLoans, setAvailableLoans] = useState<any[]>([]);
  const [activeLoans, setActiveLoans] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0,
  });
  const [creditScore, setCreditScore] = useState(0);

  useEffect(() => {
    // loadDashboardData();
  }, []);



  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
  }: {
    title: string;
    value: string;
    change: string;
    icon: any;
    trend: 'up' | 'down';
  }) => (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 hover:border-emerald-500/50 transition-all group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 ${FinledgerTheme.radius.md} bg-gradient-to-br ${FinledgerTheme.gradients.subtleEmerald} group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-6 h-6 text-emerald-400" />
        </div>
        <div
          className={`flex items-center space-x-1 px-2 py-1 ${FinledgerTheme.radius.sm} ${
            trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}
        >
          {trend === 'up' ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          <span className="text-xs font-semibold">{change}</span>
        </div>
      </div>
      <h3 className={`text-sm ${FinledgerTheme.text.muted} mb-1`}>{title}</h3>
      <p className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${FinledgerTheme.text.primary} mb-2`}>
            Welcome Back!
          </h1>
          <p className={FinledgerTheme.text.secondary}>
            Here's what's happening with your finances today
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-4 flex items-center space-x-3`}
          >
            <Award className="w-8 h-8 text-emerald-400" />
            <div>
              <p className={`text-xs ${FinledgerTheme.text.muted}`}>Credit Score</p>
              <p className={`text-2xl font-bold ${FinledgerTheme.text.primary}`}>
                {creditScore}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={`$${stats.totalBalance.toLocaleString()}`}
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Monthly Income"
          value={`$${stats.monthlyIncome.toLocaleString()}`}
          change="+8.2%"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Monthly Expenses"
          value={`$${stats.monthlyExpenses.toLocaleString()}`}
          change="-4.1%"
          icon={TrendingDown}
          trend="down"
        />
        <StatCard
          title="Savings Rate"
          value={`${stats.savingsRate.toFixed(1)}%`}
          change="+2.3%"
          icon={PiggyBank}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${FinledgerTheme.text.primary}`}>
              Your Accounts
            </h2>
            <button className={`text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center`}>
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`${FinledgerTheme.card} p-5 ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} hover:border-emerald-500/50 transition-all group cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 ${FinledgerTheme.accent.gradient} ${FinledgerTheme.radius.md} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <CreditCard className="w-6 h-6 text-slate-900" />
                    </div>
                    {/* <div>
                      <p className={`font-semibold ${FinledgerTheme.text.primary}`}>
                        {account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1)} Account
                      </p>
                      <p className={`text-sm ${FinledgerTheme.text.muted}`}>
                        ****{account.account_number.slice(-4)}
                      </p>
                    </div> */}
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${FinledgerTheme.text.primary}`}>
                      ${Number(account.balance).toLocaleString()}
                    </p>
                    <p className={`text-xs ${FinledgerTheme.text.muted}`}>{account.currency}</p>
                  </div>
                </div>
              </div>
            ))}
            {accounts.length === 0 && (
              <p className={`text-center py-8 ${FinledgerTheme.text.muted}`}>
                No accounts found
              </p>
            )}
          </div>
        </div>

        <div
          className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${FinledgerTheme.text.primary}`}>
              Recent Transactions
            </h2>
            <button className={`text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center`}>
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 ${FinledgerTheme.radius.md} hover:bg-slate-800/50 transition-all cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${FinledgerTheme.radius.md} ${
                      transaction.type === 'credit'
                        ? 'bg-emerald-500/20'
                        : 'bg-slate-700'
                    } flex items-center justify-center`}
                  >
                    {transaction.type === 'credit' ? (
                      <ArrowDownRight className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${FinledgerTheme.text.primary}`}>
                      {transaction.merchant || transaction.description}
                    </p>
                    <p className={`text-xs ${FinledgerTheme.text.muted}`}>
                      {new Date(transaction.transaction_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-bold ${
                    transaction.type === 'credit' ? 'text-emerald-400' : FinledgerTheme.text.primary
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}$
                  {Number(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <p className={`text-center py-8 ${FinledgerTheme.text.muted}`}>
                No recent transactions
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${FinledgerTheme.text.primary}`}>
              Available Loans For You
            </h2>
            <button className={`text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center`}>
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {availableLoans.slice(0, 3).map((loan) => (
              <div
                key={loan.id}
                className={`p-5 ${FinledgerTheme.cardRounded} bg-gradient-to-br ${FinledgerTheme.gradients.subtleEmerald} border border-emerald-500/30 hover:border-emerald-500 transition-all group cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`text-lg font-bold ${FinledgerTheme.text.primary} mb-1`}>
                      {loan.name}
                    </h3>
                    <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
                      {loan.description}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 ${FinledgerTheme.radius.sm} bg-emerald-500/20 text-emerald-400 text-xs font-semibold`}
                  >
                    {loan.interest_rate}% APR
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className={`text-xs ${FinledgerTheme.text.muted}`}>Loan Amount</p>
                    <p className={`text-sm font-bold ${FinledgerTheme.text.primary}`}>
                      ${loan.min_amount.toLocaleString()} - ${loan.max_amount.toLocaleString()}
                    </p>
                  </div>
                  <button
                    className={`${FinledgerTheme.button.primary} px-4 py-2 ${FinledgerTheme.radius.md}`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
            {availableLoans.length === 0 && (
              <div className={`text-center py-8 ${FinledgerTheme.text.muted}`}>
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No loans available for your credit score</p>
                <p className="text-sm mt-1">Work on improving your credit score to unlock more options</p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${FinledgerTheme.text.primary}`}>
              Active Loans
            </h2>
          </div>
          <div className="space-y-4">
            {activeLoans.map((loan) => (
              <div
                key={loan.id}
                className={`p-5 ${FinledgerTheme.cardRounded} bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${FinledgerTheme.text.primary}`}>
                      {loan.loan_product?.name}
                    </h3>
                    <p className={`text-xs ${FinledgerTheme.text.muted} mt-1`}>
                      Status: <span className="text-emerald-400">{loan.status}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs ${FinledgerTheme.text.muted}`}>Remaining</p>
                    <p className={`text-lg font-bold ${FinledgerTheme.text.primary}`}>
                      ${Number(loan.remaining_balance || loan.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${FinledgerTheme.text.muted}`}>Monthly Payment</p>
                    <p className={`text-sm font-semibold ${FinledgerTheme.text.primary}`}>
                      ${Number(loan.monthly_payment || 0).toLocaleString()}
                    </p>
                  </div>
                  <button
                    className={`text-emerald-400 hover:text-emerald-300 text-sm font-medium`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
            {activeLoans.length === 0 && (
              <div className={`text-center py-8 ${FinledgerTheme.text.muted}`}>
                <p>No active loans</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
