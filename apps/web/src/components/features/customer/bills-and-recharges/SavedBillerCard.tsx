import { ArrowRight, Zap, Droplets, Wifi, Smartphone, Tv, Flame, Receipt, Sparkles, ChevronRight, CreditCard } from "lucide-react";
import { FinledgerTheme } from "@/theme";
import { ISavedBiller } from "@/types/IBill";

interface Props {
  biller: ISavedBiller;
  onOpen: (biller: ISavedBiller) => void;
}

const SavedBillerCard: React.FC<Props> = ({ biller, onOpen }) => {
  const getCategoryIcon = () => {
    switch(biller.category) {
      case 'ELECTRICITY': return <Zap size={22} className="text-yellow-400" />;
      case 'WATER': return <Droplets size={22} className="text-blue-400" />;
      case 'INTERNET': return <Wifi size={22} className="text-pink-400" />;
      case 'MOBILE': return <Smartphone size={22} className="text-purple-400" />;
      case 'CABLE': return <Tv size={22} className="text-green-400" />;
      case 'GAS': return <Flame size={22} className="text-orange-400" />;
      default: return <Receipt size={22} className="text-emerald-400" />;
    }
  };

  const getCategoryGradient = () => {
    switch(biller.category) {
      case 'ELECTRICITY': return "from-yellow-500/20 via-yellow-500/10 to-transparent";
      case 'WATER': return "from-blue-500/20 via-cyan-500/10 to-transparent";
      case 'INTERNET': return "from-pink-500/20 via-rose-500/10 to-transparent";
      case 'MOBILE': return "from-purple-500/20 via-violet-500/10 to-transparent";
      case 'CABLE': return "from-green-500/20 via-emerald-500/10 to-transparent";
      case 'GAS': return "from-orange-500/20 via-amber-500/10 to-transparent";
      default: return "from-emerald-500/20 via-teal-500/10 to-transparent";
    }
  };

  const getCategoryColor = () => {
    switch(biller.category) {
      case 'ELECTRICITY': return "bg-gradient-to-br from-yellow-500 to-orange-500";
      case 'WATER': return "bg-gradient-to-br from-cyan-500 to-blue-500";
      case 'INTERNET': return "bg-gradient-to-br from-pink-500 to-rose-500";
      case 'MOBILE': return "bg-gradient-to-br from-purple-500 to-indigo-500";
      case 'CABLE': return "bg-gradient-to-br from-green-500 to-emerald-500";
      case 'GAS': return "bg-gradient-to-br from-orange-500 to-amber-500";
      default: return "bg-gradient-to-br from-emerald-500 to-teal-500";
    }
  };

  const getCategoryName = () => {
    switch(biller.category) {
      case 'ELECTRICITY': return "Electricity";
      case 'WATER': return "Water";
      case 'INTERNET': return "Internet";
      case 'MOBILE': return "Mobile";
      case 'CABLE': return "Cable TV";
      case 'GAS': return "Gas";
      default: return "Utility";
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border
        transition-all duration-500 hover:scale-[1.02] hover:shadow-xl
        group cursor-pointer
        ${FinledgerTheme.card} ${FinledgerTheme.border}
        hover:border-emerald-500/40 hover:shadow-emerald-500/20
      `}
      onClick={() => onOpen(biller)}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient()} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:via-emerald-500/5 group-hover:to-emerald-500/10 blur-xl transition-all duration-500" />

      <div className="relative z-10 p-5">
        {/* Header with Icon and Info */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Icon Container with Glow */}
            <div className={`relative ${getCategoryColor()} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
              {getCategoryIcon()}
            </div>
            
            <div>
              <h4 className={`${FinledgerTheme.text.primary} font-bold text-lg group-hover:text-white transition-colors duration-300`}>
                {biller.alias}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`${FinledgerTheme.text.secondary} text-xs font-mono bg-slate-800/50 px-2 py-1 rounded`}>
                  {biller.consumerId.slice(0, 8)}...
                </span>
                <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor()}/10 text-emerald-400 border border-emerald-500/20`}>
                  {getCategoryName()}
                </span>
              </div>
            </div>
          </div>

          {/* Arrow Indicator */}
          <div className="p-2 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 group-hover:from-emerald-500/10 group-hover:to-emerald-500/5 group-hover:border-emerald-500/30 transition-all duration-300">
            <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6 group-hover:via-emerald-500/30 transition-all duration-300" />

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <CreditCard size={16} className="text-emerald-400" />
            </div>
            <span className={`${FinledgerTheme.text.primary} text-sm font-medium`}>
              View Bill Details
            </span>
          </div>
          
          <button
            className={`
              ${FinledgerTheme.button.primary}
              px-4 py-2.5 rounded-lg flex items-center gap-2
              transform group-hover:scale-105 transition-all duration-300
            `}
          >
            <Sparkles size={14} />
            Open
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Subtle Footer */}
        <div className="mt-6 pt-4 border-t border-slate-700/50 group-hover:border-emerald-500/20 transition-all duration-300">
          <p className={`${FinledgerTheme.text.secondary} text-xs text-center`}>
            Click to view payment history and bill details
          </p>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-emerald-500/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-emerald-500/30 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default SavedBillerCard;