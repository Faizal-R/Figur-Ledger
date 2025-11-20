import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountData: {
    accountNumber: string;
    ifsc: string;
    accountType: string;
  };
  onGoToDashboard: () => void;
  onManageAccount: () => void;
}

export function SuccessModal({
  isOpen,
  onClose,
  accountData,
  onGoToDashboard,
  onManageAccount,
}: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="relative w-full max-w-md bg-[#18212f] rounded-2xl shadow-2xl shadow-black/50 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <h2 id="success-modal-title" className="text-2xl font-bold text-white mb-2">
            Account Created Successfully!
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Your new bank account is ready to use
          </p>

          <div className="space-y-4 bg-[#0f1721] rounded-xl p-5 mb-6 text-left">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Account Number
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-semibold text-white tracking-wider">
                  {accountData.accountNumber}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">IFSC Code</label>
              <div className="text-sm font-mono text-slate-300">{accountData.ifsc}</div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Account Type</label>
              <div className="inline-flex px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/20">
                {accountData.accountType}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onGoToDashboard}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
            >
              Go to Dashboard
            </button>
            <button
              onClick={onManageAccount}
              className="w-full px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all"
            >
              Manage Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
