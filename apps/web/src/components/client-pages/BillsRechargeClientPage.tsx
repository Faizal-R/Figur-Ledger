"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/constant/data/dummy-billers";
import { IBiller, ISavedBiller } from "@/types/IBill";

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
  const { theme: t } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeMainTab, setActiveMainTab] = useState<"saved" | "recent">(
    "saved",
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedBiller, setSelectedBiller] = useState<IBiller | null>(null);
  const [selectedBillerForModal, setSelectedBillerForModal] =
    useState<ISavedBiller | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [paymentHistoryCurrentPage, setPaymentHistoryCurrentPage] = useState(1);

  const { user } = useAuthUserStore();

  const { data: allBillers } = useGetAllBillers(activeCategory);
  const { mutate: saveBiller } = useSaveBiller();
  const { data: savedBillersData } = useGetSavedBillers(
    user?.id || "",
    activeCategory,
  );
  const { data: accounts } = useUserAccounts(user?.id || "");
  const { data } = useGetAllPayments(user?.id ?? "",paymentHistoryCurrentPage);
  const paymentHistory = data?.data.payments;
  const totalPages = data?.data.totalPages;
  const initiateBillPayment = useInitiateBillPayment();

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

  const handleBillerClick = (biller: IBiller) => {
    setSelectedBiller(biller);
    setShowAddModal(true);
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const { data: billDetail } = useGetBills(
    selectedBillerForModal?.category || "",
    {
      enabled: !!selectedBillerForModal,
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

    saveBiller(newSavedBiller, {
      onSuccess: () => {
        toast.success("Biller saved successfully!");
      },
      onError: (error) => {
        console.error("Error saving biller:", error);
      },
    });
    setShowAddModal(false);
    setSelectedBiller(null);
  };

  const handlePayBill = (
    biller: ISavedBiller,
    amount: number,
    accountId: string,
  ) => {
    const billerInfo = allBillers?.data.find((b) => b._id === biller.billerId);
    if (!billerInfo) return;

    const paymentData: IPayment = {
      type: "BILL_PAYMENT",
      payerUserId: biller.userId,
      referenceId: biller.consumerId,
      payerAccountId: accountId,
      amount,
      payeeId: biller.billerId,
      payeeType: "BILLER",
      payeeAccountId: billerInfo.collectionAccountId,
    };

    initiateBillPayment.mutate(
      {
        paymentData,
        billDetails: { ...billDetail?.data, savedBillerId: biller._id },
      },
      {
        onSuccess: () => {
          toast.success("Payment successful!");
          setIsDetailsModalOpen(false);
        },
        onError: (error) => {
          console.error("Payment failed:", error);
          toast.error("Payment failed. Please try again.");
        },
      },
    );
  };

  const handleViewInvoice = (biller: ISavedBiller) => {
    alert(`Viewing invoice for ${biller.alias}`);
  };

  // Filter billers based on search query
  const filteredBillers = (allBillers?.data || []).filter(
    (biller) =>
      biller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biller.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16 pb-32 max-w-[1600px] mx-auto"
    >
      {/* 0. SPACE DECOR */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c1ff72]/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />

      {/* 1. ARCHITECTURAL HEADER */}
      <Header
        totalDue={totalDue}
        savedBillersCount={savedBillersData?.data?.length || 0}
        upcomingBills={upcomingBills}
      />

      {/* 2. SPECTRUM NAVIGATION */}
      <div className="relative pt-4">
        <div className="absolute top-1/2 left-0 w-full h-px bg-black/5 dark:bg-white/5 -z-10" />
        <CategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* 3. CORE INTERFACE */}
      <div className="space-y-12">
        <MainTabs
          activeTab={activeMainTab}
          onTabChange={setActiveMainTab}
          onAddNew={() => setShowAddModal(true)}
          savedCount={savedBillersData?.data?.length || 0}
          recentCount={(paymentHistory || []).length}
          showAddButton={activeMainTab === "saved"}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMainTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {activeMainTab === "saved" ? (
              <SavedBillersView
                billers={savedBillersData?.data || []}
                // onViewInvoice={handleViewInvoice}
                onOpenDetails={handleOpenBillerDetails}
              />
            ) : (
              <RecentPaymentsView
                payments={paymentHistory|| []}
                currentPage={paymentHistoryCurrentPage}
                onPageChange={(page) => {
                  setPaymentHistoryCurrentPage(page);
                  window.scrollTo({
                    top: 700,
                    behavior: "smooth",
                  });
                }}
                totalPages={totalPages|| 1}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. DISCOVERY MATRIX */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pt-20 border-t border-black/5 dark:border-white/5"
      >
        <BillerGrid
          billers={filteredBillers as IBiller[]}
          title="Global Networks"
          emptyMessage={`No discovery nodes matched for "${searchQuery}" in ${activeCategory === "ALL" ? "any" : activeCategory.toLowerCase()} sector.`}
          onBillerClick={handleBillerClick}
          showSearch={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </motion.div>

      {/* 5. OVERLAYS */}
      <AddBillerModal
        isOpen={showAddModal}
        selectedBiller={selectedBiller}
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
          billDetails={billDetail?.data || null}
        />
      )}
    </motion.div>
  );
};

export default BillsRechargesPage;
