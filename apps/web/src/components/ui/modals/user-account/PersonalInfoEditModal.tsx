"use client"
import { X, User, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { IUser } from '@/types/user-account';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PersonalInfoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData:Partial<IUser>) => void;
  userProfile:IUser
}

export function PersonalInfoEditModal({
  isOpen,
  onClose,
  onSave,
  userProfile
}: PersonalInfoEditModalProps) {
  const { theme: t, mode } = useTheme();

  const [formData, setFormData] = useState({
    firstName: userProfile.personalInfo.firstName,
    lastName: userProfile.personalInfo.lastName,
    street: userProfile.address.street,
    city: userProfile.address.city,
    state: userProfile.address.state,
    zipCode: userProfile.address.zipCode,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      personalInfo:{
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: userProfile.personalInfo.dateOfBirth,
      },
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: userProfile.address.country,
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: userProfile.personalInfo.firstName,
        lastName: userProfile.personalInfo.lastName,
        street: userProfile.address.street,
        city: userProfile.address.city,
        state: userProfile.address.state,
        zipCode: userProfile.address.zipCode,
    });
  }
}, [isOpen, userProfile]);

if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "relative w-full max-w-lg overflow-hidden flex flex-col shadow-2xl",
          t.card.base,
          t.radius.lg
        )}
      >
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
           <h3 className={cn("text-lg font-bold", t.text.heading)}>Edit Profile</h3>
           <button
             onClick={onClose}
             className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400"
           >
             <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <User size={14} className="text-[#4caf50]" />
               <span className={cn("text-[10px] font-bold uppercase tracking-wider opacity-60", t.text.muted)}>Legal Name</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-40 ml-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={cn(
                    "w-full h-11 px-4 rounded-xl border text-sm font-medium",
                    mode === 'dark' ? "bg-white/5 border-white/5 focus:border-[#c1ff72]" : "bg-slate-50 border-slate-200 focus:border-[#4caf50]"
                  )}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-40 ml-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={cn(
                    "w-full h-11 px-4 rounded-xl border text-sm font-medium",
                    mode === 'dark' ? "bg-white/5 border-white/5 focus:border-[#c1ff72]" : "bg-slate-50 border-slate-200 focus:border-[#4caf50]"
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-2">
               <MapPin size={14} className="text-[#4caf50]" />
               <span className={cn("text-[10px] font-bold uppercase tracking-wider opacity-60", t.text.muted)}>Primary Residence</span>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-40 ml-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={cn(
                    "w-full h-11 px-4 rounded-xl border text-sm font-medium",
                    mode === 'dark' ? "bg-white/5 border-white/5 focus:border-[#c1ff72]" : "bg-slate-50 border-slate-200 focus:border-[#4caf50]"
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-bold opacity-40 ml-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl border text-sm font-medium",
                      mode === 'dark' ? "bg-white/5 border-white/5 focus:border-[#c1ff72]" : "bg-slate-50 border-slate-200 focus:border-[#4caf50]"
                    )}
                  />
                </div>
                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-bold opacity-40 ml-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl border text-sm font-medium",
                      mode === 'dark' ? "bg-white/5 border-white/5 focus:border-[#c1ff72]" : "bg-slate-50 border-slate-200 focus:border-[#4caf50]"
                    )}
                  />
                </div>
                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-bold opacity-40 ml-1">ZIP</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl border text-sm font-medium",
                      mode === 'dark' ? "bg-white/5 border-white/5 focus:border-[#c1ff72]" : "bg-slate-50 border-slate-200 focus:border-[#4caf50]"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/2 flex gap-3">
           <button
             type="button"
             onClick={onClose}
             className={cn(
               "flex-1 h-11 rounded-xl text-xs font-bold transition-all",
               mode === 'dark' ? "bg-white/5 text-white hover:bg-white/10" : "bg-white border border-slate-200 text-slate-900"
             )}
           >
             Cancel
           </button>
           <button
             onClick={handleSubmit}
             className={cn(
               "flex-1 h-11 rounded-xl text-xs font-bold transition-all",
               mode === 'dark' ? "bg-[#c1ff72] text-[#0a1a15]" : "bg-slate-900 text-white"
             )}
           >
             Save Changes
           </button>
        </div>
      </motion.div>
    </div>
  );
}
