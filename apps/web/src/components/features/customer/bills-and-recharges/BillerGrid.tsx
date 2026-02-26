"use client";
import React from 'react';
import { Search, Sparkles, LayoutGrid, XCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { IBiller } from '@/types/IBill';
import BillerCard from './BillerCard';
import { motion, AnimatePresence } from 'framer-motion';

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
  const { theme: t } = useTheme();

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
        {/* Section Header */}
        <div className="flex items-center gap-5">
           <div className={`w-12 h-12 rounded-2xl ${t.card.base} border border-black/5 dark:border-white/5 flex items-center justify-center shadow-lg`}>
              <LayoutGrid size={22} className="text-[#c1ff72]" />
           </div>
           <div>
              <h2 className={`${t.text.display} text-2xl font-black tracking-tighter leading-none`}>{title}</h2>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72]" />
                 <span className={`${t.text.muted} text-[10px] font-black uppercase tracking-[0.2em] opacity-60`}>
                    {billers?.length || 0} Nodes Available in Current Spectrum
                 </span>
              </div>
           </div>
        </div>
        
        {/* Interactive Search Bar */}
        {showSearch && onSearchChange && (
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-0 bg-[#c1ff72]/5 blur-xl group-focus-within:bg-[#c1ff72]/10 transition-colors pointer-events-none" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#c1ff72] opacity-40 group-focus-within:opacity-100 transition-opacity" size={18} />
              <input
                type="text"
                placeholder="DISCOVER TRANSMITTERS..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`
                  w-full h-14 pl-12 pr-12 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
                  focus:border-[#c1ff72]/30 focus:bg-white dark:focus:bg-black/20 outline-none
                  text-[11px] font-black uppercase tracking-widest ${t.text.heading}
                  ${t.radius.lg} transition-all duration-500
                `}
              />
              {searchQuery && (
                 <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                   <XCircle size={16} />
                 </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Grid Canvas */}
      <AnimatePresence mode="popLayout">
        {(billers?.length || 0) === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex flex-col items-center justify-center py-28 px-10 ${t.card.base} ${t.radius.lg} border border-dashed border-black/10 dark:border-white/10`}
          >
            <div className="w-24 h-24 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-8 relative group">
              <div className="absolute inset-0 bg-[#c1ff72]/10 blur-2xl group-hover:bg-[#c1ff72]/20 rounded-full transition-colors" />
              <Sparkles size={40} className="text-[#c1ff72] relative z-10" />
            </div>
            <div className="text-center space-y-3 max-w-sm">
              <h3 className={`${t.text.heading} text-2xl font-black tracking-tight`}>
                {emptyMessage}
              </h3>
              <p className={`${t.text.body} text-sm font-medium opacity-50`}>
                The discovery matrix yielded no results for the current query. Try adjusting your parameters or sector filters.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {billers.map((biller, index) => (
              <motion.div
                key={biller._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BillerCard
                  biller={biller}
                  onClick={onBillerClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sophisticated Footer Accent */}
      {(billers?.length || 0) > 0 && (
         <div className="flex items-center justify-center pt-10">
            <div className={`px-6 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center gap-3`}>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${t.text.muted} opacity-60`}>EndOfTransmission</span>
            </div>
         </div>
      )}
    </div>
  );
};

export default BillerGrid;