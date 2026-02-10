// components/bills-recharges/components/Header.tsx
import React from 'react';
import { Bell, CreditCard, Shield, Zap } from 'lucide-react';
import { FinledgerTheme } from '@/theme';

interface HeaderProps {
  totalDue: number;
  savedBillersCount: number;
  upcomingBills: number;
}

const Header: React.FC<HeaderProps> = ({ totalDue, savedBillersCount, upcomingBills }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className={`${FinledgerTheme.text.primary} text-4xl font-bold mb-2`}>Bills & Recharges</h1>
          <p className={`${FinledgerTheme.text.secondary} text-lg`}>
            Manage all your utility payments in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-2">
            <Shield size={16} className="text-emerald-400" />
            <span className={`${FinledgerTheme.text.primary} font-medium`}>Secure</span>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl flex items-center gap-2">
            <CreditCard size={16} className="text-blue-400" />
            <span className={`${FinledgerTheme.text.primary} font-medium`}>Instant</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Due Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-emerald-500/0 border border-emerald-500/20 p-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <CreditCard size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>
            </div>
            <h3 className={`${FinledgerTheme.text.secondary} text-sm font-medium mb-1`}>Total Due</h3>
            <p className={`${FinledgerTheme.text.primary} text-3xl font-bold mb-2`}>₹{totalDue.toLocaleString()}</p>
            <p className={`${FinledgerTheme.text.secondary} text-sm`}>Across {savedBillersCount} bills</p>
          </div>
        </div>

        {/* Saved Billers Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-500/0 border border-blue-500/20 p-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Bell size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              </div>
            </div>
            <h3 className={`${FinledgerTheme.text.secondary} text-sm font-medium mb-1`}>Saved Billers</h3>
            <p className={`${FinledgerTheme.text.primary} text-3xl font-bold mb-2`}>{savedBillersCount}</p>
            <p className={`${FinledgerTheme.text.secondary} text-sm`}>Active connections</p>
          </div>
        </div>

        {/* Upcoming Bills Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-purple-500/0 border border-purple-500/20 p-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Zap size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
              </div>
            </div>
            <h3 className={`${FinledgerTheme.text.secondary} text-sm font-medium mb-1`}>Upcoming Bills</h3>
            <p className={`${FinledgerTheme.text.primary} text-3xl font-bold mb-2`}>{upcomingBills}</p>
            <p className={`${FinledgerTheme.text.secondary} text-sm`}>Due in next 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;