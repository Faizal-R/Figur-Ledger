"use client";
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabType = 'personal' | 'accounts' | 'security' | 'preferences';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { theme: t, mode } = useTheme();

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'accounts', label: 'Vault Access', icon: Wallet },
  ];

  return (
    <div className="relative mb-12">
      <div className="absolute bottom-0 left-0 w-full h-px bg-black/5 dark:bg-white/5" />
      
      <div className="flex flex-wrap gap-4 md:gap-8 pb-4 no-scrollbar overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group relative flex items-center gap-4 transition-all duration-500 outline-none"
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-xl group-hover:rotate-6",
                isActive 
                  ? t.card.lime + " " + (mode === 'dark' ? "text-[#0a1a15]" : "text-[#1a3a32]")
                  : "bg-black/5 dark:bg-white/5 text-slate-500 group-hover:scale-110"
              )}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <div className="flex flex-col text-left">
                 <span className={cn(
                   "text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300",
                   isActive ? t.text.heading : "text-slate-500 opacity-60 group-hover:opacity-100"
                 )}>
                   {tab.label}
                 </span>
                 {isActive && (
                   <motion.div 
                     layoutId="tab-active-line"
                     className="h-[2px] bg-[#c1ff72] mt-1 shadow-[0_0_15px_#c1ff72]"
                   />
                 )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
