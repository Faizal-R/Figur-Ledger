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
import { Roles } from "@/types/role";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";


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
  const { theme: t } = useTheme();

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
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full max-w-md p-8 ${t.card.base} ${t.radius.lg} border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden transition-all duration-700 font-jakarta`}
    >
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-[#c1ff72]/10 blur-3xl rounded-full -z-10" />

      <div className="space-y-6 relative z-10">
        <div className="space-y-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "40px" }}
            className="h-1 bg-[#c1ff72] rounded-full"
          />
          <h2 className={`text-3xl font-black tracking-tighter ${t.text.display}`}>Create Account.</h2>
          <p className={`text-sm ${t.text.muted} font-medium`}>
            Step {step} of 4: Node registration in progress.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: EMAIL + PHONE */}
          {step === 1 && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Email Address</Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>

              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value.replace(/\D/g, ""))
                  }
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>

              <Button
                type="button"
                onClick={nextStep}
                className={`w-full h-12 ${t.button.primary} ${t.radius.md} flex items-center justify-center gap-4 group shadow-xl transition-all`}
              >
                <span className="uppercase tracking-[0.3em] text-[11px]">Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}

          {/* STEP 2: PERSONAL INFO */}
          {step === 2 && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>First Name</Label>
                <Input
                  placeholder="What's your name?"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    updateField("personalInfo.firstName", e.target.value)
                  }
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>

              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Last Name</Label>
                <Input
                  placeholder="Last name"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    updateField("personalInfo.lastName", e.target.value)
                  }
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>

              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) =>
                    updateField("personalInfo.dateOfBirth", e.target.value)
                  }
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs opacity-50 focus:opacity-100 ${t.text.heading}`}
                />
              </div>

              <div className="flex justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted} hover:text-[#c1ff72] transition-colors flex items-center`}
                >
                  <ArrowLeft className="w-3 h-3 mr-1" /> Back
                </button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className={`flex-1 h-12 ${t.button.primary} ${t.radius.md} flex items-center justify-center gap-4 group shadow-xl transition-all`}
                >
                  <span className="uppercase tracking-[0.3em] text-[11px]">Continue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: ADDRESS */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Street Address</Label>
                  <Input
                    placeholder="Where do you live?"
                    value={formData.address.street}
                    onChange={(e) => updateField("address.street", e.target.value)}
                    className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>City</Label>
                  <Input
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) => updateField("address.city", e.target.value)}
                    className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>State / Province</Label>
                  <Input
                    placeholder="State"
                    value={formData.address.state}
                    onChange={(e) => updateField("address.state", e.target.value)}
                    className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Zip / Postal Code</Label>
                  <Input
                    placeholder="Zip code"
                    value={formData.address.zipCode}
                    onChange={(e) => updateField("address.zipCode", e.target.value)}
                    className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Country</Label>
                <Input
                  placeholder="Select country"
                  value={formData.address.country}
                  onChange={(e) => updateField("address.country", e.target.value)}
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>

              <div className="flex justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted} hover:text-[#c1ff72] transition-colors flex items-center`}
                >
                  <ArrowLeft className="w-3 h-3 mr-1" /> Back
                </button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className={`flex-1 h-12 ${t.button.primary} ${t.radius.md} flex items-center justify-center gap-4 group shadow-xl transition-all`}
                >
                  <span className="uppercase tracking-[0.3em] text-[11px]">Continue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: PASSWORD + TERMS */}
          {step === 4 && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Password</Label>
                <Input
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>

              <div className="space-y-1">
                <Label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  className={`w-full h-11 px-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(v) =>
                    updateField("agreeToTerms", v as boolean)
                  }
                  className="mt-1 border border-black/10 dark:border-white/10 data-[state=checked]:bg-[#c1ff72] data-[state=checked]:border-[#c1ff72]"
                />
                <label
                  htmlFor="terms"
                  className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted} cursor-pointer leading-tight`}
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#4caf50] hover:text-[#c1ff72] transition-colors"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#4caf50] hover:text-[#c1ff72] transition-colors"
                  >
                    Privacy
                  </Link>
                </label>
              </div>

              <div className="flex justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`text-[10px] font-black uppercase tracking-widest ${t.text.muted} hover:text-[#c1ff72] transition-colors flex items-center`}
                >
                  <ArrowLeft className="w-3 h-3 mr-1" /> Back
                </button>

                <Button
                  type="submit"
                  className={`flex-1 h-12 ${t.button.primary} ${t.radius.md} flex items-center justify-center gap-4 group shadow-xl transition-all`}
                >
                  <span className="uppercase tracking-[0.3em] text-[11px]">Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}
        </form>

        <p className={`text-center text-[11px] font-extrabold ${t.text.muted} uppercase tracking-widest`}>
          Linked to the node?{" "}
          <Link
            href="/login"
            className="text-[#4caf50] hover:text-[#c1ff72] transition-colors ml-2 underline underline-offset-4 decoration-[#c1ff72]/30"
          >
            Authenticate
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
