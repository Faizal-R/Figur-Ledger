import {  ProfilePage } from "@/components/feature/customer/profile/ProfilePage";
import { IUser } from "@/types/user-account";
import { DateString, Roles } from "@figur-ledger/types";



const CustomerProfilePage = () => {

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* <ProfileHeader /> */}
      <ProfilePage/>
        
      </div>
    </div>
  );
};

export default CustomerProfilePage;
