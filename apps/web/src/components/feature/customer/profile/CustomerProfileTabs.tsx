"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfoTab from "@/components/reusables/profile/ProfileInfoTab";
import AccountsTab from "@/components/feature/customer/profile/AccountsTab";
import { CreditCard, User } from "lucide-react";
import { IAccount, IUser } from "@/types/user-account";
import {
  useUserAccounts,
  useUserProfile,
} from "@/hooks/api/useProfileAndAccount";
import { useAuthUserStore } from "@/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const CustomerProfileTabs: React.FC = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [userAccounts, setUserAccounts] = useState<IAccount[]>([]);

  const { user } = useAuthUserStore();

  const { userProfileQuery } = useUserProfile(user?.id!);

  const { userAccountsQuery } = useUserAccounts(user?.id!);

  const { data: userProfileData, isLoading, isError } = userProfileQuery;
  const { data: userAccountsData } = userAccountsQuery;

  const handleUserDataChange = (updatedData: IUser) => {
    setUserData(updatedData);
  };

  useEffect(() => {
    if (userProfileData) setUserData(userProfileData.data);
  }, [userProfileData]);

  useEffect(() => {
    if (userAccountsData) setUserAccounts(userAccountsData.data);
  }, [userAccountsData]);

  if (!user) return <p>Loading user...</p>;
  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Error loading profile.</p>;

  return (
    <div className="w-full">
      <Tabs defaultValue="profile" className="w-full">
        {/* Tab Headers */}
        {userData?.role === "customer" && (
          <TabsList className="flex gap-4 md:gap-6 bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2 shadow-[0_4px_16px_rgba(16,185,129,0.1)] mb-6">
            <TabsTrigger
              value="profile"
              className="
              flex items-center px-4 py-2 rounded-lg text-slate-300 
              hover:text-emerald-400 hover:bg-emerald-400/10
              data-[state=active]:bg-emerald-400/20 
              data-[state=active]:text-emerald-400
              data-[state=active]:shadow-[0_0_10px_rgba(16,185,129,0.3)]
              transition-all duration-300 font-medium
            "
            >
              <User className="h-4 w-4 mr-2" />
              Profile Info
            </TabsTrigger>

            <TabsTrigger
              value="accounts"
              className="
              flex items-center px-4 py-2 rounded-lg text-slate-300 
              hover:text-emerald-400 hover:bg-emerald-400/10
              data-[state=active]:bg-emerald-400/20 
              data-[state=active]:text-emerald-400
              data-[state=active]:shadow-[0_0_10px_rgba(16,185,129,0.3)]
              transition-all duration-300 font-medium
            "
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Accounts
            </TabsTrigger>
          </TabsList>
        )}

        {/* Profile Info Tab */}
        <TabsContent
          value="profile"
          className="mt-2 transition-all duration-300 animate-fadeIn"
        >
          <ProfileInfoTab
            customerData={userData!}
            setCustomerData={handleUserDataChange}
          />
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent
          value="accounts"
          className="mt-2 transition-all duration-300 animate-fadeIn"
        >
          <AccountsTab accounts={userAccounts} />
       
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerProfileTabs;
