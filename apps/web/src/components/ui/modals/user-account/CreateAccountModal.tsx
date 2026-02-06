import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AccountType, CreateAccountFormData, KYCData } from '@/types/user-account';
import { KYCPreview } from '@/components/features/customer/account/KYCPreview';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (accountData: {
   nickname:string,
    type: string;
    currency:string;
  }) => void;
  kycData: KYCData;
}

const ACCOUNT_TYPES: { value: AccountType; label: string; description: string }[] = [
  { value: "savings", label: 'Savings Account', description: 'Earn interest on your deposits' },
  { value: 'salary', label: 'Salary Account', description: 'Zero balance salary account' },
  { value: 'business', label: 'Business Account', description: 'Manage business finances' },
  { value: 'current', label: 'Current/Checking Account', description: 'High transaction volume' },
];

export function CreateAccountModal({
  isOpen,
  onClose,
  onSuccess,
  kycData,
}: CreateAccountModalProps) {
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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSubmitting, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) {
      newErrors.type = 'Please select an account type';
    }

    if (formData.nickname && formData.nickname.length > 30) {
      newErrors.nickname = 'Nickname must be 30 characters or less';
    }

    if (!formData.detailsConfirmed) {
      newErrors.detailsConfirmed = 'Please confirm your details are accurate';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Please accept the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {

      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const accountTypeLabel =
        ACCOUNT_TYPES.find((t) => t.value === formData.type)?.value || '';

      onSuccess({
        nickname:formData.nickname,
        type: accountTypeLabel,
        currency: formData.currency,
      });

      setFormData({
        type: '',
        nickname: '',
        currency: 'INR',
        termsAccepted: false,
        detailsConfirmed: false,
      });
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.type &&
    formData.nickname.trim().length <= 30 &&
    formData.termsAccepted &&
    formData.detailsConfirmed &&
    kycData.isComplete;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#18212f] rounded-2xl shadow-2xl shadow-black/50 animate-scaleIn">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#18212f] border-b border-slate-700">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold text-white">
              Create New Bank Account
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Set up your new account in just a few steps
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Account Preferences</h3>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Account Type <span className="text-emerald-400">*</span>
              </label>
              <div className="space-y-2">
                {ACCOUNT_TYPES.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.type === type.value
                        ? 'bg-emerald-500/10 border-emerald-500'
                        : 'bg-[#0f1721] border-slate-700 hover:border-slate-600'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as AccountType })
                      }
                      disabled={isSubmitting}
                      className="mt-1 w-4 h-4 text-emerald-500 border-slate-600 focus:ring-emerald-500"
                      aria-describedby={`${type.value}-description`}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{type.label}</div>
                      <div
                        id={`${type.value}-description`}
                        className="text-xs text-slate-400 mt-1"
                      >
                        {type.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.type && (
                <p className="text-xs text-red-400 mt-2" role="alert">
                  {errors.type}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-slate-300 mb-2">
                Account Nickname <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                disabled={isSubmitting}
                maxLength={30}
                placeholder="e.g. Salary Saver, Personal Wallet, Business Account"
                className="w-full px-4 py-2.5 bg-[#18212f] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby="nickname-help"
              />
              <div className="flex items-center justify-between mt-1">
                <p id="nickname-help" className="text-xs text-slate-500">
                  Give your account a memorable name
                </p>
                <span className="text-xs text-slate-500">
                  {formData.nickname.length}/30
                </span>
              </div>
              {errors.nickname && (
                <p className="text-xs text-red-400 mt-1" role="alert">
                  {errors.nickname}
                </p>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700">
            <KYCPreview kycData={kycData} />
          </div>

          <div className="pt-6 border-t border-slate-700 space-y-3">
            <h3 className="text-sm font-semibold text-white mb-3">Agreements</h3>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.detailsConfirmed}
                onChange={(e) =>
                  setFormData({ ...formData, detailsConfirmed: e.target.checked })
                }
                disabled={isSubmitting || !kycData.isComplete}
                className="mt-1 w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby="details-confirmed-label"
              />
              <span
                id="details-confirmed-label"
                className="text-sm text-slate-300 group-hover:text-white transition-colors"
              >
                I confirm that all the details provided above are accurate and up-to-date
              </span>
            </label>
            {errors.detailsConfirmed && (
              <p className="text-xs text-red-400 ml-7" role="alert">
                {errors.detailsConfirmed}
              </p>
            )}

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                disabled={isSubmitting || !kycData.isComplete}
                className="mt-1 w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby="terms-label"
              />
              <span
                id="terms-label"
                className="text-sm text-slate-300 group-hover:text-white transition-colors"
              >
                I accept the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms & Conditions
                </a>
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-xs text-red-400 ml-7" role="alert">
                {errors.termsAccepted}
              </p>
            )}
          </div>

          {errors.submit && (
            <div
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400"
              role="alert"
            >
              {errors.submit}
            </div>
          )}

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label={isSubmitting ? 'Creating account...' : 'Create account'}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
