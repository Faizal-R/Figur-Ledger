import { AlertCircle } from 'lucide-react';
import { KYCData } from '@/types/user-account';

interface KYCPreviewProps {
  kycData: KYCData;
}

export function KYCPreview({ kycData }: KYCPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">KYC Information</h3>
        {!kycData.isComplete && (
          <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
            Incomplete
          </span>
        )}
      </div>

      {!kycData.isComplete && (
        <div
          className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-amber-400 font-medium">KYC Incomplete</p>
            <p className="text-xs text-slate-400 mt-1">
              Please complete your KYC verification before creating an account.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={kycData.fullName}
            disabled
            className="w-full px-3 py-2 bg-[#0f1721] border border-slate-700/50 rounded-lg text-slate-400 text-sm cursor-not-allowed"
            aria-label="Full Name"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Date of Birth
          </label>
          <input
            type="text"
            value={kycData.dateOfBirth}
            disabled
            className="w-full px-3 py-2 bg-[#0f1721] border border-slate-700/50 rounded-lg text-slate-400 text-sm cursor-not-allowed"
            aria-label="Date of Birth"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={kycData.email}
            disabled
            className="w-full px-3 py-2 bg-[#0f1721] border border-slate-700/50 rounded-lg text-slate-400 text-sm cursor-not-allowed"
            aria-label="Email Address"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={kycData.phoneNumber}
            disabled
            className="w-full px-3 py-2 bg-[#0f1721] border border-slate-700/50 rounded-lg text-slate-400 text-sm cursor-not-allowed"
            aria-label="Phone Number"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Address
          </label>
          <textarea
            value={kycData.address}
            disabled
            rows={2}
            className="w-full px-3 py-2 bg-[#0f1721] border border-slate-700/50 rounded-lg text-slate-400 text-sm cursor-not-allowed resize-none"
            aria-label="Address"
          />
        </div>
      </div>
    </div>
  );
}
