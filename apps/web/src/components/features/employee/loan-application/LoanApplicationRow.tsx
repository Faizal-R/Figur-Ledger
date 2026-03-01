"use client";
import { ILoanApplication } from "@/types/ILoan";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function LoanApplicationRow({
  application,
  onClick,
  active,
}: {
  application: ILoanApplication;
  onClick: () => void;
  active?: boolean;
}) {
  const { theme: t } = useTheme();
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-5 mb-3 cursor-pointer transition-all duration-300 border flex flex-col gap-2",
        active
          ? "bg-[#b0f061]/10 border-[#b0f061]/30 shadow-lg shadow-[#b0f061]/5"
          : "bg-black/5 dark:bg-white/5 border-transparent hover:border-black/10 dark:hover:border-white/10"
      )}
    >
      <div className="flex justify-between items-center">
        <p className={cn("text-lg font-black tracking-tighter", t.text.heading)}>
          ₹{application.requestedAmount.toLocaleString()}
        </p>
        <StatusBadge status={application.status} />
      </div>

      <div className={cn("flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60", t.text.muted)}>
        <span>{application.tenureInMonths} months</span>
        <span>{new Date(application.createdAt!).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ILoanApplication["status"] }) {
  const map: Record<string, string> = {
    APPLIED: "bg-orange-500/10 text-orange-500",
    APPROVED: "bg-[#b0f061]/20 text-[#2d5a4c]",
    REJECTED: "bg-red-500/10 text-red-500",
    ACTIVE: "bg-blue-500/10 text-blue-500",
  };

  return (
    <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full", map[status])}>
      {status}
    </span>
  );
}
