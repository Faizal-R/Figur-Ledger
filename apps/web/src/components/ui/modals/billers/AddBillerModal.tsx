"use client";
import React, { useState } from 'react';
import { 
  PlusCircle, X, Zap, Droplets, Wifi, Smartphone, Tv, Fuel, Home, 
  Terminal, ShieldCheck, Activity
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { IBiller } from '@/types/IBill';
import { motion, AnimatePresence } from 'framer-motion';

interface AddBillerModalProps {
  isOpen: boolean;
  selectedBiller: IBiller | null;
  onClose: () => void;
  onAddBiller: (consumerId: string, alias?: string) => void;
}

const AddBillerModal: React.FC<AddBillerModalProps> = ({
  isOpen,
  selectedBiller,
  onClose,
  onAddBiller
}) => {
  const { theme: t } = useTheme();
  const [consumerId, setConsumerId] = useState('');
  const [alias, setAlias] = useState('');

  if (!isOpen || !selectedBiller) return null;

  const handleSubmit = () => {
    if (!consumerId.trim()) {
      return;
    }
    onAddBiller(consumerId, alias || undefined);
    setConsumerId('');
    setAlias('');
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'ELECTRICITY': return <Zap size={24} />;
      case 'WATER': return <Droplets size={24} />;
      case 'INTERNET': return <Wifi size={24} />;
      case 'MOBILE': return <Smartphone size={24} />;
      case 'CABLE': return <Tv size={24} />;
      case 'GAS': return <Fuel size={24} />;
      default: return <Home size={24} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-sm ${t.card.base} ${t.radius.md} border border-white/10 shadow-2xl overflow-hidden`}
          >
            {/* Header Signal */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-[#c1ff72] to-transparent opacity-30" />
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-2 h-2 rounded-full bg-[#c1ff72] animate-pulse" />
                     <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${t.text.muted}`}>Add New Biller</span>
                  </div>
                  <h3 className={`text-2xl font-black tracking-tighter ${t.text.display}`}>Link Biller</h3>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${t.text.muted} hover:text-white transition-colors`}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Biller Profile Card */}
              <div className={`p-6 ${t.card.base} bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl flex items-center gap-6 group`}>
                 <div className={`w-16 h-16 rounded-2xl bg-[#0a1a15] dark:bg-[#c1ff72] text-[#c1ff72] dark:text-[#0a1a15] flex items-center justify-center shadow-xl transition-transform group-hover:rotate-6`}>
                    {getCategoryIcon(selectedBiller.category)}
                 </div>
                 <div className="space-y-1">
                    <h4 className={`text-xl font-black tracking-tight ${t.text.heading}`}>{selectedBiller.name}</h4>
                    <div className="flex items-center gap-2">
                       <span className={`text-[9px] font-black uppercase tracking-widest text-[#c1ff72]`}>{selectedBiller.category}</span>
                       <div className="w-1 h-1 rounded-full bg-slate-500 opacity-20" />
                       <ShieldCheck size={12} className={`${t.text.muted} opacity-40`} />
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                {/* Form Matrix */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>
                      Consumer ID / Account Number
                    </label>
                    <div className="relative group">
                      <Terminal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c1ff72] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                      <input
                        type="text"
                        placeholder="ENTER ACCESS KEY"
                        value={consumerId}
                        onChange={(e) => setConsumerId(e.target.value)}
                        className={`
                          w-full h-14 pl-12 pr-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
                          focus:border-[#c1ff72]/30 focus:bg-white dark:focus:bg-black/20 outline-none
                          text-sm font-black tracking-widest ${t.text.heading}
                          rounded-2xl transition-all duration-500 placeholder:text-slate-500/30
                        `}
                      />
                    </div>
                    <p className={`text-[9px] font-bold ${t.text.muted} ml-1 opacity-50`}>
                      Validation Matrix: {selectedBiller.validationPattern}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>
                      Biller Nickname (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="E.G. MY HOME BILL"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                      className={`
                        w-full h-12 px-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
                        focus:border-[#c1ff72]/30 focus:bg-white dark:focus:bg-black/20 outline-none
                        text-sm font-black tracking-widest ${t.text.heading}
                        rounded-2xl transition-all duration-500 placeholder:text-slate-500/30
                      `}
                    />
                  </div>
                </div>

                {/* Action Matrix */}
                 <div className="flex flex-col gap-4 pt-4">
                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={handleSubmit}
                     className={`h-12 bg-[#0a1a15] dark:bg-[#c1ff72] text-[#c1ff72] dark:text-[#0a1a15] rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl transition-all`}
                   >
                     <PlusCircle size={20} />
                     <span>Add Biller</span>
                   </motion.button>
                   <div className="flex justify-center items-center gap-3">
                      <Activity size={12} className="text-[#c1ff72] opacity-40" />
                      <span className={`text-[9px] font-black uppercase tracking-widest ${t.text.muted} opacity-40`}>
                        Your data is encrypted and secure
                      </span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddBillerModal;