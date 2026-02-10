// components/bills-recharges/components/AddBillerModal.tsx
import React, { useState } from 'react';
import { Droplets, Fuel, Home, PlusCircle, Smartphone, Tv, Wifi, Zap } from 'lucide-react';
import { FinledgerTheme } from '@/theme';
import { IBiller } from '@/types/IBill';

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
  const [consumerId, setConsumerId] = useState('');
  const [alias, setAlias] = useState('');

  if (!isOpen || !selectedBiller) return null;

  const handleSubmit = () => {
    if (!consumerId.trim()) {
      alert('Please enter a consumer ID');
      return;
    }
    onAddBiller(consumerId, alias || undefined);
    setConsumerId('');
    setAlias('');
  };

    const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'ELECTRICITY': return <Zap color='#fff' size={20} />;
      case 'WATER': return <Droplets color='#fff'  size={20} />;
      case 'INTERNET': return <Wifi color='#fff' size={20} />;
      case 'MOBILE': return <Smartphone color='#fff' size={20} />;
      case 'CABLE': return <Tv size={20} />;
      case 'GAS': return <Fuel size={20} />;
      default: return <Home size={20} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.lg} w-full max-w-md`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`${FinledgerTheme.text.primary} text-xl font-bold`}>Add New Biller</h3>
              <p className={`${FinledgerTheme.text.secondary} text-sm`}>Enter your consumer details</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center text-xl`}>
              {getCategoryIcon(selectedBiller.category)}
            </div>
            <div>
              <h4 className={`${FinledgerTheme.text.primary} font-semibold`}>{selectedBiller.name}</h4>
              {/* <p className={`${FinledgerTheme.text.secondary} text-sm`}>{selectedBiller.description}</p> */}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`${FinledgerTheme.text.secondary} text-sm mb-2 block`}>
                Consumer ID
              </label>
              <input
                type="text"
                placeholder={"enter your consumer ID"}
                value={consumerId}
                onChange={(e) => setConsumerId(e.target.value)}
                className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} w-full ${FinledgerTheme.radius.md} px-4 py-3`}
              />
              <p className={`${FinledgerTheme.text.muted} text-xs mt-2`}>
                Format: {selectedBiller.validationPattern}
              </p>
            </div>

            <div>
              <label className={`${FinledgerTheme.text.secondary} text-sm mb-2 block`}>
                Alias (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Home Electricity"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} w-full ${FinledgerTheme.radius.md} px-4 py-3`}
              />
            </div>

            <button
              onClick={handleSubmit}
              className={`${FinledgerTheme.button.primary} w-full py-3 ${FinledgerTheme.radius.md} mt-6`}
            >
              <PlusCircle size={18} className="inline mr-2" />
              Add Biller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBillerModal;