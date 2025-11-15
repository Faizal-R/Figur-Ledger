"use client"
import { User, MapPin, Globe, Edit2 } from 'lucide-react';
import { FinledgerTheme } from '../../../theme';
import { PersonalInfo, IUser as UserType, AddressInfo } from '@/types/user-account';
import { PersonalInfoEditModal } from '@/components/ui/modals/user-account/PersonalInfoEditModal';
import { useState } from 'react';

interface PersonalInfoTabProps {
  user: UserType;
  handleUserProfile: (user: UserType) => void;
}

export function PersonalInfoTab({ user,handleUserProfile }: PersonalInfoTabProps) {
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
      ...updatedUser,}
)
   
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PersonalInfoEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePersonalInfo}
       userProfile={user}
      />

      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 relative overflow-hidden group`}
      >
        <div className={`absolute inset-0 ${FinledgerTheme.accent.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${FinledgerTheme.accent.gradient} ${FinledgerTheme.radius.sm}`}>
                <User className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className={`text-xl font-semibold ${FinledgerTheme.text.primary}`}>
                Personal Information
              </h3>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className={`p-2 hover:bg-slate-800/50 ${FinledgerTheme.radius.md} transition-colors`}
              title="Edit personal information"
            >
              <Edit2 className={`w-5 h-5 ${FinledgerTheme.text.secondary}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                First Name
              </label>
              <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                {user.personalInfo.firstName}
              </p>
            </div>
            <div>
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                Last Name
              </label>
              <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                {user.personalInfo.lastName}
              </p>
            </div>
            <div>
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                Date of Birth
              </label>
              <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                {formatDate(new Date(user.personalInfo.dateOfBirth))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-6 relative overflow-hidden group`}
      >
        <div className={`absolute inset-0 ${FinledgerTheme.accent.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${FinledgerTheme.accent.gradient} ${FinledgerTheme.radius.sm}`}>
                <MapPin className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className={`text-xl font-semibold ${FinledgerTheme.text.primary}`}>
                Address Details
              </h3>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className={`p-2 hover:bg-slate-800/50 ${FinledgerTheme.radius.md} transition-colors`}
              title="Edit address"
            >
              <Edit2 className={`w-5 h-5 ${FinledgerTheme.text.secondary}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="md:col-span-2">
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                Street Address
              </label>
              <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                {user.address.street}
              </p>
            </div>
            <div>
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>City</label>
              <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                {user.address.city}
              </p>
            </div>
            <div>
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>State</label>
              <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                {user.address.state}
              </p>
            </div>
            <div>
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                ZIP Code
              </label>
              <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                {user.address.zipCode}
              </p>
            </div>
            <div>
              <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>Country</label>
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 ${FinledgerTheme.text.secondary}`} />
                <p className={`text-lg ${FinledgerTheme.text.primary} font-medium`}>
                  {user.address.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
