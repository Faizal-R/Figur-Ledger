"use client";
import {
  X,
  CreditCard,
  Landmark,
  Hash,
  BadgeDollarSign,
  Info,
} from "lucide-react";
import { IAccount, KYCData } from "@/types/user-account";
import { KYCPreview } from "@/components/features/customer/account/KYCPreview";
import { formatCurrency, formatDate } from "@/utils/formats";

interface ViewAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: IAccount | null;
  kycData: KYCData;
}

export function ViewAccountModal({
  isOpen,
  onClose,
  account,
  kycData,
}: ViewAccountModalProps) {
  if (!isOpen || !account) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#1a2536] rounded-2xl shadow-2xl shadow-black/50 border border-slate-800/70 animate-scaleIn ">
        {/* HEADER */}
        <div className="sticky top-0  z-50 flex items-center justify-between p-6 bg-[#1a2536] border-b border-slate-800/70">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Account Overview
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Detailed breakdown of your account
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* BODY */}

        <div className="p-6 space-y-10">
          {/* RESPONSIVE SPLIT – FULL WIDTH ON MOBILE */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
            {/* LEFT BLOCK */}
            <div className="w-full lg:w-1/2">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-emerald-400/10 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  {account.nickname || "—"}
                </h3>
                <p className="text-sm text-slate-400 capitalize">
                  {account.type} Account
                </p>

                <div className="mt-4">
                  <p className="text-xs text-slate-400 mb-1">Current Balance</p>
                  <p className="text-4xl font-bold text-white drop-shadow-sm">
                    {formatCurrency(account.balance, account.currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT BLOCK */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" /> Account
                Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                  label="Account Number"
                  value={account.accountNumber as string}
                  icon={Hash}
                  
                />
                <InfoCard
                  label="IFSC Code"
                  value={account.ifsc as string}
                  icon={Landmark}
                />
                <InfoCard label="Status" value={account.status} icon={Info} />
                <InfoCard
                  label="Currency"
                  value={account.currency}
                  icon={BadgeDollarSign}
                />
              </div>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="pt-6 border-t border-slate-700/60">
            <h3 className="text-sm font-semibold text-white mb-4">Timeline</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TimelineRow
                label="Created"
                value={formatDate(new Date(account.createdAt))}
              />
              <TimelineRow
                label="Updated"
                value={formatDate(new Date(account.updatedAt))}
              />
            </div>
          </div>

          {/* KYC */}
          <div className="pt-6 border-t border-slate-700/60">
            <KYCPreview kycData={kycData} />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-800/60 bg-[#19212e] rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="p-4 bg-[#0f1721] rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className="text-xs font-medium text-white break-all">{value}</p>
    </div>
  );
}

function TimelineRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-[#0f1721] rounded-xl border border-slate-700/70">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}
