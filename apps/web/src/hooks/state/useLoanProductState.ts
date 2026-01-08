"use client";

import { useState } from "react";
import { ILoanProduct } from "@/types/ILoan";

export function useLoanProductState() {
  const [modalOpen, setModalOpen] = useState(false);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [editing, setEditing] = useState<ILoanProduct | null>(null);

  const [drafts, setDrafts] = useState<ILoanProduct[]>([
    {
      id: "d1",
      code: "PL_DRAFT",
      name: "Draft Personal Loan",
      minAmount: 10000,
      maxAmount: 40000,
      annualInterestRate: 11,
      allowedTenuresInMonths: [3, 6], 
      isActive: false,
    },
  ]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEditDraft(draft: ILoanProduct) {
    setEditing(draft);
    setModalOpen(true);
  }

  function saveDraft(payload: ILoanProduct) {
    setDrafts((prev) => {
      if (payload.id) {
        return prev.map((d) => (d.id === payload.id ? payload : d));
      }
      return [...prev, { ...payload, id: crypto.randomUUID() }];
    });
    setModalOpen(false);
  }

  // function publish(payload: LoanProductPayload) {
  //   // 🔌 API INTEGRATION POINT
  //   console.log("PUBLISH → API", payload);
  //   setDrafts((prev) => prev.filter((d) => d.id !== payload.id));
  //   setModalOpen(false);
  // }

  return {
    modalOpen,
    draftModalOpen,
    editing,
    drafts,
    openCreate,
    openEditDraft,
    saveDraft,
    // publish,
    setModalOpen,
    setDraftModalOpen,
  };
}
