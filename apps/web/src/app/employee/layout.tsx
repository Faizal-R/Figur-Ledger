import Sidebar from '@/components/reusables/sidebar/Sidebar'

const navItems = [
{ name: "Dashboard", href: "/employee/dashboard", icon: "Home" as const },
{ name: "Profile", href: "/employee/profile", icon: "User" as const },
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

export default Employeelayout