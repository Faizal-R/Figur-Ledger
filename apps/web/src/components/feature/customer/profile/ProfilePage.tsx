"use client";
import { useEffect, useState } from "react";
import { FinledgerTheme } from "@/theme";
import { ProfileHeader } from "@/components/reusables/profile/ProfileHeader";
import { TabNavigation, TabType } from "@/components/feature/customer/profile/TabNavigation";
import { PersonalInfoTab } from "@/components/reusables/profile/ProfileInfoTab";
import { AccountsTab } from "@/components/feature/customer/account/AccountsTab";

import {
  useUserProfile,
  useUpdateUserProfile,

  useCreateBankAccount,
} from "@/hooks/api/useProfileAndAccount";

import { IUser, IAccount } from "@/types/user-account";
import { toast } from "sonner";
import { useAuthUserStore } from "@/store";

export function ProfilePage() {
 
  const {user} = useAuthUserStore()
  const userId=user?.id
  // const userId= "6918385052ba50872af20f77"

  const [activeTab, setActiveTab] = useState<TabType>("personal");
  
  const userProfileQuery = useUserProfile(userId!);
  const updateUserProfile = useUpdateUserProfile(userId!);
  
  // const userAccountsQuery = useUserAccounts(user.id);
  const createBankAccount = useCreateBankAccount();
  
  const [userState, setUserState] = useState<IUser | null>(null);
  
  
  useEffect(() => {
    if (userProfileQuery.isSuccess) {
      setUserState(userProfileQuery.data.data);
    }
  }, [userProfileQuery]);
  
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-300 text-lg">
          Initializing session...
        </div>
      </div>
    );
  }
  if (userProfileQuery.isLoading || !userState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-300 text-lg">
          Loading profile...
        </div>
      </div>
    );
  }


  if (userProfileQuery.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load profile.
      </div>
    );    
  }


  const handleUserProfile = (updatedUserProfile: IUser) => {
    updateUserProfile.mutate(updatedUserProfile, {
      onError: (err) => toast.error(err.message),
      onSuccess: (res) => {
        setUserState(res.data);
        toast.success("Profile updated successfully");
      },
    });
  };

  const handleCreateBankAccount = (data: {
    nickname: string;
    type: string;
    currency: string;
  }) => {
    createBankAccount.mutate(
      { ...data, userId:userId! },
      {
        onError: (err) => toast.error(err.message),
        onSuccess: () => {
          toast.success("Account created successfully");
          
        },
      }
    );
  };

  return (
    <div className={`min-h-screen ${FinledgerTheme.background} p-6`}>
      <div className="max-w-6xl mx-auto">

        <ProfileHeader user={userState} />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "personal" && (
          <PersonalInfoTab
            user={userState}
            handleUserProfile={handleUserProfile}
          />
        )}

        {activeTab === "accounts" && (
          <AccountsTab
            createAccount={handleCreateBankAccount}
            handleAccounts={(accounts: IAccount[]) => console.log(accounts)}
            userKycData={userState}
            accounts={ []}
          />
        )}

      </div>
    </div>
  );
}
