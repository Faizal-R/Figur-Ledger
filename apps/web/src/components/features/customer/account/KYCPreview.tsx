"use client";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { KYCData } from '@/types/user-account';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface KYCPreviewProps {
  kycData: KYCData;
}

export function KYCPreview({ kycData }: KYCPreviewProps) {
  const { theme: t, mode } = useTheme();

  return (
    <div className="space-y-4">
      {!kycData.isComplete ? (
        <div className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-orange-600">KYC Incomplete</p>
            <p className={cn("text-xs font-medium opacity-70 mt-1", t.text.body)}>
              Please complete your verification in profile settings before creating an account.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 w-fit">
           <CheckCircle2 size={14} className="text-green-600" />
           <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Identity Verified</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Full Name', val: kycData.fullName },
          { label: 'Date of Birth', val: kycData.dateOfBirth },
          { label: 'Email Address', val: kycData.email },
          { label: 'Phone Number', val: kycData.phoneNumber },
        ].map((item, idx) => (
          <div key={idx} className="space-y-1">
            <label className={cn("block text-[9px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>
              {item.label}
            </label>
            <div className={cn(
              "px-4 py-2 rounded-lg border text-sm font-medium",
              mode === 'dark' ? "bg-white/5 border-white/5 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700"
            )}>
              {item.val}
            </div>
          </div>
        ))}
        <div className="sm:col-span-2 space-y-1">
          <label className={cn("block text-[9px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>
            Registered Address
          </label>
          <div className={cn(
            "px-4 py-2 rounded-lg border text-sm font-medium min-h-[60px]",
            mode === 'dark' ? "bg-white/5 border-white/5 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700"
          )}>
            {kycData.address}
          </div>
        </div>
      </div>
    </div>
  );
}
