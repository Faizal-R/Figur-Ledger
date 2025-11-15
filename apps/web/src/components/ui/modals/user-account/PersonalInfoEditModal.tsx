"use client"
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FinledgerTheme } from '@/theme';
import { PersonalInfo, AddressInfo, IUser } from '@/types/user-account';

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
    onSave(
     { personalInfo:{
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
      }}
    );
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
}, [isOpen]);

if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} max-w-2xl w-full p-6 relative`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition-colors`}
        >
          <X className={`w-5 h-5 ${FinledgerTheme.text.secondary}`} />
        </button>

        <h2 className={`text-2xl font-bold ${FinledgerTheme.text.primary} mb-6`}>
          Edit Personal Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className={`text-lg font-semibold ${FinledgerTheme.text.primary} mb-4`}>
              Name
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full ${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} px-4 py-2 ${FinledgerTheme.radius.md}`}
                />
              </div>
              <div>
                <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full ${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} px-4 py-2 ${FinledgerTheme.radius.md}`}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${FinledgerTheme.text.primary} mb-4`}>
              Address
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`w-full ${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} px-4 py-2 ${FinledgerTheme.radius.md}`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full ${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} px-4 py-2 ${FinledgerTheme.radius.md}`}
                  />
                </div>
                <div>
                  <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full ${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} px-4 py-2 ${FinledgerTheme.radius.md}`}
                  />
                </div>
                <div>
                  <label className={`text-sm ${FinledgerTheme.text.muted} mb-2 block`}>
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full ${FinledgerTheme.input.base} ${FinledgerTheme.input.focus} px-4 py-2 ${FinledgerTheme.radius.md}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 ${FinledgerTheme.radius.md} border ${FinledgerTheme.border} ${FinledgerTheme.text.secondary} hover:bg-slate-800/50 transition-colors font-medium`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 ${FinledgerTheme.button.primary} ${FinledgerTheme.radius.md} font-medium`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
