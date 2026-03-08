"use client";

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/features/admin/dashboard/DashboardHeader';
import { StatsGrid } from '@/components/features/admin/dashboard/StatsGrid';
import { TransactionChart } from '@/components/features/admin/dashboard/TransactionChart';
import { LoanHealthChart } from '@/components/features/admin/dashboard/LoanHealthChart';
import { BillerNetwork } from '@/components/features/admin/dashboard/BillerNetwork';
import { ProductPerformance } from '@/components/features/admin/dashboard/ProductPerformance';
import { QuickActions } from '@/components/features/admin/dashboard/QuickActions';
import { useGetAdminDashboardAnalytics } from '@/hooks/api/useReportAndAnalytics';

import { useState } from 'react';

export default function AdminDashboardOverview() {
  const { theme: t, mode } = useTheme();
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const { data: apiResponse, isLoading } = useGetAdminDashboardAnalytics(period);
  
  const dashboardData = apiResponse?.data;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-20"
    >
      {/* Header */}
      <DashboardHeader t={t} itemVariants={item} />

      {/* Summary Metrics */}
      <StatsGrid t={t} data={dashboardData} isLoading={isLoading} />

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <TransactionChart 
          t={t} 
          mode={mode} 
          itemVariants={item} 
          data={dashboardData?.transactions?.volume} 
          isLoading={isLoading}
          period={period}
          setPeriod={setPeriod}
        />
        <LoanHealthChart 
          t={t} 
          mode={mode} 
          itemVariants={item} 
          data={dashboardData?.loans?.health}
          isLoading={isLoading}
        />
      </div>

      {/* Secondary Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <BillerNetwork 
          t={t} 
          itemVariants={item} 
          data={dashboardData?.billers}
          isLoading={isLoading}
        />
        <ProductPerformance 
          t={t} 
          mode={mode} 
          itemVariants={item} 
          data={dashboardData?.loans?.productPerformance}
          isLoading={isLoading}
        />
      </div>

      {/* Footer Navigation/Actions */}
      <QuickActions t={t} itemVariants={item} />
    </motion.div>
  );
}
