// src/components/admin/biller-management/components/BillerManagementHeader.jsx
import { PlusCircle } from "lucide-react";
import { FinledgerTheme } from "@/theme";

export default function BillerManagementHeader({onOpenCreateModal}: {onOpenCreateModal: () => void}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className={`text-3xl font-bold ${FinledgerTheme.text.primary} mb-2`}>
          Biller Management
        </h1>
        <p className={`${FinledgerTheme.text.secondary}`}>
          Manage utility companies and service providers
        </p>
      </div>
      
      <button
        onClick={onOpenCreateModal}
        className={`${FinledgerTheme.button.primary} px-6 py-3 rounded-full flex items-center gap-2`}
        id="open-create-biller-modal"
      >
        <PlusCircle size={20} />
        Add New Biller
      </button>
    </div>
  );
}