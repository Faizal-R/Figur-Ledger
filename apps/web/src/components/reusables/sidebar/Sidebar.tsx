"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Users,
  CreditCard,
  Settings,
  Receipt,
  BarChart3,
  ArrowLeftRight,
  Bell,
  LifeBuoy,
  Landmark,
  FileText,
  Wallet,
  TrendingUp,
 Plug
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, Sun, Moon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/api/useAuth";
import { toast } from "sonner";
import { useAuthUserStore } from "@/store";

// Icon mapping
const iconMap = {
  Home,
  User,
  Users,
  CreditCard,
  Settings,
  ArrowLeftRight,
  Bell,
  LifeBuoy,
  Landmark,
  Receipt,
  FileText,
  Wallet,
  BarChart3,
  TrendingUp,
  Plug
} as const;

type IconName = keyof typeof iconMap;

interface SidebarProps {
  navItems: { name: string; href: string; icon: IconName }[];
}

const Sidebar = ({ navItems }: SidebarProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { theme: t, mode, toggleTheme } = useTheme();

  const handleLogout = () =>
    logout.mutate(undefined, {
      onSuccess: () => {
        toast.success("logged out successfully");
        useAuthUserStore.getState().clearAuth();
      },
    });

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 ${mode === 'dark' ? t.card.emerald : 'bg-white'} border-r border-black/5 dark:border-white/10 flex flex-col transition-all duration-700 shadow-2xl`}>
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-8 h-24 border-b border-black/5 dark:border-white/5">
        <div className="w-10 h-10 bg-[#0a1a15] dark:bg-[#c1ff72] rounded-xl flex items-center justify-center transition-colors shadow-lg">
          <Sparkles className="text-[#c1ff72] dark:text-[#0a1a15]" size={20} />
        </div>
        <h1 className={`text-xl font-black tracking-tighter ${t.text.display.split(' ').slice(1).join(' ')}`}>
          Figur<span className="text-[#4caf50]">Ledger</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
        {navItems.map(({ name, href, icon }) => {
          const isActive = pathname === href;
          const Icon = iconMap[icon];
          return (
            <Link
              key={name}
              href={href}
              className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? `${t.button.primary} shadow-lg shadow-[#c1ff72]/20` 
                  : `${t.text.muted} hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0a1a15] dark:hover:text-white`
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-[#0a1a15]" : ""
                )}
              />
              <span className="font-bold text-[13px] uppercase tracking-widest">{name}</span>
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute right-0 w-1.5 h-6 bg-[#0a1a15] rounded-l-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle & Logout */}
      <div className="p-6 space-y-4 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
        <button 
          onClick={toggleTheme}
          className="w-full h-12 rounded-2xl flex items-center gap-4 px-5 bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-[#c1ff72]/20 flex items-center justify-center text-[#c1ff72]">
            {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </div>
          <span className={`text-[12px] font-black uppercase tracking-widest ${t.text.heading}`}>
            {mode === "light" ? "Night Mode" : "Daylight"}
          </span>
        </button>

        <button
          className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all group"
          onClick={handleLogout}
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-[12px] uppercase tracking-[0.2em]">Terminate</span>
        </button>
      </div>

      {/* Footer / Version */}
      <div className="p-6 text-center">
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted} opacity-50`}>Build Phase: V.2.4.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
