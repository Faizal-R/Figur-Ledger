"use client"
import Sidebar from '@/components/reusables/sidebar/Sidebar'
import { withRole } from '@/hoc/withRouteProtection';
import { Roles } from '@/types/role';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const Employeelayout = ({ children }:{children:React.ReactNode}) => {
  const { theme: t } = useTheme();
  
  const navItems = [
    { name: "Dashboard", href: "/employee/dashboard", icon: "Home" as const },
    { name: "Profile", href: "/employee/profile", icon: "User" as const },
    { name: "Loan Applications", href: "/employee/loan-applications", icon: "FileText" as const },
    { name: "Repayments", href: "/employee/repayments", icon: "Wallet" as const },
    { name: "Transactions", href: "/employee/transactions", icon: "Receipt" as const },
    { name: "Notifications", href: "/employee/notifications", icon: "Bell" as const },
    { name: "Reports", href: "/employee/reports", icon: "BarChart3" as const },
  ];

  return (
    <div className={cn("min-h-screen flex transition-colors duration-700", t.background)}>
      {/* Sidebar - Always fixed */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <Sidebar navItems={navItems} />
      </div>

      {/* Content - responsive margin */}
      <main className="w-full lg:ml-72 p-4 md:p-8 lg:p-12 relative z-0">
        <div className="max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  )
}

export default withRole(Employeelayout, [Roles.EMPLOYEE])