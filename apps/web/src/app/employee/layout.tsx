

"use client"
import Sidebar from '@/components/reusables/sidebar/Sidebar'
import { withRole } from '@/hoc/withRouteProtection';
import { Roles } from '@/types/role';
const navItems = [
  { name: "Dashboard", href: "/employee/dashboard", icon: "Home" as const },

  { name: "Profile", href: "/employee/profile", icon: "User" as const },

  { name: "Loan Applications", href: "/employee/loan-applications", icon: "FileText" as const },

  { name: "Repayments", href: "/employee/repayments", icon: "Wallet" as const },

  { name: "Transactions", href: "/employee/transactions", icon: "Receipt" as const },

  { name: "Notifications", href: "/employee/notifications", icon: "Bell" as const },

  { name: "Reports", href: "/employee/reports", icon: "BarChart3" as const },
];

const Employeelayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div>
        <Sidebar navItems={navItems}/>
        <div className='ml-64 p-4 md:p-8 bg-slate-900 min-h-screen'>
          {children}
        </div>
    </div>
  )
}

export default withRole(Employeelayout, [Roles.EMPLOYEE]) 