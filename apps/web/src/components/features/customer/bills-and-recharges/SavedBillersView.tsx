"use client";
import React from "react";
import { FolderX } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ISavedBiller } from "@/types/IBill";
import SavedBillerCard from "./SavedBillerCard";
import { motion, AnimatePresence } from "framer-motion";

interface SavedBillersViewProps {
  billers: ISavedBiller[];
  onOpenDetails: (biller: ISavedBiller) => void;
}

const SavedBillersView: React.FC<SavedBillersViewProps> = ({
  billers,
  onOpenDetails,
}) => {
  const { theme: t } = useTheme();

  if (!billers || billers.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex flex-col items-center justify-center py-24 px-8 ${t.card.base} ${t.radius.lg} border border-dashed border-black/10 dark:border-white/10`}
      >
        <div className="w-24 h-24 rounded-3xl bg-[#c1ff72]/5 flex items-center justify-center mb-6 relative">
           <div className="absolute inset-0 bg-[#c1ff72]/10 blur-xl rounded-full animate-pulse" />
           <FolderX size={40} className="text-[#c1ff72] relative z-10" />
        </div>
        <div className="text-center space-y-2 max-w-sm">
           <h3 className={`text-xl font-black tracking-tight ${t.text.heading}`}>No Registered Nodes</h3>
           <p className={`text-sm font-medium ${t.text.body} opacity-50`}>
             Your specialized utility transmission network is currently decoupled. Connect a service provider to begin monitoring flow.
           </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
       layout
       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {billers.map((biller) => (
          <motion.div
            key={biller._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <SavedBillerCard
              biller={biller}
              onOpen={onOpenDetails}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default SavedBillersView;
