"use client";

import { useGetAllLoanEmis } from "@/hooks/api/useLoan";
import { FigurLedgerTheme } from "@/theme";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

type ScheduleStatus = "PAID" | "PENDING" | "OVERDUE";

interface RepaymentSchedule {
  scheduleNumber: number;
  dueDate: string;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  status: ScheduleStatus;
}

export default function LoanDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<RepaymentSchedule | null>(null);

  const { data, isLoading, error } = useGetAllLoanEmis(id);
  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading EMIs</div>;
  const schedules: RepaymentSchedule[] = [
    { scheduleNumber: 1, dueDate: "2025-01-05", principalAmount: 4200, interestAmount: 800, totalAmount: 5000, status: "PAID" },
    { scheduleNumber: 2, dueDate: "2025-02-05", principalAmount: 4300, interestAmount: 700, totalAmount: 5000, status: "PAID" },
    { scheduleNumber: 3, dueDate: "2025-03-05", principalAmount: 4400, interestAmount: 600, totalAmount: 5000, status: "PENDING" },
    { scheduleNumber: 4, dueDate: "2025-04-05", principalAmount: 4500, interestAmount: 500, totalAmount: 5000, status: "PENDING" },
  ];



  const nextEmi = schedules.find(s => s.status === "PENDING");

  return (
    <div className={`min-h-screen ${FigurLedgerTheme.background} p-6 space-y-8`}>

      {/* ================= Loan Overview ================= */}
      <div className={`${FigurLedgerTheme.card} ${FigurLedgerTheme.radius.lg} ${FigurLedgerTheme.border} p-6 sticky top-4 z-10`}>
        <div className="flex flex-wrap gap-6 justify-between items-center">
          <div>
            <h2 className={`text-xl font-semibold ${FigurLedgerTheme.text.primary}`}>Active Loan</h2>
            <p className={FigurLedgerTheme.text.secondary}>Loan ID • LN-20491</p>
          </div>

          <div className="flex gap-10">
            <Stat label="Approved" value="₹50,000" />
            <Stat label="EMI" value="₹5,000" />
            <Stat label="Tenure" value="9 Months" />
            <Stat label="Interest" value="14%" />
          </div>
        </div>
      </div>

      {/* ================= Next EMI ================= */}
      {/* {nextEmi && (
        <div className={`${FigurLedgerTheme.gradients.subtleEmerald} ${FigurLedgerTheme.radius.lg} ${FigurLedgerTheme.border} p-6 flex justify-between items-center`}>
          <div>
            <p className={FigurLedgerTheme.text.secondary}>Next EMI Due</p>
            <p className="text-2xl font-bold text-emerald-400">
              ₹{nextEmi.totalAmount}
            </p>
            <p className={FigurLedgerTheme.text.muted}>
              {new Date(nextEmi.dueDate).toDateString()}
            </p>
          </div>

          <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
            Upcoming
          </span>
        </div> */}
      {/* )} */}

      {/* ================= Repayment Timeline ================= */}
      <div className={`${FigurLedgerTheme.card} ${FigurLedgerTheme.radius.lg} ${FigurLedgerTheme.border} p-6`}>
        <h3 className={`text-lg font-semibold mb-6 ${FigurLedgerTheme.text.primary}`}>
          Repayment Schedule
        </h3>

        <div className="flex gap-14 overflow-x-auto pb-4">
          {data?.data?.map((s) => (
            <div
              key={s.scheduleNumber}
              onClick={() => setSelected(s)}
              className="flex flex-col items-center min-w-[100px] cursor-pointer group"
            >
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center font-semibold
                  transition-all
                  ${
                    s.status === "PAID"
                      ? "bg-emerald-500 text-slate-900"
                      : s.status === "OVERDUE"
                      ? "bg-red-500 text-white animate-pulse"
                      : "border-2 border-emerald-400 text-emerald-400 bg-transparent"
                  }
                `}
              >
                {s.scheduleNumber}
              </div>

              <span className={`mt-2 text-sm ${FigurLedgerTheme.text.secondary}`}>
                {s.dueDate ? new Date(s.dueDate).toLocaleDateString() : 'N/A'}
              </span>

              <span className={`text-sm font-semibold ${FigurLedgerTheme.text.primary}`}>
                ₹{s.totalAmount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EMI Drawer ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className={`${FigurLedgerTheme.card} w-full sm:w-[420px] h-full p-6`}>
            <h3 className={`text-xl font-semibold ${FigurLedgerTheme.text.primary}`}>
              EMI #{selected.scheduleNumber}
            </h3>

            <div className="mt-6 space-y-4">
              <DrawerRow label="Due Date" value={selected.dueDate ? new Date(selected.dueDate).toDateString() : 'N/A'} />
              <DrawerRow label="Principal" value={`₹${selected.principalAmount}`} />
              <DrawerRow label="Interest" value={`₹${selected.interestAmount}`} />
              <DrawerRow label="Total" value={`₹${selected.totalAmount}`} />
              <DrawerRow label="Status" value={selected.status} />
            </div>

            <button
              onClick={() => setSelected(null)}
              className={`mt-8 w-full ${FigurLedgerTheme.button.secondary}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}

function DrawerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-slate-700 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
