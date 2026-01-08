"use client";

import { useState } from "react";
import { ILoanApplication } from "@/types/ILoan";
import LoanApplicationCard from "./LoanApplicationCard";
import LoanDecisionModal from "@/components/ui/modals/loan/LoanDecisionModal";
import { useApproveOrRejectLoanApplication, useGetAllLoanApplications } from "@/hooks/api/useLoan";
import { toast } from "sonner";
import { useAuthUserStore } from "@/store";

export default function LoanApplicationList() {
  const [selectedApplication, setSelectedApplication] =
    useState<ILoanApplication | null>(null);
    const {user}=useAuthUserStore()
    
    const { data: applications, isLoading } = useGetAllLoanApplications();

    const approveOrRejectLoanApplication=useApproveOrRejectLoanApplication() 
    
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleApproveOrRejectLoanApplication=(data:{applicationId:string,status:"APPROVED"|"REJECTED"})=>{
    const applicationData={
      applicationId:data.applicationId,
      status:data.status,
      approvedAmount:selectedApplication?.approvedAmount,
      approvedBy:user?.id 
    }
    approveOrRejectLoanApplication.mutate(applicationData,
      {
        onSuccess:()=>{
          toast.success(`Loan application ${data.status} successfully`)
          setSelectedApplication(null)
        }
      }
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {applications?.data.map((app) => (
          <LoanApplicationCard
            key={app.id}
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
