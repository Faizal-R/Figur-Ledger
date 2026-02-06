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
  LogOut,
  ArrowLeftRight,
  Bell,
  LifeBuoy,
  Landmark,
  FileText,
  Wallet,
  TrendingUp,
} from "lucide-react";
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
  TrendingUp
} as const;

type IconName = keyof typeof iconMap;

interface SidebarProps {
  navItems: { name: string; href: string; icon: IconName }[];
}

const Sidebar = ({ navItems }: SidebarProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const handleLogout = () =>
    logout.mutate(undefined, {
      onSuccess: () => {
        toast.success("logged out successfully");
        useAuthUserStore.getState().clearAuth();
      },
    });

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700 flex flex-col shadow-emerald-500/30">
      {/* Brand Header */}
      <div className="flex items-center justify-center h-16 border-b border-slate-800 bg-slate-800/50">
        <h1 className="text-emerald-400 font-bold text-xl tracking-wide">
          Figur Ledger{" "}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {navItems.map(({ name, href, icon }) => {
          const isActive = pathname === href;
          const Icon = iconMap[icon];
          return (
            <Link
              key={name}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                "text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 hover:shadow-lg hover:shadow-emerald-500/20",
                isActive &&
                  "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30 shadow-md shadow-emerald-500/30"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-400 group-hover:text-emerald-400"
                )}
              />
              <span className="font-medium text-sm">{name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer / Version / Logout */}
      <div className="border-t border-slate-800 p-4">
        <p className="text-slate-500 text-xs text-center">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
