"use client";

import { useState } from "react";
import { ILoanApplication } from "@/types/ILoan";
import LoanApplicationCard from "./LoanApplicationCard";
import LoanDecisionModal from "@/components/ui/modals/loan/LoanDecisionModal";
import {
  useApproveOrRejectLoanApplication,
  useGetAllLoanApplications,
} from "@/hooks/api/useLoan";
import { useAuthUserStore } from "@/store";

export default function LoanApplicationList({
  applications: initialApplications,
}: {
  applications?: ILoanApplication[];
}) {
  const [selectedApplication, setSelectedApplication] =
    useState<ILoanApplication | null>(null);
  const { user } = useAuthUserStore();

  const { data: fetchedApplications, isLoading } = useGetAllLoanApplications();
  const applications = initialApplications || fetchedApplications?.data;

  const approveOrRejectLoanApplication = useApproveOrRejectLoanApplication();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-64 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5"
          />
        ))}
      </div>
    );
  }

  const handleApproveOrRejectLoanApplication = (data: {
    applicationId: string;
    status: "APPROVED" | "REJECTED";
  }) => {
    const applicationData = {
      applicationId: data.applicationId,
      status: data.status,
      approvedAmount: selectedApplication?.approvedAmount || selectedApplication?.requestedAmount,
      approvedBy: user?.id,
    };
    approveOrRejectLoanApplication.mutate(applicationData);
    setSelectedApplication(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {applications?.map((app) => (
          <LoanApplicationCard
            key={app._id || app.id}
            application={app}
            onClick={() => setSelectedApplication(app)}
          />
        ))}
      </div>

      {selectedApplication && (
        <LoanDecisionModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onConfirm={handleApproveOrRejectLoanApplication}
        />
      )}
    </>
  );
}
