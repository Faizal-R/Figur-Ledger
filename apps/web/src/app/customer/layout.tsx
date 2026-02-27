"use client";
import Sidebar from '@/components/reusables/sidebar/Sidebar'
import { withRole } from '@/hoc/withRouteProtection';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const navItems = [
  { name: "Dashboard", href: "/customer/dashboard", icon: "Home" as const },
  { name: "Profile & Account", href: "/customer/profile", icon: "User" as const },
  { name: "Transactions", href: "/customer/transactions", icon: "Receipt" as const },
  { name: "Transfer", href: "/customer/transfer", icon: "ArrowLeftRight" as const },
  { name: "Loans", href: "/customer/loans", icon: "Landmark" as const },
  { name: "My Loans", href: "/customer/my-loans", icon: "Landmark" as const },
  { name: "Bills & Recharges", href: "/customer/bills-and-recharges", icon: "CreditCard" as const },
  { name: "Statements", href: "/customer/statements", icon: "Receipt" as const },
  {name:"Credit Score", href:"/customer/credit-score", icon:"TrendingUp" as const},
  { name: "Notifications", href: "/customer/notifications", icon: "Bell" as const },
];



const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme: t } = useTheme();
  
  return (
    <div className={`flex min-h-screen ${t.background} transition-colors duration-700`}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <Sidebar navItems={navItems} />
      </div>

      {/* Content */}
      <main className={cn("ml-72 w-full p-4 md:p-8 relative z-0", t.meshGradient)}>
        {children}
      </main>
    </div>
  );
};


export default withRole(CustomerLayout, ['customer']);