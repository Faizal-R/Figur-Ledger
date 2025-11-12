import Sidebar from '@/components/reusables/sidebar/Sidebar'
import React from 'react'

const AdminLayout = ({ children }:{children:React.ReactNode}) => {
    const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "Home" as const },
  { name: "Employee Management", href: "/admin/employee", icon: "User" as const },
 
];
  return (
    <div>
        <Sidebar navItems={navItems}/>
        <div className='ml-64 p-4 md:p-8 bg-slate-900 min-h-screen'>
          {children}
        </div>
    </div>
  )
}

export default AdminLayout