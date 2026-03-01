"use client";
import { useTheme } from "@/context/ThemeContext";
import LoanProductsList from "@/components/features/customer/loan/LoanProductsList";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CustomerLoanPage() {
  const { theme: t } = useTheme();

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center space-y-4"
      >
        <div className="w-16 h-16 bg-[#0a1a15] dark:bg-[#c1ff72] rounded-3xl flex items-center justify-center shadow-2xl mb-4">
           <Sparkles className="text-[#c1ff72] dark:text-[#0a1a15]" size={32} />
        </div>
        <div className="space-y-2">
           <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[#c1ff72]/30" />
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${t.text.muted}`}>Market Liquidity</span>
              <div className="h-px w-8 bg-[#c1ff72]/30" />
           </div>
           <h1 className={`text-5xl font-black tracking-tighter ${t.text.display}`}>
             Capital <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1a3a32] to-[#4caf50] dark:from-[#c1ff72] dark:to-[#81c784]">Deployment.</span>
           </h1>
           <p className={`${t.text.body} text-lg opacity-80 max-w-2xl font-medium`}>
             Secure institutional-grade financing with near-instant settlement. Select your preferred node for injection.
           </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        <LoanProductsList />
      </motion.div>
    </div>
  );
}
