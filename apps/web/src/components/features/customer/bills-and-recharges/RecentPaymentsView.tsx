import React from "react";
import { CheckCircle, XCircle, Clock, Download, ExternalLink } from "lucide-react";
import { FinledgerTheme } from "@/theme";
import { IPayment } from "@/types/IPayment";
import { IBiller } from "@/types/IBill";

interface RecentPaymentsViewProps {
  payments: IPayment[];
}

const RecentPaymentsView: React.FC<RecentPaymentsViewProps> = ({ payments }) => {
  const getStatusIcon = (status?: IPayment["status"]) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle size={16} className="text-emerald-400" />;
      case "FAILED":
        return <XCircle size={16} className="text-red-400" />;
      case "PENDING":
      case "PROCESSING":
        return <Clock size={16} className="text-yellow-400" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status?: IPayment["status"]) => {
    switch (status) {
      case "SUCCESS":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "FAILED":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "PENDING":
      case "PROCESSING":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!payments.length) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Clock size={32} className="text-emerald-400" />
        </div>
        <h3 className={`${FinledgerTheme.text.primary} text-xl font-medium mb-2`}>
          No Recent Payments
        </h3>
        <p className={`${FinledgerTheme.text.secondary}`}>
          Your payment history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div
          key={payment._id}
          className={`${FinledgerTheme.card} ${FinledgerTheme.border} ${FinledgerTheme.radius.lg} p-5 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 group`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                {getStatusIcon(payment.status)}
              </div>

              <div>
                <h4 className={`${FinledgerTheme.text.primary} font-bold`}>
                  {(payment.payeeId as IBiller).name}
                </h4>
                <p className={`${FinledgerTheme.text.secondary} text-xs`}>
                  Consumer ID: {payment.referenceId ?? "-"}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                payment.status
              )}`}
            >
              {payment.status ?? "PENDING"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`${FinledgerTheme.text.secondary} text-sm mb-1`}>
                Amount
              </p>
              <p className={`${FinledgerTheme.text.primary} text-xl font-bold`}>
                ₹{payment.amount}
              </p>
            </div>

            <div className="text-right">
              <p className={`${FinledgerTheme.text.secondary} text-sm mb-1`}>
                Date
              </p>
              <p className={`${FinledgerTheme.text.primary} font-medium`}>
                {formatDate(payment.completedAt ?? payment.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`${FinledgerTheme.button.secondary} p-2 rounded-lg`}
                title="Download Invoice"
              >
                <Download size={18} />
              </button>

              <button
                className={`${FinledgerTheme.button.secondary} p-2 rounded-lg`}
                title="View Details"
              >
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPaymentsView;
