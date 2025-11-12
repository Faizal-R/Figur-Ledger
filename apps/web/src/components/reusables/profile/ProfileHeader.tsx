"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";

import profileAvatar from "@/assets/hero-finance.jpg";
import { toast } from "sonner";
import { useAuthUser } from "@/store";

// Example: fetch customer data inside component

const ProfileHeader = () => {
  const customerData=useAuthUser()
  console.log(customerData)
  const [avatar, setAvatar] = useState(profileAvatar);
 

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast("Upload < 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast("Upload image only");
      return;
    }

    // const reader = new FileReader();
    // reader.onloadend = () => setAvatar(reader.result as string);
    // reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-800/80 border border-emerald-400/30 shadow-emerald-500/30 hover:shadow-emerald-500/40 rounded-xl transition-all hover:-translate-y-1 p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-emerald-400/30 shadow-emerald-500/30 rounded-full">
          <AvatarImage src={avatar.src} alt={customerData?.fullName} />
          <AvatarFallback className="text-slate-100 font-bold">
            {customerData?.fullName ? customerData.fullName.split(" ").map(n => n[0]).join("") : "U"}
          </AvatarFallback>
        </Avatar>
        <label
          htmlFor="avatar-upload"
          className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
        >
          <Upload className="h-8 w-8 text-emerald-400" />
          <input id="avatar-upload" type="file" className="hidden" onChange={handleAvatarUpload} />
        </label>
      </div>
      <div className="flex-1 text-center md:text-left space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">{customerData?.fullName}</h2>
        <p className="text-sm text-slate-400">Role: {customerData?.role}</p>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <Badge className="bg-emerald-400/20 text-emerald-400 px-4 py-1 font-semibold rounded-full">
            {customerData?.isActive ? "Active" : "Inactive"}
          </Badge>
          <Badge className="border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 px-3 py-1 rounded-full">
            Member since {customerData?.createdAt ? new Date(customerData.createdAt).getFullYear() : "N/A"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
