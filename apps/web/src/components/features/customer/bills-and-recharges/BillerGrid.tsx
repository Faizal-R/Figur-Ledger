// components/bills-recharges/components/BillerGrid.tsx
import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { FinledgerTheme } from '@/theme';
import { IBiller } from '@/types/IBill';
import BillerCard from './BillerCard';

interface BillerGridProps {
  billers: IBiller[];
  title: string;
  emptyMessage: string;
  onBillerClick: (biller: IBiller) => void;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const BillerGrid: React.FC<BillerGridProps> = ({
  billers,
  title,
  emptyMessage,
  onBillerClick,
  showSearch = false,
  searchQuery = '',
  onSearchChange
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className={`${FinledgerTheme.text.primary} text-2xl font-bold`}>{title}</h2>
          <div className="px-3 py-1 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-full">
            <span className={`${FinledgerTheme.text.primary} text-sm font-medium`}>
              {billers?.length||0} available
            </span>
          </div>
        </div>
        
        {showSearch && onSearchChange && (
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search billers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} w-full md:w-64 pl-10 pr-4 py-2.5 ${FinledgerTheme.radius.lg}`}
            />
          </div>
        )}
      </div>

      {(billers?.length||0) === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Sparkles size={32} className="text-emerald-400" />
          </div>
          <h3 className={`${FinledgerTheme.text.primary} text-xl font-medium mb-2`}>
            {emptyMessage}
          </h3>
          <p className={`${FinledgerTheme.text.secondary}`}>
            Try selecting a different category or search for billers
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {billers.map((biller) => (
            <BillerCard
              key={biller._id}
              biller={biller}
              onClick={onBillerClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BillerGrid;