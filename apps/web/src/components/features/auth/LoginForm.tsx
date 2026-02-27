"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/api/useAuth";
import { useAuthUserStore } from "@/store";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { setUser: setUserInStore, setToken } = useAuthUserStore();
  const { theme: t, mode } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Deployment credentials required: Identity missing");
    if (!password.trim()) return toast.error("Deployment credentials required: Access key missing");

    login.mutate(
      { email, password },
      {
        onSuccess: (res: any) => {
          setUserInStore({
            email: res.data.user.email,
            id: res.data.user.id as string,
            phone: res.data.user.phone,
            role: res.data.user.role,
            accountId: res.data.user.accountId
          });
          setToken(res.data.accessToken);
          router.push(`/${res.data.user.role.toLowerCase()}/dashboard`);
          toast.success("Identity Verified. Session active.");
        },
        onError: (err: any) => {
          toast.error(err.message || "Authentication failed: Clearance denied");
        },
      }
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full max-w-md p-8 ${t.card.base} ${t.radius.lg} border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden transition-all duration-700`}
    >
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-[#c1ff72]/10 blur-3xl rounded-full -z-10" />
      
      <div className="space-y-6 relative z-10">
        <div className="space-y-3">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "40px" }}
            className="h-1 bg-[#c1ff72] rounded-full"
          />
          <h2 className={`text-3xl font-black tracking-tighter ${t.text.display}`}>Welcome Back.</h2>
          <p className={`text-base ${t.text.muted} font-medium`}>
            Re-authenticate to your global node.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted} ml-1`}>Identity Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c1ff72] opacity-50 group-focus-within:opacity-100 transition-opacity">
                   <Mail size={16} />
                </div>
                <input
                  type="email"
                  placeholder="operator@figurledger.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-12 pl-12 pr-6 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted}`}>Access Key</label>
                <Link href="/forgot-password" className={`text-[9px] font-black uppercase tracking-widest text-[#4caf50] hover:text-[#c1ff72] transition-colors`}>Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c1ff72] opacity-50 group-focus-within:opacity-100 transition-opacity">
                   <Lock size={16} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-12 pl-12 pr-6 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} outline-none focus:border-[#c1ff72]/50 focus:bg-white dark:focus:bg-[#0a1a15] transition-all font-bold text-xs ${t.text.heading}`}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full h-14 ${t.button.primary} ${t.radius.md} flex items-center justify-center gap-4 group shadow-xl`}
          >
            <span className="uppercase tracking-[0.3em] text-[11px]">Initialize Session</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-black/5 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]">
            <span className={`${mode === 'dark' ? 'bg-[#0a1a15]' : 'bg-white'} px-4 transition-colors ${t.text.muted}`}>Secure Hubs</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className={`h-11 flex items-center justify-center gap-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} hover:bg-[#c1ff72] hover:text-[#0a1a15] transition-all group`}>
             <Sparkles size={14} className="text-[#c1ff72] group-hover:text-[#0a1a15]" />
             <span className="text-[9px] font-black uppercase tracking-widest">Enterprise</span>
          </button>
          <button className={`h-11 flex items-center justify-center gap-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${t.radius.md} hover:bg-[#c1ff72] hover:text-[#0a1a15] transition-all group`}>
             <ArrowRight size={14} className="text-[#c1ff72] group-hover:text-[#0a1a15]" />
             <span className="text-[9px] font-black uppercase tracking-widest">Global Auth</span>
          </button>
        </div>

        <p className={`text-center text-[11px] font-extrabold ${t.text.muted} uppercase tracking-widest`}>
          New to the architecture?{" "}
          <Link href="/register" className="text-[#4caf50] hover:text-[#c1ff72] transition-colors ml-2 underline underline-offset-4 decoration-[#c1ff72]/30">Start Onboarding</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;
