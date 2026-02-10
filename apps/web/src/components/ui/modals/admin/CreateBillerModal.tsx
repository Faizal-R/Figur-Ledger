// src/components/admin/biller-management/modal/CreateBillerModal.jsx
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
} from "lucide-react";
import { FinledgerTheme } from "@/theme";

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
    { value: "ELECTRICITY", label: "⚡ Electricity", icon: "⚡" },
    { value: "WATER", label: "💧 Water", icon: "💧" },
    { value: "GAS", label: "🔥 Gas", icon: "🔥" },
    { value: "TELECOM", label: "📱 Telecom", icon: "📱" },
    { value: "INTERNET", label: "🌐 Internet", icon: "🌐" },
    { value: "TAX", label: "💰 Tax", icon: "💰" },
    { value: "INSURANCE", label: "🛡️ Insurance", icon: "🛡️" },
    { value: "EDUCATION", label: "🎓 Education", icon: "🎓" },
  ];
 
  const onHandleSubmit =async (e:React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    await onSubmit(formData);
  } finally {
     setFormData({
    name: "",
    category: "",
    contactEmail: "",
    contactPhone: "",
  })
    setIsSubmitting(false);
  }
};
  const selectedCategory = categories.find(
    (cat) => cat.value === formData.category,
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.border} rounded-2xl w-full max-w-lg relative overflow-hidden ${FinledgerTheme.accent.glow}`}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />

        {/* Header */}
        <div className={`p-5 border-b ${FinledgerTheme.border} relative`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 ${FinledgerTheme.gradients.subtleEmerald} rounded-xl`}
              >
                <Building2 className="text-emerald-400" size={22} />
              </div>
              <div>
                <h2
                  className={`text-xl font-bold ${FinledgerTheme.text.primary}`}
                >
                  Create New Biller
                </h2>
                <p className={`text-sm ${FinledgerTheme.text.secondary}`}>
                  Add utility company details
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 hover:bg-slate-800/50 rounded-lg transition-all ${FinledgerTheme.text.secondary} hover:text-white`}
              disabled={isSubmitting}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={onHandleSubmit}
          className="p-5 space-y-5 relative"
        >
      
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-lg text-sm animate-slideDown">
              {error}
            </div>
          )}

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Biller Name */}
            <div>
              <label
                className={`block text-sm font-semibold ${FinledgerTheme.text.secondary} mb-2`}
              >
                Biller Name * 
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Building2 size={16} className="text-emerald-400" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., BSES Yamuna Power"
                  className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} w-full pl-10 pr-4 py-3 rounded-xl`}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label
                className={`block text-sm font-semibold ${FinledgerTheme.text.secondary} mb-2`}
              >
                Category *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} w-full px-4 py-3 rounded-xl flex items-center justify-between group`}
                  disabled={isSubmitting}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedCategory?.icon}</span>
                    <span className={FinledgerTheme.text.primary}>
                      {selectedCategory?.label}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-emerald-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className={`absolute top-full left-0 right-0 mt-1 ${FinledgerTheme.card} ${FinledgerTheme.border} rounded-xl shadow-2xl shadow-emerald-500/20 z-10 animate-slideDown`}
                  >
                    <div className="p-2 max-h-48 overflow-y-auto">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              category: category.value,
                            });
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 transition-all ${
                            formData.category === category.value
                              ? "bg-emerald-500/10 text-emerald-400"
                              : FinledgerTheme.text.secondary
                          }`}
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm">{category.label}</span>
                          {formData.category === category.value && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Email */}
            <div>
              <label
                className={`block text-sm font-semibold ${FinledgerTheme.text.secondary} mb-2`}
              >
                Contact Email *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail size={16} className="text-emerald-400" />
                </div>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  placeholder="billing@company.com"
                  className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} w-full pl-10 pr-4 py-3 rounded-xl`}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Contact Phone */}
            <div>
              <label
                className={`block text-sm font-semibold ${FinledgerTheme.text.secondary} mb-2`}
              >
                Contact Phone *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Phone size={16} className="text-emerald-400" />
                </div>
                <input
                  type="number"
                  maxLength={10}
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                  placeholder="1800-123-456"
                  className={`${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} w-full pl-10 pr-4 py-3 rounded-xl`}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div
            className={`p-3 ${FinledgerTheme.gradients.subtleEmerald} rounded-xl border ${FinledgerTheme.border}`}
          >
            <div className="flex items-start gap-2">
              <Sparkles
                size={16}
                className="text-emerald-400 mt-0.5 flex-shrink-0"
              />
              <p className={`text-xs ${FinledgerTheme.text.secondary}`}>
                <span className="font-semibold text-emerald-400">Note:</span> A
                user account and collection account will be automatically
                created for this biller.
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`${FinledgerTheme.button.secondary} flex-1 py-3.5 rounded-xl font-medium hover:scale-[1.02] transition-transform`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${FinledgerTheme.button.primary} flex-1 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform relative overflow-hidden`}
            >
              {/* Button Glow Effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 animate-shimmer" />

              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin relative z-10" size={18} />
                  <span className="relative z-10">Creating...</span>
                </>
              ) : (
                <>
                  <Building2 size={18} className="relative z-10" />
                  <span className="relative z-10">Create Biller</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBillerModal;
