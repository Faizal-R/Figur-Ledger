import Sidebar from '@/components/reusables/sidebar/Sidebar'

const navItems = [
{ name: "Dashboard", href: "/customer/dashboard", icon: "Home" as const },
{ name: "Profile & Account", href: "/customer/profile", icon: "User" as const },
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

export default CustomerLayout