// components/bills-recharges/components/MainTabs.tsx
import React from 'react';
import { Bookmark, History, PlusCircle, Filter } from 'lucide-react';
import { FinledgerTheme } from '@/theme';

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
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Tab Buttons Container */}
        <div className="w-full md:w-auto">
          <div className="inline-flex gap-1 p-1 rounded-xl bg-slate-800/50 border border-slate-700">
            {/* Saved Billers Tab */}
            <button
              onClick={() => onTabChange('saved')}
              className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group ${
                activeTab === 'saved'
                  ? 'text-white'
                  : `${FinledgerTheme.text.primary} hover:text-white`
              }`}
            >
              {/* Active Background */}
              {activeTab === 'saved' && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow-lg shadow-emerald-500/30" />
              )}
              
              {/* Hover Background for inactive */}
              {activeTab !== 'saved' && (
                <div className="absolute inset-0 bg-slate-700/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                <Bookmark size={18} className={activeTab === 'saved' ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                <span>Saved Billers</span>
                <span className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                  activeTab === 'saved'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-700 text-slate-400 group-hover:bg-white/20 group-hover:text-white'
                }`}>
                  {savedCount}
                </span>
              </div>
            </button>

            {/* Recent Payments Tab */}
            <button
              onClick={() => onTabChange('recent')}
              className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group ${
                activeTab === 'recent'
                  ? 'text-white'
                  : `${FinledgerTheme.text.primary} hover:text-white`
              }`}
            >
              {/* Active Background */}
              {activeTab === 'recent' && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow-lg shadow-emerald-500/30" />
              )}
              
              {/* Hover Background for inactive */}
              {activeTab !== 'recent' && (
                <div className="absolute inset-0 bg-slate-700/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                <History size={18} className={activeTab === 'recent' ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                <span>Recent Payments</span>
                <span className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                  activeTab === 'recent'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-700 text-slate-400 group-hover:bg-white/20 group-hover:text-white'
                }`}>
                  {recentCount}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {showAddButton && onAddNew && (
            <button
              onClick={onAddNew}
              className={`${FinledgerTheme.button.primary} px-4 py-2.5 flex items-center gap-2 flex-1 md:flex-none justify-center`}
            >
              <PlusCircle size={18} />
              Add Biller
            </button>
          )}
          
          <button 
            className={`${FinledgerTheme.button.secondary} px-4 py-2.5 flex items-center gap-2 flex-1 md:flex-none justify-center`}
          >
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Active Tab Indicator Line */}
      <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500 ease-in-out ${
            activeTab === 'saved' ? 'w-1/2 left-0' : 'w-1/2 left-1/2'
          }`}
        />
      </div>
    </div>
  );
};

export default MainTabs;