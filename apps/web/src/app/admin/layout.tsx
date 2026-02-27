"use client"
import Sidebar from '@/components/reusables/sidebar/Sidebar'
import { withRole } from '@/hoc/withRouteProtection';
import React from 'react'
import { Roles } from '@/types/role';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const AdminLayout = ({ children }:{children:React.ReactNode}) => {
  const { theme: t } = useTheme();
  
  const adminNavItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "Home" as const },
    { name: "Employees", href: "/admin/employees", icon: "Users" as const },
    { name: "Loan Products", href: "/admin/loan-products", icon: "Landmark" as const },
    { name: "Billers Management", href: "/admin/billers", icon: "Plug" as const },
    { name: "Reports", href: "/admin/reports", icon: "BarChart3" as const },
    { name: "System Settings", href: "/admin/settings", icon: "Settings" as const },
  ];

  return (
    <div className={cn("min-h-screen flex transition-colors duration-700", t.background)}>
      {/* Sidebar - Always fixed */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <Sidebar navItems={adminNavItems} />
      </div>

      {/* Content - responsive margin */}
      <main className={cn("w-full lg:ml-72 p-4 md:p-8 lg:p-12 relative z-0", t.meshGradient)}>
        <div className="max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  )
}

export default withRole(AdminLayout, [Roles.ADMIN])