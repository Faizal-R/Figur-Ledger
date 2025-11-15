"use client";
import { useState } from "react";

import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/api/useAuth";
import { useAuthUserStore } from "@/store";
import { IUser } from "@/types/user-account";
import { Roles } from "@figur-ledger/types";

export default function RegisterForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: Roles.CUSTOMER,
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    agreeToTerms: false,
  });

  const updateField = (path: string, value: any) => {
    const keys = path.split(".");
    setFormData((prev: any) => {
      const updated = { ...prev };
      let obj = updated;
      keys.forEach((k, i) => {
        if (i === keys.length - 1) obj[k] = value;
        else obj = obj[k];
      });
      return updated;
    });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const navigate = useRouter();
  const { register } = useAuth();
  const { login: setUserInStore } = useAuthUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the Terms & Privacy Policy");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

       register.mutate(formData,{
        onError:(err)=>toast.error(err.message),
        onSuccess:(data)=>{
          console.log("Rsponsedata",data.data)
          if(data.success){
            toast.success(data.message);
           navigate.push(`/verify/otp?email=${data.data.email}`)
          }
        }

        
      });
     
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-5 bg-slate-900">
      <div className="w-full max-w-md space-y-8 animate-fade-in-left">
        <div className="lg:hidden text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-emerald-400">
            Fin<span className="text-emerald-500">Ledger</span>
          </h1>
          <p className="text-slate-400">Advanced Banking Platform</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Create an account
          </h2>
          <p className="text-slate-400">Step {step} of 4</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: EMAIL + PHONE */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-100">Email</Label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value.replace(/\D/g, ""))
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 transition-all"
                />
              </div>

              <Button
                type="button"
                onClick={nextStep}
                className="w-full h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* STEP 2: PERSONAL INFO */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-100">First Name</Label>
                <Input
                  placeholder="John"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    updateField("personalInfo.firstName", e.target.value)
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">Last Name</Label>
                <Input
                  placeholder="Doe"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    updateField("personalInfo.lastName", e.target.value)
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) =>
                    updateField("personalInfo.dateOfBirth", e.target.value)
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="ghost"
                  className="text-slate-400"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: ADDRESS */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-100">Street</Label>
                <Input
                  placeholder="Street Address"
                  value={formData.address.street}
                  onChange={(e) =>
                    updateField("address.street", e.target.value)
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">City</Label>
                <Input
                  value={formData.address.city}
                  onChange={(e) => updateField("address.city", e.target.value)}
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">State</Label>
                <Input
                  value={formData.address.state}
                  onChange={(e) => updateField("address.state", e.target.value)}
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">Zip Code</Label>
                <Input
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    updateField("address.zipCode", e.target.value)
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">Country</Label>
                <Input
                  value={formData.address.country}
                  onChange={(e) =>
                    updateField("address.country", e.target.value)
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="ghost"
                  className="text-slate-400"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: PASSWORD + TERMS */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-100">Password</Label>
                <Input
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-100">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  className="h-12 bg-[#18212f] border border-slate-700 text-slate-100"
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(v) =>
                    updateField("agreeToTerms", v as boolean)
                  }
                  className="mt-1 border border-slate-700 data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-400 leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-emerald-400 hover:text-emerald-500 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-emerald-400 hover:text-emerald-500 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="ghost"
                  className="text-slate-400"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                <Button
                  type="submit"
                  className="w-40 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
                >
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </form>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-400 hover:text-emerald-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
