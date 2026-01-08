import Sidebar from '@/components/reusables/sidebar/Sidebar'
import React from 'react'

const AdminLayout = ({ children }:{children:React.ReactNode}) => {
  const adminNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "Home" as const },

  { name: "Employees", href: "/admin/employees", icon: "Users" as const },

  { name: "Loan Products", href: "/admin/loan-products", icon: "Landmark" as const },

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

export default AdminLayout