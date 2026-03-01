"use client";
import { useState, useEffect } from 'react';
import { X, Wallet, Building2, Briefcase, TrendingUp, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { AccountType, CreateAccountFormData, KYCData } from '@/types/user-account';
import { KYCPreview } from '@/components/features/customer/account/KYCPreview';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (accountData: {
    nickname: string,
    type: string;
    currency: string;
  }) => void;
  kycData: KYCData;
}

const ACCOUNT_TYPES: { value: AccountType; label: string; description: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { value: "savings", label: 'Savings Account', description: 'Earn interest on your savings', icon: TrendingUp },
  { value: 'salary', label: 'Salary Account', description: 'Perfect for monthly payroll', icon: Wallet },
  { value: 'business', label: 'Business Account', description: 'For corporate and trade needs', icon: Building2 },
  { value: 'current', label: 'Current Account', description: 'No-limit transactional account', icon: Briefcase },
];

export function CreateAccountModal({
  isOpen,
  onClose,
  onSuccess,
  kycData,
}: CreateAccountModalProps) {
  const { theme: t, mode } = useTheme();
  const [formData, setFormData] = useState<CreateAccountFormData>({
    type: '',
    nickname: '',
    currency: 'INR',
    termsAccepted: false,
    detailsConfirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.type) newErrors.type = 'Please select an account type';
    if (!formData.detailsConfirmed) newErrors.detailsConfirmed = 'Please confirm your details';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Please accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess({
        nickname: formData.nickname,
        type: formData.type,
        currency: formData.currency,
      });
      setFormData({ type: '', nickname: '', currency: 'INR', termsAccepted: false, detailsConfirmed: false });
      setErrors({});
    } catch {
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.type && formData.termsAccepted && formData.detailsConfirmed && kycData.isComplete;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "relative w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl",
          t.card.base,
          t.radius.lg
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/5">
           <div>
              <h3 className={cn("text-lg font-bold", t.text.heading)}>Open New Account</h3>
              <p className={cn("text-xs font-medium opacity-50", t.text.muted)}>Select an account type to get started</p>
           </div>
           <button
             onClick={onClose}
             disabled={isSubmitting}
             className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400"
           >
             <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          {/* Account Type */}
          <div className="space-y-4">
            <label className={cn("text-xs font-bold uppercase tracking-wider opacity-60", t.text.muted)}>Select Account Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACCOUNT_TYPES.map((type) => {
                const isActive = formData.type === type.value;
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    className={cn(
                      "relative flex flex-col gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                      isActive
                        ? mode === 'dark' ? "bg-[#c1ff72]/10 border-[#c1ff72]" : "bg-slate-900 border-transparent shadow-lg text-white"
                        : "bg-slate-50 dark:bg-white/2 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                    )}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={isActive}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as AccountType })}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                       <div className={cn(
                         "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                         isActive ? "bg-[#c1ff72] text-[#0a1a15]" : "bg-white dark:bg-white/5 text-slate-500"
                       )}>
                          <Icon size={18} />
                       </div>
                       {isActive && <CheckCircle2 size={16} className={mode === 'dark' ? "text-[#0a1a15]" : "text-white"} />}
                    </div>
                    <div>
                       <p className={cn(
                         "text-sm font-bold transition-colors",
                         isActive ? (mode === 'dark' ? "text-[#0a1a15]" : "text-white") : t.text.heading
                       )}>{type.label}</p>
                       <p className={cn("text-[10px] font-medium opacity-40", isActive && !mode ? "text-white/60" : t.text.muted)}>{type.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Nickname */}
          <div className="space-y-4">
            <label className={cn("text-xs font-bold uppercase tracking-wider opacity-60", t.text.muted)}>Account Nickname (Optional)</label>
            <input
              id="nickname"
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              disabled={isSubmitting}
              maxLength={30}
              placeholder="e.g. My Savings"
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/10 outline-none transition-all text-sm font-medium",
                t.text.heading,
                "focus:border-[#4caf50]"
              )}
            />
          </div>

          {/* Verification */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/5">
            <label className={cn("text-xs font-bold uppercase tracking-wider opacity-60", t.text.muted)}>Identity Verification</label>
            <KYCPreview kycData={kycData} />
          </div>

          {/* Agreements */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/5">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.detailsConfirmed}
                onChange={(e) => setFormData({ ...formData, detailsConfirmed: e.target.checked })}
                disabled={isSubmitting}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#4caf50] focus:ring-[#4caf50]"
              />
              <span className={cn("text-[11px] font-medium opacity-70", t.text.body)}>
                I confirm that my personal details are correct.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                disabled={isSubmitting}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#4caf50] focus:ring-[#4caf50]"
              />
              <span className={cn("text-[11px] font-medium opacity-70", t.text.body)}>
                I agree to the <a href="#" className="text-green-600 font-bold hover:underline">Terms & Conditions</a>.
              </span>
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/2 flex gap-3">
           <button
             type="button"
             onClick={onClose}
             disabled={isSubmitting}
             className={cn(
               "flex-1 h-11 rounded-xl text-xs font-bold transition-all",
               mode === 'dark' ? "bg-white/5 text-white hover:bg-white/10" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
             )}
           >
             Cancel
           </button>
           <button
             onClick={handleSubmit}
             disabled={!isFormValid || isSubmitting}
             className={cn(
               "flex-[2_2_0%] h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm",
               mode === 'dark' 
                 ? "bg-[#c1ff72] text-[#0a1a15] disabled:opacity-30" 
                 : "bg-slate-900 text-white disabled:opacity-50"
             )}
           >
             {isSubmitting ? "Processing..." : "Create Account"}
             {!isSubmitting && <ArrowRight size={16} />}
           </button>
        </div>

        {/* Floating Errors */}
        <AnimatePresence>
           {Object.keys(errors).length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-red-500 text-white text-[10px] font-bold shadow-lg flex items-center gap-2 z-60"
              >
                 <AlertCircle size={14} />
                 {Object.values(errors)[0]}
              </motion.div>
           )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
