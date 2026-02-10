"use client";
import React, { useState } from "react";
import { FinledgerTheme } from "@/theme";
import {
  CATEGORIES,
} from "@/constant/data/dummy-billers";
import { Biller, IBiller, ISavedBiller } from "@/types/IBill";

// Import Components
import Header from "@/components/features/customer/bills-and-recharges/Header";
import CategoryTabs from "@/components/features/customer/bills-and-recharges/CategoryTabs";
import MainTabs from "@/components/features/customer/bills-and-recharges/MainTabs";
import BillerGrid from "@/components/features/customer/bills-and-recharges/BillerGrid";
import SavedBillersView from "@/components/features/customer/bills-and-recharges/SavedBillersView";
import RecentPaymentsView from "@/components/features/customer/bills-and-recharges/RecentPaymentsView";

import AddBillerModal from "@/components/ui/modals/billers/AddBillerModal";
import {
  useGetAllBillers,
  useGetAllPayments,
  useGetBills,
  useGetSavedBillers,
  useInitiateBillPayment,
  useSaveBiller,
} from "@/hooks/api/usePaymentAndBillingService";
import { useAuthUserStore } from "@/store";
import { toast } from "sonner";
import BillDetailsModal from "../ui/modals/billers/BillDetailsModal";
import { useUserAccounts } from "@/hooks/api/useProfileAndAccount";
import { IPayment } from "@/types/IPayment";

const BillsRechargesPage: React.FC = () => {
  // State Management
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeMainTab, setActiveMainTab] = useState<"saved" | "recent">(
    "saved",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedBiller, setSelectedBiller] = useState<IBiller | null>(null);
  const [savedBillers, setSavedBillers] = useState<ISavedBiller[]>([]);
  const [selectedBillerForModal, setSelectedBillerForModal] =
    useState<ISavedBiller | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { user } = useAuthUserStore();

  const { data: allBillers } = useGetAllBillers(activeCategory);
  console.log("Fetched billers from API:", allBillers);

  const { mutate: saveBiller } = useSaveBiller();
  const { data: savedBillersData } = useGetSavedBillers(
    user?.id || "",
    activeCategory,
  );

  const { data: accounts } = useUserAccounts(user?.id || "");
  // if(savedBillersData?.data && isSuccess) {
  //   setSavedBillers(savedBillersData.data);
  // }

  const {data:paymentHistory}=useGetAllPayments(user?.id!)

  const initiateBillPayment = useInitiateBillPayment();

  // const filteredBillers = (allBillers?.data || []).filter((biller: IBiller) => {
  //   const matchesCategory =
  //     activeCategory === "ALL" || biller.category === activeCategory;
  //   const matchesSearch = biller.name
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // }) as Biller[];

  // Calculate stats
  const totalDue =
    (savedBillersData?.data || []).reduce(
      (sum, biller) => sum + biller.dueAmount,
      0,
    ) || 0;
  const upcomingBills = (savedBillersData?.data || []).filter((biller) => {
    const daysUntilDue = Math.floor(
      (new Date(biller.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return daysUntilDue <= 7 && daysUntilDue > 0;
  }).length;

  // Event Handlers
  const handleBillerClick = (biller: IBiller) => {
    setSelectedBiller(biller);
    setShowAddModal(true);
  };
  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setActiveCategory(categoryId);
  };
  const { data: billDetail } = useGetBills(
    selectedBillerForModal?.category || "",
    {
      enabled: !!selectedBillerForModal, // IMPORTANT
    },
  );

  const handleOpenBillerDetails = (biller: ISavedBiller) => {
    setSelectedBillerForModal(biller);
    setIsDetailsModalOpen(true);
  };

  const handleAddBiller = (consumerId: string, alias?: string) => {
    if (!selectedBiller) return;

    const newSavedBiller: ISavedBiller = {
      userId: user?.id || "",
      billerId: selectedBiller._id,
      category: selectedBiller.category,
      consumerId,
      alias:
        alias || `${selectedBiller.name} (${consumerId.substring(0, 4)}...)`,
      lastPaidAmount: 0,
      lastPaidDate: new Date().toISOString().split("T")[0] as string,
      dueAmount: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0] as string,
    };
    console.log("Saving new biller:", newSavedBiller);
    saveBiller(newSavedBiller, {
      onSuccess: (data) => {
        console.log("Biller saved successfully:", data);
        toast.success("Biller saved successfully!");
      },
      onError: (error) => {
        console.error("Error saving biller:", error);
      },
    });
    // setSavedBillers(prev => [...prev, newSavedBiller]);
    setShowAddModal(false);
    setSelectedBiller(null);
  };

  const handlePayBill = (
    biller: ISavedBiller,
    amount: number,
    accountId: string,
  ) => {
    const billerInfo = allBillers?.data.find((b) => b._id === biller.billerId);
    const paymentData: IPayment = {
      type: "BILL_PAYMENT",
      payerUserId: biller.userId,
      referenceId: biller.consumerId,
      payerAccountId: accountId,
      amount,
      payeeId: biller.billerId,
      payeeType: "BILLER",
      payeeAccountId: billerInfo?.collectionAccountId!,
    };

    initiateBillPayment.mutate({paymentData,billDetails:{...billDetail?.data,savedBillerId:biller._id}}, {
      onSuccess: (data) => {
        console.log("Payment successful:", data);
        toast.success("Payment successful!");
        setIsDetailsModalOpen(false);
      },
      onError: (error) => {
        console.error("Payment failed:", error);
        toast.error("Payment failed. Please try again.");
      },
    });
    console.log("Payment data to be sent to API:", paymentData);
  };

  const handleViewInvoice = (biller: ISavedBiller) => {
    alert(`Viewing invoice for ${biller.alias}`);
    // Implement invoice viewing logic here
  };

  return (
    <div className={`${FinledgerTheme.background} min-h-screen  p-4 md:p-6`}>
      {/* Header with Stats */}
      <Header
        totalDue={totalDue}
        savedBillersCount={savedBillersData?.data?.length || 0}
        upcomingBills={upcomingBills}
      />

      {/* Category Tabs */}
      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Main Tabs (Saved/Recent) */}
        <MainTabs
          activeTab={activeMainTab}
          onTabChange={setActiveMainTab}
          onAddNew={() => setShowAddModal(true)}
          savedCount={savedBillersData?.data?.length || 0}
          recentCount={(paymentHistory?.data||[]).length}
          showAddButton={activeMainTab === "saved"}
        />

        {/* Content based on active main tab */}
        {activeMainTab === "saved" ? (
          // Saved Billers Grid
          <SavedBillersView
            billers={savedBillersData?.data || []}
            onViewInvoice={handleViewInvoice}
            onOpenDetails={handleOpenBillerDetails}
          />
        ) : (
          // Recent Payments View
          <RecentPaymentsView payments={paymentHistory?.data||[]} />
        )}
      </div>

      {/* Available Billers Section (Always visible) */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <BillerGrid
          billers={allBillers?.data as IBiller[]}
          title="Available Billers"
          emptyMessage={`No billers found in ${activeCategory === "ALL" ? "any" : activeCategory.toLowerCase()} category`}
          onBillerClick={handleBillerClick}
          showSearch={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Add Biller Modal */}
      <AddBillerModal
        isOpen={showAddModal}
        selectedBiller={selectedBiller!}
        onClose={() => {
          setShowAddModal(false);
          setSelectedBiller(null);
        }}
        onAddBiller={handleAddBiller}
      />

      {isDetailsModalOpen && selectedBillerForModal && (
        <BillDetailsModal
          isOpen={isDetailsModalOpen}
          biller={selectedBillerForModal}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedBillerForModal(null);
          }}
          onPayNow={handlePayBill}
          accounts={accounts?.data || []}
          billDetails={billDetail?.data || null} // Pass the selected biller details to the modal
        />
      )}
    </div>
  );
};

export default BillsRechargesPage;
