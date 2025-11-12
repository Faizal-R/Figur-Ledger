"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { User, Mail, Phone, MapPin } from "lucide-react";
import EditProfileDialog from "./EditableProfileDialog";
import { useState } from "react";
import { useUserProfile } from "@/hooks/api/useProfileAndAccount";
import { useAuthUser, useAuthUserStore } from "@/store";
import { IUser } from "@/types/user-account";

interface ProfileInfoTabProps {
  customerData: IUser;
  setCustomerData: (data: IUser) => void;
  // Remove customerData and setCustomerData props since we'll use the store
}

const ProfileInfoTab:React.FC<ProfileInfoTabProps> = ({ customerData, setCustomerData }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the dialog visibility
  const { updateUser } = useAuthUserStore();
  const { updateUserProfile } = useUserProfile(customerData?.id );
  
  const handleEditClick = () => {
    setIsOpen(true);
  };

  const handleUpdateUser = async (updatedData: IUser) => {
    if (!customerData?.id) {
      throw new Error('User ID is required for update');
    }
    
    try {
      await updateUserProfile.mutateAsync({ userId: customerData.id, updatedData });
      setCustomerData(updatedData); // Update local state
      updateUser(updatedData); // Update the Zustand store
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };  
  return (
 <>
   <Card className="bg-slate-800/60 border border-emerald-400/30 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_24px_rgba(16,185,129,0.4)] rounded-2xl transition-all duration-300">
  <CardHeader>
    <CardTitle className="text-slate-100 text-2xl">Personal Information</CardTitle>
    <CardDescription className="text-slate-400">
      Your contact details and personal information
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2">
      {/* Full Name */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/60 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg">
          <User className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-400">Full Name</p>
          <p className="font-semibold text-slate-100 mt-1">{customerData?.fullName || "skdflj"}</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/60 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-400">Email Address</p>
          <p className="font-semibold text-slate-100 mt-1">{customerData?.email}</p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/60 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg">
          <Phone className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-400">Phone Number</p>
          <p className="font-semibold text-slate-100 mt-1">{customerData?.phone}</p>
        </div>
      </div>

      {/* Address */}
      {/* <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/60 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-400">Address</p>
          <p className="font-semibold text-slate-100 mt-1">{customerData.address}</p>
        </div>
      </div> */}
    </div>

    <Separator className="bg-slate-700" />

    <div className="flex justify-end">
      <Button
        onClick={handleEditClick}
        className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white font-semibold px-6 transition-all duration-300"
      >
        Edit Profile
      </Button>
    </div>
  </CardContent>
</Card>


{customerData && (
  <EditProfileDialog 
    isOpen={isOpen} 
    setIsOpen={setIsOpen} 
    customerData={customerData} 
    setCustomerData={(data) => updateUser(data)}
    onUpdateUser={handleUpdateUser}
  />
)}
 </>

  );
};

export default ProfileInfoTab;
