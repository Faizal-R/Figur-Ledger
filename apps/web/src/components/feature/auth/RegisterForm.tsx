"use client"
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/api/useAuth";
import { useAuthUserStore } from "@/store";
import { IUser } from "@/types/user-account";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    phone: "",
  });

  const navigate = useRouter();
  const { register } = useAuth();
  const { login: setUserInStore } = useAuthUserStore();

  const updateFormData = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    updateFormData("phoneNumber", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await register.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (res.success) {
        // Convert the response user to IUser format and set in store
        const userData: IUser = {
          id: res.data.user.id.toString(),
          fullName: res.data.user.fullName,
          email: res.data.user.email,
          phone: formData.phone, // Use the phone from form
          isActive: true, // Assume active if registration successful
          createdAt: new Date().toISOString(),
          role:res.data.user.role
        };
        
        // Set user in Zustand store
        setUserInStore(userData);
        
        // Navigate to dashboard
        navigate.push(`/${res.data.user.role.toLowerCase()}/dashboard`);
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
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
          <p className="text-slate-400">
            Join FinLedger and start managing your finances smarter.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-100">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                className="h-12 bg-[#18212f] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-100">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="h-12 bg-[#18212f] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-slate-100">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="1234567890"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="h-12 bg-[#18212f] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-100">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className="h-12 bg-[#18212f] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-100">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                className="h-12 bg-[#18212f] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 transition-all"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
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
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all group"
            size="lg"
            disabled={!formData.agreeToTerms}
          >
            Create Account
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
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
};

export default RegisterForm;
