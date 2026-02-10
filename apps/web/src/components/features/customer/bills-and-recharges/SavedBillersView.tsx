import React from "react";
import { Calendar } from "lucide-react";
import { FinledgerTheme } from "@/theme";
import { ISavedBiller } from "@/types/IBill";
import SavedBillerCard from "./SavedBillerCard";
import { on } from "events";

interface SavedBillersViewProps {
  billers: ISavedBiller[];
  onOpenDetails: (biller: ISavedBiller) => void;
  onViewInvoice: (biller: ISavedBiller) => void;
}

const SavedBillersView: React.FC<SavedBillersViewProps> = ({
  billers,
  onOpenDetails,
  onViewInvoice,
}) => {
  if (!billers || billers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Calendar size={32} className="text-emerald-400" />
        </div>
        <h3
          className={`${FinledgerTheme.text.primary} text-xl font-medium mb-2`}
        >
          No Saved Billers
        </h3>
        <p className={`${FinledgerTheme.text.secondary} mb-6`}>
          Add billers to start managing your payments
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {billers.map((biller) => (
        <SavedBillerCard
          key={biller._id}
          biller={biller}
          onOpen={onOpenDetails}
        />
      ))}
    </div>
  );
};

export default SavedBillersView;
