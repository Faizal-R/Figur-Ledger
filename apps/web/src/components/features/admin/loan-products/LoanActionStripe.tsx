"use client";

import { FinledgerTheme } from "@/theme";
import LoanProductModal from "@/components/ui/modals/admin/LoanProductModal";
import DraftListModal from "@/components/ui/modals/admin/DraftListModal";
import {  useLoanProductState } from "@/hooks/state/useLoanProductState";
import { useCreateLoanProduct } from "@/hooks/api/useLoan";
import { toast } from "sonner";
import { ILoanProduct } from "@/types/ILoan";

export default function LoanActionStrip() {
  const state = useLoanProductState();
const createLoanProduct=useCreateLoanProduct()

 const onPublishLoanProduct=(payload:ILoanProduct)=>{
  
    console.log("onPublishLoanProduct",payload)
    //TODO : add validation

   createLoanProduct.mutate(payload,{
    onSuccess:(data)=>{
      console.log(data)
      toast.success("Loan Product Created Successfully")
      state.setModalOpen(false)
    },
    onError:(error)=>{
      console.log(error)
    }
   })


 }
  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={state.openCreate}
          className={`${FinledgerTheme.button.primary} px-6 py-3 rounded-xl`}
        >
          + Create Loan Product
        </button>

        {/* <button
          onClick={() => state.setDraftModalOpen(true)}
          className={`${FinledgerTheme.button.secondary} px-6 py-3 rounded-xl`}
        >
          Drafts ({state.drafts.length})
        </button> */}
      </div>

      <LoanProductModal
        open={state.modalOpen}
        onClose={() => state.setModalOpen(false)}
        // onSaveDraft={state.saveDraft}
        onPublish={onPublishLoanProduct}
        editing={state.editing}
      />

      {/* <DraftListModal
        open={state.draftModalOpen}
        drafts={state.drafts}
        onEdit={state.openEditDraft}
        onClose={() => state.setDraftModalOpen(false)}
      /> */}
    </>
  );
}
