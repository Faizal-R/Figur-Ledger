"use client";

import { useState } from "react";
import LoanProductCard from "./LoanProductCard";
import LoanApplyModal from "@/components/ui/modals/customer-loan/LoanApplyModal";
import { useGetAllLoanProducts } from "@/hooks/api/useLoan";
import { ILoanProduct } from "@/types/ILoan";

export default function LoanProductsList() {
    const {data}=useGetAllLoanProducts()
  const [selected, setSelected] = useState<ILoanProduct | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
      {data?.data.map((product) => (
        <LoanProductCard
          key={product.id}
          product={product}
          onApply={() => setSelected(product)}
        />
      ))}
    </div>

      {selected && (
        <LoanApplyModal
          product={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
