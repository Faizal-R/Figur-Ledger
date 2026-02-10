// components/bills-recharges/components/BillerCard.tsx
import React from 'react';
import { ArrowRight, Zap, Droplets, Wifi, Smartphone, Tv, Fuel, Home } from 'lucide-react';
import { FinledgerTheme } from '@/theme';
import { IBiller } from '@/types/IBill';

interface BillerCardProps {
  biller: IBiller;
  onClick: (biller: IBiller) => void;
}

const BillerCard: React.FC<BillerCardProps> = ({ biller, onClick }) => {
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'ELECTRICITY': return <Zap size={20} />;
      case 'WATER': return <Droplets size={20} />;
      case 'INTERNET': return <Wifi size={20} />;
      case 'MOBILE': return <Smartphone size={20} />;
      case 'CABLE': return <Tv size={20} />;
      case 'GAS': return <Fuel size={20} />;
      default: return <Home size={20} />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch(category) {
      case 'ELECTRICITY': return 'from-yellow-500 to-orange-500';
      case 'WATER': return 'from-cyan-500 to-blue-500';
      case 'INTERNET': return 'from-pink-500 to-rose-500';
      case 'MOBILE': return 'from-purple-500 to-indigo-500';
      case 'CABLE': return 'from-green-500 to-emerald-500';
      case 'GAS': return 'from-orange-500 to-amber-500';
      default: return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <div
      onClick={() => onClick(biller)}
      className="group relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500" />
      
      {/* Main Card */}
      <div className={`relative ${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.lg} p-5 overflow-hidden transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-lg group-hover:shadow-emerald-500/20`}>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full -translate-y-12 translate-x-12" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(biller.category)} flex items-center justify-center shadow-lg`}>
                <div className="text-white">
                  {getCategoryIcon(biller.category)}
                </div>
              </div>
              <div>
                <h4 className={`${FinledgerTheme.text.primary} font-bold text-lg`}>{biller.name}</h4>
                {/* <p className={`${FinledgerTheme.text.secondary} text-xs`}>{biller.description}</p> */}
              </div>
            </div>
            <ArrowRight size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors transform group-hover:translate-x-1" />
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`${FinledgerTheme.text.secondary} text-sm`}>Category</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryGradient(biller.category)}/10 text-emerald-400 border border-emerald-500/20`}>
                {biller.category}
              </span>
            </div>
            
            {/* <div className="flex items-center justify-between">
              <span className={`${FinledgerTheme.text.secondary} text-sm`}>Avg. Bill</span>
              <div className="flex items-center gap-2">
                <span className={`${FinledgerTheme.text.primary} font-bold text-lg`}>₹{biller.averageBill}</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div> */}

            {/* Quick Action */}
            <div className="pt-3 border-t border-slate-700/50">
              <button className={`w-full py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300`}>
                Add to My Billers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillerCard;