"use client";

import BillerManagementHeader from "@/components/features/admin/biller-management/BillerManagementHeader";
import BillerStatsBar from "@/components/features/admin/biller-management/BillerStatusBar";
import BillerGridHeader from "@/components/features/admin/biller-management/BillerGridHeader";
import BillerGrid from "@/components/features/admin/biller-management/BillerGrid";
import { useState } from "react";
import CreateBillerModal from "../ui/modals/admin/CreateBillerModal";
import { useCreateBiller, useGetAllBillers } from "@/hooks/api/usePaymentAndBillingService";

import { toast } from "sonner";
// import { getBillers } from "@/lib/actions/biller-actions";


export default function BillerManagementClientPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const createBiller = useCreateBiller();
  const { data, isLoading } = useGetAllBillers("ALL");
  const onHandleCreateBiller = (formData: {
    name: string;
    category: string;
    contactEmail: string;
    contactPhone: string;
  }) => {
    createBiller.mutate(formData, {
      onSuccess: (data) => {  
        setOpenCreateModal(false);
        toast.success("Biller created successfully!");
        console.log("Biller created successfully:", data);
      },
      onError: (error) => {
        toast.error("Error creating biller. Please try again.");
      },
    });
  };
  const onOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const billersData = data?.data ||[]// Use API data if available, otherwise fallback to dummy data


  return (
    <div className={` min-h-screen p-8`}>
      <div className="max-w-7xl mx-auto space-y-8">
        <BillerManagementHeader onOpenCreateModal={onOpenCreateModal} />
        <BillerStatsBar billers={billersData} />
        <BillerGridHeader billerCount={billersData.length} />
        <BillerGrid billers={billersData} />
      </div>

      {openCreateModal && (
        <CreateBillerModal
          onSubmit={onHandleCreateBiller}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
    </div>
  );
}
