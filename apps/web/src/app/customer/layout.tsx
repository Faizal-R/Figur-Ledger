"use client";
import Sidebar from '@/components/reusables/sidebar/Sidebar'
import { withRole } from '@/hoc/withRouteProtection';

const navItems = [
  { name: "Dashboard", href: "/customer/dashboard", icon: "Home" as const },
  { name: "Profile & Account", href: "/customer/profile", icon: "User" as const },
  { name: "Transactions", href: "/customer/transactions", icon: "Receipt" as const },
  { name: "Transfer", href: "/customer/transfer", icon: "ArrowLeftRight" as const },
  { name: "Loans", href: "/customer/loans", icon: "Landmark" as const },
  { name: "My Loans", href: "/customer/my-loans", icon: "Landmark" as const },
  {name:"Credit Score", href:"/customer/credit-score", icon:"TrendingUp" as const},
  { name: "Notifications", href: "/customer/notifications", icon: "Bell" as const },
  { name: "Support", href: "/customer/support", icon: "LifeBuoy" as const },
];



const CustomerLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div>
        <Sidebar navItems={navItems}/>
        <div className='ml-64 p-4 md:p-8 bg-slate-900 min-h-screen'>
          {children}
        </div>
    </div>
  )
}

export default withRole(CustomerLayout, ['customer']);