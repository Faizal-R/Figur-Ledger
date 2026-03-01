"use client";
import { User, MapPin, Globe, Edit2, Shield, Calendar, Radio, Hash, Layout } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { IUser as UserType } from '@/types/user-account';
import { PersonalInfoEditModal } from '@/components/ui/modals/user-account/PersonalInfoEditModal';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PersonalInfoTabProps {
  user: UserType;
  handleUserProfile: (user: UserType) => void;
}

export function PersonalInfoTab({ user, handleUserProfile }: PersonalInfoTabProps) {
  const { theme: t, mode } = useTheme();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleSavePersonalInfo = (updatedUser: Partial<UserType>) => {
    handleUserProfile({
      ...user,
      ...updatedUser,
    });
    setIsEditModalOpen(false);
  };

  const InfoBlock = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
    <div className={cn("p-6 rounded-2xl transition-all duration-300 group/item border", "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10")}>
      <div className="flex items-center gap-3 mb-2 opacity-40">
        <Icon size={14} className={t.text.muted} />
        <span className={cn("text-[10px] font-black uppercase tracking-widest", t.text.muted)}>{label}</span>
      </div>
      <p className={cn("text-lg font-black tracking-tight", t.text.heading)}>{value}</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <PersonalInfoEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePersonalInfo}
        userProfile={user}
      />

      {/* CORE IDENTITY MATRIX */}
      <div className={cn("relative overflow-hidden border shadow-3xl", t.card.base, t.radius.lg, "border-black/5 dark:border-white/10")}>
        <div className="p-8 md:p-10 border-b border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.02] dark:bg-white/[0.02]">
           <div className="flex items-center gap-5">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500",
                mode === 'dark' ? t.card.lime + " text-[#0a1a15]" : "bg-[#0a1a15] text-white"
              )}>
                <User size={24} />
              </div>
              <div>
                <h2 className={cn("text-3xl font-black tracking-tighter uppercase", t.text.display)}>Identity Matrix</h2>
                <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-50", t.text.muted)}>Core Operator Information</p>
              </div>
           </div>
           <button
             onClick={() => setIsEditModalOpen(true)}
             className={cn(
               "h-14 px-8 rounded-2xl border transition-all duration-500 font-black uppercase tracking-widest text-[11px] flex items-center gap-3",
               "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-[#c1ff72] hover:text-[#0a1a15] hover:border-[#b0f061]",
               t.text.heading
             )}
           >
             <Edit2 size={16} /> Update Registry
           </button>
        </div>

        <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <InfoBlock icon={Radio} label="Designation Prefix" value={user.personalInfo.firstName} />
           <InfoBlock icon={Hash} label="Signature Hash" value={user.personalInfo.lastName} />
           <InfoBlock icon={Calendar} label="Nodes Initialized" value={formatDate(new Date(user.personalInfo.dateOfBirth))} />
        </div>
      </div>

      {/* GEOGRAPHIC COORDINATES */}
      <div className={cn("relative overflow-hidden border shadow-3xl", t.card.base, t.radius.lg, "border-black/5 dark:border-white/10")}>
        <div className="p-8 md:p-10 border-b border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.02] dark:bg-white/[0.02]">
           <div className="flex items-center gap-5">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500",
                mode === 'dark' ? t.card.lime + " text-[#0a1a15]" : "bg-[#0a1a15] text-white"
              )}>
                <MapPin size={24} />
              </div>
              <div>
                <h2 className={cn("text-3xl font-black tracking-tighter uppercase", t.text.display)}>Geographic Nodes</h2>
                <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-50", t.text.muted)}>Operational Basing Coordinates</p>
              </div>
           </div>
        </div>

        <div className="p-8 md:p-10 space-y-8">
           <div className={cn("p-10 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 transition-all duration-500 hover:border-black/20 dark:hover:border-white/20")}>
              <div className="flex items-center gap-3 mb-3 opacity-40">
                 <Shield size={14} className={t.text.muted} />
                 <span className={cn("text-[10px] font-black uppercase tracking-widest", t.text.muted)}>Physical Vector</span>
              </div>
              <p className={cn("text-2xl font-black tracking-tight", t.text.heading)}>{user.address.street}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoBlock icon={Layout} label="Sector" value={user.address.city} />
              <InfoBlock icon={Shield} label="Territory" value={user.address.state} />
              <InfoBlock icon={Hash} label="Postal Code" value={user.address.zipCode} />
              <div className={cn("p-6 rounded-2xl transition-all duration-500 group/item border bg-[#c1ff72]/5 border-[#c1ff72]/20 hover:border-[#b0f061]")}>
                <div className="flex items-center gap-3 mb-2 opacity-60">
                   <Globe size={14} className="text-[#c1ff72]" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#c1ff72]">Global Domain</span>
                </div>
                <p className={cn("text-lg font-black tracking-tight", t.text.heading)}>{user.address.country}</p>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
