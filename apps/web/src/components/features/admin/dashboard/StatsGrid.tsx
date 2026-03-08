"use client";

import { Users, Activity, Landmark, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';
import { EliteTheme } from '@/theme';

interface StatsGridProps {
  t: typeof EliteTheme.light;
  data?: any;
  isLoading?: boolean;
}

export const StatsGrid = ({ t, data, isLoading }: StatsGridProps) => {
  const stats = [
    { 
      label: "Total Customers", 
      value: isLoading ? "..." : data?.customers?.count?.toLocaleString() || "0", 
      icon: Users, 
      change: "+12.2%", // Mock trend for now as backend doesn't provide it yet
      trend: "up" as const, 
      color: "text-emerald-500" 
    },
    { 
      label: "Total Transactions", 
      value: isLoading ? "..." : data?.transactions?.count?.toLocaleString() || "0", 
      icon: Activity, 
      change: `₹${(data?.transactions?.totalVolume || 0).toLocaleString()}`, 
      trend: "up" as const, 
      color: "text-blue-500" 
    },
    { 
      label: "Disbursed Loans", 
      value: isLoading ? "..." : data?.loans?.totalLoans?.toLocaleString() || "0", 
      icon: Landmark, 
      change: "-2.1%", 
      trend: "down" as const, 
      color: "text-amber-500" 
    },
    { 
      label: "Active Billers", 
      value: isLoading ? "..." : data?.billers?.count?.toLocaleString() || "0", 
      icon: TrendingUp, 
      change: "Stable", 
      trend: "up" as const, 
      color: "text-purple-500" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} t={t} />
      ))}
    </div>
  );
};
