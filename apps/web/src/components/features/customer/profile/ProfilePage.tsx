"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { ProfileHeader } from "@/components/reusables/profile/ProfileHeader";
import { TabNavigation, TabType } from "@/components/features/customer/profile/TabNavigation";
import { PersonalInfoTab } from "@/components/reusables/profile/ProfileInfoTab";
import { AccountsTab } from "@/components/features/customer/account/AccountsTab";

import {
  useUserProfile,
  useUpdateUserProfile,
  useCreateBankAccount,
  useUserAccounts,
} from "@/hooks/api/useProfileAndAccount";

import { IUser, IAccount } from "@/types/user-account";
import { toast } from "sonner";
import { useAuthUserStore } from "@/store";

export function ProfilePage() {
  const { theme: t } = useTheme();
  const { user } = useAuthUserStore();
  const userId = user?.id;

  const [activeTab, setActiveTab] = useState<TabType>("personal");

  const userProfileQuery = useUserProfile(userId!);
  const updateUserProfile = useUpdateUserProfile(userId!);

  const userAccountsQuery = useUserAccounts(userId!);
  const createBankAccount = useCreateBankAccount();

  const [userState, setUserState] = useState<IUser | null>(null);
  const [accountsState, setAccountsState] = useState<IAccount[]>([]);

  // Sync profile
  useEffect(() => {
    if (userProfileQuery.isSuccess) {
      setUserState(userProfileQuery.data.data);
    }
  }, [userProfileQuery.isSuccess]);

  // Sync accounts
  useEffect(() => {
    if (userAccountsQuery.isSuccess) {
      setAccountsState(userAccountsQuery.data.data);
    }
  }, [userAccountsQuery.isSuccess]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={cn("animate-pulse text-lg font-black uppercase tracking-[0.3em]", t.text.muted)}>
          Initializing session...
        </div>
      </div>
    );
  }

  if (userProfileQuery.isLoading || !userState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={cn("animate-pulse text-lg font-black uppercase tracking-[0.3em]", t.text.muted)}>
          Loading profile...
        </div>
      </div>
    );
  }

  if (userProfileQuery.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-black uppercase tracking-widest">
        Protocol Failure: Profile Data Inaccessible
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

  // Add or update account in state
  const handleAccounts = (updatedAccount: IAccount) => {
    setAccountsState((prev) => {
      const exists = prev.some((acc) => acc.id === updatedAccount.id);

      if (exists) {
        // update existing
        return prev.map((acc) =>
          acc.id === updatedAccount.id ? updatedAccount : acc
        );
      }

      // add new
      return [...prev, updatedAccount];
    });
  };

  const handleCreateBankAccount = (
    data: { nickname: string; type: string; currency: string },
    onSuccessCallback: (account: IAccount) => void
  ) => {
    createBankAccount.mutate(
      { ...data, userId: userId! },
      {
        onError: (err) => toast.error(err.message),
        onSuccess: (res) => {
          toast.success("Account created successfully");

          const createdAccount: IAccount = res.data;

          handleAccounts(createdAccount);
          onSuccessCallback(createdAccount);
        },
      }
    );
  };

  return (
    <div className={`min-h-screen p-6`}>
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
            handleAccounts={handleAccounts}
            userKycData={userState}
            accounts={accountsState}  
          />
        )}
      </div>
    </div>
  );
}
