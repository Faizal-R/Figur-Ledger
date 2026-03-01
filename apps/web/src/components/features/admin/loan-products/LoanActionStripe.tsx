"use client";

import { useTheme } from "@/context/ThemeContext";
import LoanProductModal from "@/components/ui/modals/admin/LoanProductModal";
import {  useLoanProductState } from "@/hooks/state/useLoanProductState";
import { useCreateLoanProduct } from "@/hooks/api/useLoan";
import { toast } from "sonner";
import { ILoanProduct } from "@/types/ILoan";
import { cn } from "@/lib/utils";

export default function LoanActionStrip() {
  const { theme: t } = useTheme();
  const state = useLoanProductState();
  const createLoanProduct = useCreateLoanProduct();

  const onPublishLoanProduct = (payload: ILoanProduct) => {
    createLoanProduct.mutate(payload, {
      onSuccess: () => {
        toast.success("Loan Product Created Successfully");
        state.setModalOpen(false);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={state.openCreate}
          className={cn(t.button.primary, "px-8 py-4 rounded-2xl uppercase font-black tracking-[0.2em] text-[12px] shadow-xl")}
        >
          + Create Loan Product
        </button>
      </div>

      <LoanProductModal
        open={state.modalOpen}
        onClose={() => state.setModalOpen(false)}
        onPublish={onPublishLoanProduct}
        editing={state.editing}
      />
    </>
  );
}
