import { ILoanApplication } from "@/types/ILoan";

export default function LoanApplicationRow({
  application,
  onClick,
  active,
}: {
  application: ILoanApplication;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-4 mb-2 cursor-pointer transition
        ${
          active
            ? "bg-emerald-500/10 border border-emerald-500/30"
            : "hover:bg-slate-800/60"
        }`}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-white">
          ₹{application.requestedAmount.toLocaleString()}
        </p>
        <StatusBadge status={application.status} />
      </div>

      <div className="flex justify-between text-sm text-slate-400 mt-1">
        <span>{application.tenureInMonths} months</span>
        <span>{application.createdAt}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ILoanApplication["status"] }) {
  const map: Record<string, string> = {
    APPLIED: "bg-yellow-500/20 text-yellow-400",
    APPROVED: "bg-emerald-500/20 text-emerald-400",
    REJECTED: "bg-red-500/20 text-red-400",
    ACTIVE: "bg-blue-500/20 text-blue-400",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}
