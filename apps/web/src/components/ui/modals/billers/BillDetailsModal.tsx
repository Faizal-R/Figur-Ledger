import React, { useState, useEffect } from "react";
import {
  X,
  Zap,
  Droplets,
  Wifi,
  Smartphone,
  Tv,
  Flame,
  Download,
  Bell,
  Calendar,
  CreditCard,
  CheckCircle,
  Receipt,
  Sparkles,
  Shield,
  Banknote,
} from "lucide-react";
import { FinledgerTheme } from "@/theme";
import { ISavedBiller } from "@/types/IBill";
import { IAccount } from "@/types/user-account";

interface BillDetailsModalProps {
  isOpen: boolean;
  biller: ISavedBiller | null;
  onClose: () => void;
  onPayNow: (
    biller: ISavedBiller,
    amount: number,
    accountId: string,
    billDetails: any
  ) => void;
  accounts: IAccount[];
  billDetails?: any;
}

const BillDetailsModal: React.FC<BillDetailsModalProps> = ({
  isOpen,
  biller,
  onClose,
  onPayNow,
  accounts,
  billDetails,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string>("");

  // FIX: set first account automatically
  useEffect(() => {
    if (accounts?.length) {
      setSelectedAccount(accounts[0]?.id!);
    }
  }, [accounts]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ELECTRICITY":
        return <Zap size={24} className="text-yellow-400" />;
      case "WATER":
        return <Droplets size={24} className="text-blue-400" />;
      case "INTERNET":
        return <Wifi size={24} className="text-pink-400" />;
      case "MOBILE":
        return <Smartphone size={24} className="text-purple-400" />;
      case "CABLE":
        return <Tv size={24} className="text-green-400" />;
      case "GAS":
        return <Flame size={24} className="text-orange-400" />;
      default:
        return <Receipt size={24} className="text-emerald-400" />;
    }
  };

  if (!isOpen || !biller) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-purple-500/10 to-transparent blur-2xl opacity-30" />

        <div
          className={`relative ${FinledgerTheme.card} ${FinledgerTheme.border} rounded-2xl overflow-hidden`}
        >
          {/* HEADER */}
          <div className="p-3 bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent border-b border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-md flex items-center justify-center">
                  {getCategoryIcon(biller.category)}
                </div>

                <div>
                  <h2 className="text-base font-semibold text-white leading-tight">
                    {biller.alias}
                  </h2>
                  <p className="text-slate-400 text-xs">
                    ID • {biller.consumerId}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* STATS */}
            <div className="flex gap-2 mt-3">
              <div className="flex-1 bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700">
                <p className="text-[10px] text-slate-400">Amount Due</p>
                <p className="text-sm font-semibold text-emerald-400">
                  ₹{billDetails?.totalAmount || "0.00"}
                </p>
              </div>

              <div className="flex-1 bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700">
                <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                  <Calendar size={12} />
                  <span>Due Date</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {billDetails?.dueDate}
                </p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* LEFT */}
              <div className="space-y-5">
                <div className={`${FinledgerTheme.card} border border-slate-700 rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`${FinledgerTheme.text.primary} font-bold flex items-center gap-2`}>
                      <Receipt size={18} />
                      Bill Breakdown
                    </h3>
                    <span className="px-2 py-1 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded text-xs text-emerald-400">
                      {billDetails?.billNumber}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {(billDetails?.breakdown || []).map(
                      (item: { description: string; amount: number }, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <span className={`${FinledgerTheme.text.secondary} text-sm`}>
                            {item.description}
                          </span>
                          <span
                            className={`font-medium ${
                              item.amount >= 0
                                ? FinledgerTheme.text.primary
                                : "text-emerald-400"
                            }`}
                          >
                            {item.amount >= 0 ? "₹" : "-₹"}
                            {Math.abs(item.amount)}
                          </span>
                        </div>
                      )
                    )}

                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <div className="flex justify-between items-center">
                        <span className={`${FinledgerTheme.text.primary} font-bold`}>
                          Total Payable
                        </span>
                        <span className="text-2xl font-bold text-emerald-400">
                          ₹{billDetails?.totalAmount || "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className={`${FinledgerTheme.button.secondary} flex-1 py-2.5 flex items-center justify-center gap-2 text-sm`}>
                    <Download size={14} />
                    Download
                  </button>
                  <button className={`${FinledgerTheme.button.secondary} px-3 py-2.5 flex items-center justify-center`}>
                    <Bell size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                  <Shield size={12} />
                  <span>Secure payment powered by FinLedger</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-3">
                <div className={`${FinledgerTheme.card} border border-slate-700 rounded-xl p-4`}>
                  <h3 className={`${FinledgerTheme.text.primary} font-bold mb-3 flex items-center gap-2`}>
                    <CreditCard size={18} />
                    Select Account
                  </h3>

                  <div className="space-y-2">
                    {accounts.map((account) => (
                      <div
                        key={account.id}
                        onClick={() => setSelectedAccount(account.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedAccount === account.id
                            ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-emerald-500/40"
                            : "border-slate-700 hover:border-emerald-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                              <Banknote size={14} className="text-white" />
                            </div>
                            <div>
                              <p className={`${FinledgerTheme.text.primary} font-medium text-sm`}>
                                {account.nickname}
                              </p>
                              <p className={`${FinledgerTheme.text.secondary} text-xs`}>
                                Balance: ₹{account.balance.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {selectedAccount === account.id && (
                            <CheckCircle size={16} className="text-emerald-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PAYMENT SUMMARY */}
                <div className={`${FinledgerTheme.card} border border-slate-700 rounded-xl p-4 bg-gradient-to-br from-emerald-500/5 to-teal-500/5`}>
                  <h3 className={`${FinledgerTheme.text.primary} font-bold mb-4`}>
                    Payment Summary
                  </h3>

                  <button
                    onClick={() =>
                      onPayNow(
                        biller,
                        billDetails?.totalAmount || 0,
                        selectedAccount,
                        billDetails
                      )
                    }
                    className={`${FinledgerTheme.button.primary} w-full py-3.5 font-bold flex items-center justify-center gap-2`}
                  >
                    <Sparkles size={16} />
                    Pay ₹{billDetails?.totalAmount || "0.00"} Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetailsModal;
