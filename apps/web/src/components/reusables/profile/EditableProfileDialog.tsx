"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { IUser } from "@/types/user-account";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number too long"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  customerData: IUser;
  setCustomerData: (data: IUser) => void;
  onUpdateUser: (updatedData: IUser) => Promise<void>;
}

const EditProfileDialog = ({
  isOpen,
  setIsOpen,
  customerData,
  setCustomerData,
  onUpdateUser,

}: EditProfileDialogProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});

  // Sync with latest customer data when dialog opens
  useEffect(() => {
    if (isOpen && customerData) {
      setFormData({
        fullName: customerData.fullName ? String(customerData.fullName) : "",
        email: customerData.email ? String(customerData.email) : "",
        phone: customerData.phone ? String(customerData.phone) : "",
      });
      setFormErrors({});
    }
  }, [isOpen, customerData]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    const validated = profileSchema.safeParse(formData);

    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors;
      setFormErrors({
        fullName: errors.fullName?.[0],
        email: errors.email?.[0],
        phone: errors.phone?.[0],
        
      });
      toast.error("Please correct the highlighted errors before saving.");
      return;
    }

    try {
      // ✅ Valid data - update backend first
      const updatedData = { ...customerData, ...validated.data };
      await onUpdateUser(updatedData);
      
      // Update local state
      setCustomerData(updatedData);
      setIsOpen(false);
      toast.success("Your profile information has been updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Update error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border border-slate-700 shadow-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-emerald-400">
            Edit Profile Information
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Update your personal information. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {(
            ["fullName", "email", "phone"] as (keyof ProfileFormData)[]
          ).map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={`edit-${field}`} className="text-slate-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={`edit-${field}`}
                type={field === "email" ? "email" : "text"}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Enter your ${field}`}
                className={`bg-slate-800 border ${
                  formErrors[field]
                    ? "border-red-500/70 focus-visible:ring-red-500"
                    : "border-slate-700 focus-visible:ring-emerald-500"
                } text-slate-100`}
              />
              {formErrors[field] && (
                <p className="text-sm text-red-400">{formErrors[field]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="default"
            onClick={() => setIsOpen(false)}
            className="border border-emerald-500/40 text-emerald-400
             bg-emerald-500/10 hover:text-emerald-300 transition-all
              hover:bg-none
             "
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 transition-all"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
