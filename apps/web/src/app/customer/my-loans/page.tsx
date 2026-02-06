"use client";

import { useGetAllLoanApplicationsByUserAndStatus } from "@/hooks/api/useLoan";
import { useAuthUserStore } from "@/store";
import { FinledgerTheme } from "@/theme";
import { useRouter } from "next/navigation";

interface Loan {
  _id: string;
  approvedAmount: number;
  emiAmount: number;
  tenureInMonths: number;
  status: "ACTIVE" | "CLOSED";
  nextDueDate: string;
}

export default function MyLoansPage() {
  const router = useRouter();
  const {user}=useAuthUserStore()

  const {data,isLoading,error}=useGetAllLoanApplicationsByUserAndStatus(user?.id as string,"ACTIVE")
  console.log(data)
  const loans: Loan[] = [
    {
      _id: "LN001",
      approvedAmount: 50000,
      emiAmount: 5000,
      tenureInMonths: 9,
      status: "ACTIVE",
      nextDueDate: "2025-03-05",
    },
    {
      _id: "LN002",
      approvedAmount: 30000,
      emiAmount: 5200,
      tenureInMonths: 6,
      status: "CLOSED",
      nextDueDate: "",
    },
  ];

  return (
    <div className={`min-h-screen ${FinledgerTheme.background} p-6`}>
      <h1 className={`text-2xl font-semibold mb-6 ${FinledgerTheme.text.primary}`}>
        My Loans
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {(data?.data||[]).map((loan) => (
          <div
            key={loan._id}
            className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border} p-6 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className={`text-lg font-semibold ${FinledgerTheme.text.primary}`}>
                  Loan #{loan._id.slice(loan._id.length-6)}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      loan.status === "ACTIVE"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-600/20 text-slate-400"
                    }
                  `}
                >
                  {loan.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Info label="Approved" value={`₹${loan.approvedAmount}`} />
                <Info label="EMI" value={`₹${loan.emiAmount}`} />
                <Info label="Tenure" value={`${loan.tenureInMonths} Months`} />
                {/* {loan.status === "ACTIVE" && (
                //   <Info
                //     label="Next EMI"
                //     value={new Date(loan.nextDueDate).toDateString()}
                //   />
                )} */}
              </div>
            </div>

            <button
              onClick={() => router.push(`/customer/loans/${loan._id}`)}
              className={`mt-6 ${FinledgerTheme.button.primary}`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
}
