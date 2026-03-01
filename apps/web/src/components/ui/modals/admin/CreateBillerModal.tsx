"use client";

import React, { useState } from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  ChevronDown,
  Loader2,
  Sparkles,
  Zap,
  CheckCircle2,
  Activity
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CreateBillerModal = ({
  onSubmit,
  onClose,
}: {
  onSubmit: (formData: {
    name: string;
    category: string;
    contactEmail: string;
    contactPhone: string;
  }) => void;
  onClose: () => void;
}) => {
  const { theme: t } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    category: "ELECTRICITY",
    contactEmail: "",
    contactPhone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { value: "ELECTRICITY", label: "Electricity", icon: "⚡" },
    { value: "WATER", label: "Water", icon: "💧" },
    { value: "GAS", label: "Gas", icon: "🔥" },
    { value: "TELECOM", label: "Telecom", icon: "📱" },
    { value: "INTERNET", label: "Internet", icon: "🌐" },
    { value: "TAX", label: "Tax", icon: "💰" },
    { value: "INSURANCE", label: "Insurance", icon: "🛡️" },
    { value: "EDUCATION", label: "Education", icon: "🎓" },
  ];
 
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError("Failed to create provider gateway.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find(
    (cat) => cat.value === formData.category,
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={cn(
          t.card.base,
          t.radius.lg,
          "w-full max-w-lg relative overflow-hidden shadow-3xl border border-black/5 dark:border-white/5"
        )}
      >
        {/* Visual Decoration */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#b0f061] shadow-[0_0_20px_#b0f061]" />
        
        {/* Header */}
        <div className="p-8 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl", t.card.lime)}>
              <Building2 className={t.text.lime} size={24} />
            </div>
            <div>
              <h2 className={cn("text-2xl font-black tracking-tighter uppercase", t.text.heading)}>
                Add <span className="text-[#b0f061]">Biller.</span>
              </h2>
              <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] mt-1 opacity-50", t.text.muted)}>
                Register a new service provider
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-black/10 dark:hover:bg-white/10", t.text.muted)}
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={onHandleSubmit} className="p-8 space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3"
              >
                <Zap size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={cn("text-[10px] font-black uppercase tracking-widest opacity-60 ml-1", t.text.muted)}>Provider Name</label>
              <div className="relative group">
                 <Building2 className={cn("absolute left-5 top-1/2 -translate-y-1/2 transition-colors", t.text.muted)} size={18} />
                 <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Official institutional name"
                  className={cn(
                    "w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 outline-none font-bold text-sm tracking-tight",
                    "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061] focus:ring-4 focus:ring-[#b0f061]/10",
                    t.text.heading
                  )}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={cn("text-[10px] font-black uppercase tracking-widest opacity-60 ml-1", t.text.muted)}>Service Type</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={cn(
                    "w-full px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between outline-none group",
                    "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061]",
                    t.text.heading
                  )}
                  disabled={isSubmitting}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{selectedCategory?.icon}</span>
                    <span className="font-bold text-sm">{selectedCategory?.label}</span>
                  </div>
                  <ChevronDown size={18} className={cn("transition-transform duration-500", isDropdownOpen ? "rotate-180" : "", t.text.lime)} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={cn(
                        "absolute top-full left-0 right-0 mt-3 p-3 rounded-2xl border z-20 shadow-3xl backdrop-blur-xl",
                        "bg-white/95 dark:bg-black/95 border-black/5 dark:border-white/10"
                      )}
                    >
                      <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto custom-scrollbar">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, category: category.value });
                              setIsDropdownOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-xl transition-all font-bold text-sm",
                              formData.category === category.value
                                ? "bg-[#b0f061] text-[#0a1a15] shadow-lg shadow-[#b0f061]/20"
                                : "hover:bg-black/5 dark:hover:bg-white/5 text-slate-500"
                            )}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span>{category.label}</span>
                            {formData.category === category.value && <CheckCircle2 size={16} className="ml-auto" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={cn("text-[10px] font-black uppercase tracking-widest opacity-60 ml-1", t.text.muted)}>Communications Endpoint (Email)</label>
              <div className="relative group">
                 <Mail className={cn("absolute left-5 top-1/2 -translate-y-1/2 transition-colors", t.text.muted)} size={18} />
                 <input
                  required
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="billing@provider.network"
                  className={cn(
                    "w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 outline-none font-bold text-sm tracking-tight",
                    "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061] focus:ring-4 focus:ring-[#b0f061]/10",
                    t.text.heading
                  )}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={cn("text-[10px] font-black uppercase tracking-widest opacity-60 ml-1", t.text.muted)}>Direct Dial Gateway</label>
              <div className="relative group">
                 <Phone className={cn("absolute left-5 top-1/2 -translate-y-1/2 transition-colors", t.text.muted)} size={18} />
                 <input
                  required
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="Primary contact integer"
                  className={cn(
                    "w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 outline-none font-bold text-sm tracking-tight",
                    "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 focus:border-[#b0f061] focus:ring-4 focus:ring-[#b0f061]/10",
                    t.text.heading
                  )}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Logic Note */}
          <div className="p-6 rounded-2xl bg-[#b0f061]/5 border border-[#b0f061]/10 flex gap-4 items-start">
            <Sparkles size={20} className="text-[#b0f061] shrink-0 mt-0.5" />
            <p className={cn("text-[11px] font-bold leading-relaxed", t.text.body)}>
              <span className="text-[#b0f061] uppercase tracking-[0.2em] mr-2">Automation Trigger:</span> 
              Linking this provider will automatically initialize a secure vault and institutional relay account on the Ledger Network.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-6 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex-1 h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] transition-all hover:bg-black/5 dark:hover:bg-white/5",
                t.text.muted
              )}
              disabled={isSubmitting}
            >
              Abort
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                t.button.primary,
                "flex-[2] h-16 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all flex items-center justify-center gap-4 group"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Configuring Protocol...</span>
                </>
              ) : (
                <>
                  <Activity size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                  <span>Synchronize Provider</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBillerModal;
