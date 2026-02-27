"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  Search,
  Filter,
  Activity,
  ChevronRight,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import TransactionViewModal from "./TransactionModal";
import { useTransactionHistory } from "@/hooks/api/useTransaction";
import Pagination from "@/components/ui/pagination";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";
type SortBy = "DATE_DESC" | "DATE_ASC" | "AMOUNT_DESC" | "AMOUNT_ASC";

interface Transaction {
  id: string;
  referenceId: string;
  senderAccountId: string | null;
  receiverAccountId: string | null;
  amount: number;
  currency: string;
  status: TransactionStatus;
  type: TransactionType;
  createdAt: string;
}

const TABS: { label: string; value: "ALL" | TransactionType }[] = [
  { label: "All", value: "ALL" },
  { label: "Deposits", value: "DEPOSIT" },
  { label: "Transfers", value: "TRANSFER" },
  { label: "Withdrawals", value: "WITHDRAW" },
];

export interface ITransactionFilters {
  startDate: string;
  endDate: string;
  minAmount: string;
  maxAmount: string;
  status: "ALL" | TransactionStatus;
  sortBy: SortBy;
}
export default function TransactionTable({ accountId }: { accountId: string }) {


  const [filters, setFilters] = useState<ITransactionFilters>({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    status: "ALL",
    sortBy: "DATE_DESC",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { theme: t, mode } = useTheme();
  const { data, isLoading } = useTransactionHistory(
    accountId || "",
    currentPage,
    filters,
  );
  console.log("triggered",data?.data.totalPages)

  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ALL" | TransactionType>("ALL");

  // New Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const transactions = data?.data.transactions || [];

  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
      status: "ALL",
      sortBy: "DATE_DESC",
    });
    setSearchQuery("");
  };

  if (isLoading) return <Skeleton mode={mode} />;

  return (
    <div className="space-y-6 pb-20">
      {/* Filters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const active = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all",
                  active
                    ? mode === "dark"
                      ? "bg-[#c1ff72] text-[#0a1a15] shadow-sm"
                      : "bg-[#4caf50] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/5",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "relative flex-1 md:flex-none",
              mode === "dark" ? "text-white" : "text-slate-900",
            )}
          >
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
            />
            <input
              type="text"
              placeholder="Search tx ID or Ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "h-10 pl-9 pr-4 rounded-xl border text-xs font-medium w-full md:w-48 outline-none transition-all focus:ring-1 focus:ring-[#4caf50]/20",
                mode === "dark"
                  ? "bg-white/5 border-white/5 focus:border-[#c1ff72]"
                  : "bg-white border-slate-200 focus:border-[#4caf50]",
              )}
            />
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={cn(
              "h-10 px-4 rounded-xl border flex items-center gap-2 text-[11px] font-bold transition-all",
              showAdvanced
                ? mode === "dark"
                  ? "bg-[#c1ff72] border-[#c1ff72] text-[#0a1a15]"
                  : "bg-[#4caf50] border-[#4caf50] text-white"
                : mode === "dark"
                  ? "bg-white/5 border-white/5 text-white hover:bg-white/10"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
            )}
          >
            <Filter size={14} />
            Filters
            {(filters.startDate ||
              filters.endDate ||
              filters.minAmount ||
              filters.maxAmount ||
              filters.status !== "ALL" ||
              searchQuery) && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "p-6 rounded-[2rem] border border-dashed mb-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-start",
                mode === "dark"
                  ? "bg-white/2 border-white/10 text-green-100"
                  : "bg-slate-50/50 border-slate-200",
              )}
            >
              <div className="space-y-3 md:col-span-4">
                <div className="flex items-center gap-2 ml-1">
                  <Calendar size={12} className="opacity-40" />
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Date Range
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative group">
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) =>
                        setFilters({ ...filters, startDate: e.target.value })
                      }
                      style={{ colorScheme: mode }}
                      className={cn(
                        "w-full h-11 px-3 rounded-2xl text-[11px] font-bold border outline-none transition-all accent-[#4caf50] dark:accent-[#c1ff72]",
                        mode === "dark"
                          ? "bg-black/40 border-white/5 text-white focus:border-[#c1ff72] focus:ring-4 focus:ring-[#c1ff72]/10"
                          : "bg-white border-slate-200 text-slate-700 focus:border-[#4caf50] focus:ring-4 focus:ring-[#4caf50]/10",
                      )}
                      onFocus={(e) =>
                        (e.target as HTMLInputElement).showPicker?.()
                      }
                      onClick={(e) =>
                        (e.target as HTMLInputElement).showPicker?.()
                      }
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) =>
                        setFilters({ ...filters, endDate: e.target.value })
                      }
                      style={{ colorScheme: mode }}
                      className={cn(
                        "w-full h-11 px-3 rounded-2xl text-[11px] font-bold border outline-none transition-all accent-[#4caf50] dark:accent-[#c1ff72]",
                        mode === "dark"
                          ? "bg-black/40 border-white/5 text-white focus:border-[#c1ff72] focus:ring-4 focus:ring-[#c1ff72]/10"
                          : "bg-white border-slate-200 text-slate-700 focus:border-[#4caf50] focus:ring-4 focus:ring-[#4caf50]/10",
                      )}
                      onFocus={(e) =>
                        (e.target as HTMLInputElement).showPicker?.()
                      }
                      onClick={(e) =>
                        (e.target as HTMLInputElement).showPicker?.()
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:col-span-3">
                <div className="flex items-center gap-2 ml-1">
                  <Activity size={12} className="opacity-40" />
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Amount (₹)
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAmount}
                    onChange={(e) =>
                      setFilters({ ...filters, minAmount: e.target.value })
                    }
                    className={cn(
                      "h-11 px-4 rounded-2xl text-[11px] font-bold border outline-none transition-all",
                      mode === "dark"
                        ? "bg-black/40 border-white/5 text-white placeholder:text-white/20 focus:border-[#c1ff72] focus:ring-4 focus:ring-[#c1ff72]/10"
                        : "bg-white border-slate-200 text-slate-700 focus:border-[#4caf50] focus:ring-4 focus:ring-[#4caf50]/10",
                    )}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAmount}
                    onChange={(e) =>
                      setFilters({ ...filters, maxAmount: e.target.value })
                    }
                    className={cn(
                      "h-11 px-4 rounded-2xl text-[11px] font-bold border outline-none transition-all",
                      mode === "dark"
                        ? "bg-black/40 border-white/5 text-white placeholder:text-white/20 focus:border-[#c1ff72] focus:ring-4 focus:ring-[#c1ff72]/10"
                        : "bg-white border-slate-200 text-slate-700 focus:border-[#4caf50] focus:ring-4 focus:ring-[#4caf50]/10",
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center gap-2 ml-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Tx Status
                  </label>
                </div>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      status: e.target.value as "ALL" | TransactionStatus,
                    })
                  }
                  className={cn(
                    "w-full h-11 px-4 rounded-2xl text-[11px] font-bold border outline-none appearance-none cursor-pointer transition-all",
                    mode === "dark"
                      ? "bg-black/40 border-white/5 text-white focus:border-[#c1ff72] focus:ring-4 focus:ring-[#c1ff72]/10"
                      : "bg-white border-slate-200 text-slate-700 focus:border-[#4caf50] focus:ring-4 focus:ring-[#4caf50]/10",
                  )}
                >
                  <option value="ALL">All Status</option>
                  <option value="SUCCESS">Success Only</option>
                  <option value="PENDING">Pending Only</option>
                  <option value="FAILED">Failed Only</option>
                </select>
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center gap-2 ml-1">
                  <ArrowUpDown size={12} className="opacity-40" />
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Sort Order
                  </label>
                </div>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value as SortBy })
                  }
                  className={cn(
                    "w-full h-11 px-4 rounded-2xl text-[11px] font-bold border outline-none appearance-none cursor-pointer transition-all",
                    mode === "dark"
                      ? "bg-black/40 border-white/5 text-white focus:border-[#c1ff72] focus:ring-4 focus:ring-[#c1ff72]/10"
                      : "bg-white border-slate-200 text-slate-700 focus:border-[#4caf50] focus:ring-4 focus:ring-[#4caf50]/10",
                  )}
                >
                  <option value="DATE_DESC">Newest First</option>
                  <option value="DATE_ASC">Oldest First</option>
                  <option value="AMOUNT_DESC">Amount: High to Low</option>
                  <option value="AMOUNT_ASC">Amount: Low to High</option>
                </select>
              </div>

              <div className="flex items-end justify-center md:col-span-1 h-full">
                <button
                  onClick={resetFilters}
                  title="Reset all filters"
                  className={cn(
                    "w-11 h-11 rounded-2xl transition-all border flex items-center justify-center group",
                    mode === "dark"
                      ? "border-white/10 hover:bg-white/5 text-white/40 hover:text-red-400"
                      : "border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-red-500",
                  )}
                >
                  <RefreshCcw
                    size={16}
                    className="group-hover:rotate-180 transition-transform duration-500"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transactions List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {!transactions || transactions.length === 0 ? (
            <EmptyState mode={mode} />
          ) : (
            transactions.map((txn, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.01 }}
                key={txn.id}
                onClick={() => {
                  setSelectedTxn(txn);
                  setOpen(true);
                }}
                className={cn(
                  "group relative p-4 rounded-2xl border cursor-pointer transition-all hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-0.5",
                  t.card.base,
                  "hover:border-[#4caf50]",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                        txn.type === "WITHDRAW"
                          ? "bg-red-500/10 text-red-500"
                          : txn.type === "DEPOSIT"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-blue-500/10 text-blue-500",
                      )}
                    >
                      <Icon type={txn.type} />
                    </div>
                    <div>
                      <p
                        className={cn(
                          "text-sm font-bold tracking-tight",
                          t.text.heading,
                        )}
                      >
                        {txn.referenceId}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StatusIndicator status={txn.status} />
                        <span
                          className={cn(
                            "text-[9px] font-bold opacity-30 uppercase tracking-widest",
                            t.text.muted,
                          )}
                        >
                          {new Date(txn.createdAt).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p
                        className={cn(
                          "text-lg font-bold tracking-tight",
                          txn.type === "WITHDRAW"
                            ? "text-red-500"
                            : "text-green-600",
                        )}
                      >
                        {txn.type === "WITHDRAW" ? "-" : "+"}₹
                        {txn.amount.toLocaleString()}
                      </p>
                      <p
                        className={cn(
                          "text-[9px] font-bold opacity-30 uppercase tracking-widest",
                          t.text.muted,
                        )}
                      >
                        {txn.type}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-slate-300 group-hover:text-[#4caf50] transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {data?.data.totalPages && data.data.totalPages > 1 && (
        <div className="pt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPage={data.data.totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      <TransactionViewModal
        open={open}
        onClose={() => setOpen(false)}
        transaction={selectedTxn}
      />
    </div>
  );
}

function Icon({ type }: { type: TransactionType }) {
  const map = {
    DEPOSIT: <ArrowDownLeft size={18} />,
    WITHDRAW: <ArrowUpRight size={18} />,
    TRANSFER: <RefreshCcw size={18} />,
  };
  return map[type];
}

function StatusIndicator({ status }: { status: TransactionStatus }) {
  const colors = {
    SUCCESS: "text-green-600 bg-green-500/10",
    PENDING: "text-orange-500 bg-orange-500/10",
    FAILED: "text-red-500 bg-red-500/10",
  };
  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tight",
        colors[status],
      )}
    >
      {status}
    </span>
  );
}

function EmptyState({ mode }: { mode: string }) {
  return (
    <div
      className={cn(
        "p-12 text-center space-y-4 rounded-3xl border",
        mode === "dark"
          ? "bg-white/2 border-white/5"
          : "bg-white border-slate-100",
      )}
    >
      <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto opacity-50">
        <Activity className="text-slate-400" size={24} />
      </div>
      <p
        className={cn(
          "text-xs font-bold",
          mode === "dark" ? "text-slate-400" : "text-slate-500",
        )}
      >
        No transactions found
      </p>
    </div>
  );
}

function Skeleton({ mode }: { mode: string }) {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "p-5 rounded-2xl border animate-pulse",
            mode === "dark"
              ? "bg-white/2 border-white/5"
              : "bg-white border-slate-100",
          )}
        />
      ))}
    </div>
  );
}
