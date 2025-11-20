import ProfileHeader from "@/components/reusables/profile/ProfileHeader";
import CustomerProfileTabs from "@/components/feature/customer/profile/CustomerProfileTabs";

const CustomerProfilePage = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <ProfileHeader />
        <CustomerProfileTabs />
      </div>
    </div>
  );
};

export default CustomerProfilePage;
