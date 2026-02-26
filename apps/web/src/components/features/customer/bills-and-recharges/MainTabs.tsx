"use client";
import React from 'react';
import { Bookmark, History, PlusCircle, Filter } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface MainTabsProps {
  activeTab: 'saved' | 'recent';
  onTabChange: (tab: 'saved' | 'recent') => void;
  onAddNew?: () => void;
  savedCount: number;
  recentCount: number;
  showAddButton?: boolean;
}

const MainTabs: React.FC<MainTabsProps> = ({
  activeTab,
  onTabChange,
  onAddNew,
  savedCount,
  recentCount,
  showAddButton = true
}) => {
  const { theme: t } = useTheme();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Tab Selection */}
        <div className={`p-1.5 ${t.card.base} ${t.radius.lg} border border-black/5 dark:border-white/5 shadow-2xl flex items-center gap-1`}>
          <button
            onClick={() => onTabChange('saved')}
            className={`relative px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center gap-3 overflow-hidden group`}
          >
            {activeTab === 'saved' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-[#0a1a15] dark:bg-[#c1ff72] shadow-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className={`relative z-10 flex items-center gap-3 ${activeTab === 'saved' ? 'text-[#c1ff72] dark:text-[#0a1a15]' : t.text.muted}`}>
              <Bookmark size={16} className={activeTab === 'saved' ? 'text-[#c1ff72] dark:text-[#0a1a15]' : 'opacity-40'} />
              <span>SAVED ENTITIES</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeTab === 'saved' ? 'bg-[#c1ff72]/20 dark:bg-[#0a1a15]/10' : 'bg-black/5 dark:bg-white/5 opacity-40'}`}>
                {savedCount}
              </span>
            </div>
          </button>

          <button
            onClick={() => onTabChange('recent')}
            className={`relative px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center gap-3 overflow-hidden group`}
          >
            {activeTab === 'recent' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-[#0a1a15] dark:bg-[#c1ff72] shadow-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className={`relative z-10 flex items-center gap-3 ${activeTab === 'recent' ? 'text-[#c1ff72] dark:text-[#0a1a15]' : t.text.muted}`}>
              <History size={16} className={activeTab === 'recent' ? 'text-[#c1ff72] dark:text-[#0a1a15]' : 'opacity-40'} />
              <span>TRANSMISSION LOG</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeTab === 'recent' ? 'bg-[#c1ff72]/20 dark:bg-[#0a1a15]/10' : 'bg-black/5 dark:bg-white/5 opacity-40'}`}>
                {recentCount}
              </span>
            </div>
          </button>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {showAddButton && onAddNew && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddNew}
              className={`flex-1 md:flex-none h-14 px-8 rounded-2xl bg-[#0a1a15] dark:bg-[#c1ff72] text-[#c1ff72] dark:text-[#0a1a15] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl transition-all duration-500 hover:shadow-[#c1ff72]/10`}
            >
              <PlusCircle size={18} />
              <span>Register Node</span>
            </motion.button>
          )}
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 md:flex-none h-14 px-8 rounded-2xl ${t.card.base} border border-black/5 dark:border-white/5 text-[10px] font-black uppercase tracking-[0.3em] ${t.text.heading} flex items-center justify-center gap-3 shadow-lg hover:border-[#c1ff72]/20 transition-all duration-500`}
          >
            <Filter size={18} className="text-[#c1ff72]" />
            <span>Archive Filter</span>
          </motion.button>
        </div>
      </div>

      {/* Connectivity Visualization */}
      <div className="relative h-px w-full bg-black/5 dark:bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute top-0 h-full w-1/3 bg-linear-to-r from-transparent via-[#c1ff72]/30 to-transparent"
        />
      </div>
    </div>
  );
};

export default MainTabs;