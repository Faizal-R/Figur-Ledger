"use client"
import Sidebar from '@/components/reusables/sidebar/Sidebar'
import { withRole } from '@/hoc/withRouteProtection';
import React from 'react'
import { Roles } from '@/types/role';
const AdminLayout = ({ children }:{children:React.ReactNode}) => {
  const adminNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "Home" as const },

  { name: "Employees", href: "/admin/employees", icon: "Users" as const },

  { name: "Loan Products", href: "/admin/loan-products", icon: "Landmark" as const },
  { name: "Billers Management", href: "/admin/billers", icon: "Plug" as const },

  { name: "Reports", href: "/admin/reports", icon: "BarChart3" as const },

  { name: "System Settings", href: "/admin/settings", icon: "Settings" as const },

];

  return (
    <div>
        <Sidebar navItems={adminNavItems}/>
        <div className='ml-64 p-4 md:p-8 bg-slate-900 min-h-screen'>
          {children}
        </div>
    </div>
  )
}

export default withRole(AdminLayout, [Roles.ADMIN])