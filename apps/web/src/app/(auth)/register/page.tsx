"use client";

import RegisterForm from "@/components/reusables/forms/RegisterForm";
import { Shield, Sparkles, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const { theme: t } = useTheme();

  return (
    <div className={`min-h-screen flex ${t.background} ${t.meshGradient} transition-colors duration-1000 overflow-hidden`}>
      
      {/* --- Left Branding Section (Mirrors LoginPage) --- */}
      <div className="hidden lg:flex lg:w-[45%] relative p-12 flex-col justify-between border-r border-black/5 dark:border-white/5 overflow-hidden font-jakarta">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(193,255,114,0.08)_0,transparent_60%)] -z-10 blur-3xl opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-between"
        >
          <div />
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full bg-[#4caf50] animate-pulse`} />
            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${t.text.muted}`}>Secure Connection Active</span>
          </div>
        </motion.div>

        <div className="relative space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-[#0a1a15] dark:bg-[#c1ff72] rounded-3xl flex items-center justify-center shadow-2xl">
                <Sparkles className="text-[#c1ff72] dark:text-[#0a1a15]" size={28} />
              </div>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted} mb-1 block`}>Secure Portal</span>
                <h1 className={`text-4xl font-black tracking-tighter ${t.text.display.split(' ').slice(1).join(' ')}`}>
                  Figur<span className="text-[#4caf50]">Ledger</span>
                </h1>
              </div>
            </div>

            <h2 className={`text-5xl font-black leading-tight tracking-tighter ${t.text.display}`}>
              Start your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1a3a32] to-[#4caf50] dark:from-[#c1ff72] dark:to-[#81c784]">Journey.</span>
            </h2>
            <p className={`mt-6 text-lg ${t.text.body} max-w-sm opacity-80 font-medium leading-relaxed`}>
              Join a global community of users. Create your account in minutes and take control of your assets.
            </p>
          </motion.div>

          {/* Feature Highlight */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { icon: Shield, title: "Total Security", desc: "Your data and assets are always protected", color: "text-emerald-500" },
              { icon: Globe, title: "Reach Anywhere", desc: "Manage your finances from any location", color: "text-[#c1ff72]" },
            ].map((feature, i) => (
              <div key={i} className={`p-5 ${t.card.base} ${t.radius.md} border border-black/5 dark:border-white/5 flex gap-4 items-center`}>
                <div className={`w-10 h-10 shrink-0 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${feature.color}`}>
                  <feature.icon size={18} />
                </div>
                <div>
                  <h3 className={`font-bold ${t.text.heading} text-sm`}>{feature.title}</h3>
                  <p className={`text-[11px] ${t.text.muted} font-medium`}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative pt-6">
           <p className={`text-[9px] font-black tracking-[0.4em] uppercase ${t.text.muted} opacity-40`}>
              © 2026 FIGUR LEDGER SYSTEMS INC.
           </p>
        </div>
      </div>

      {/* --- Right Register Form Section --- */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center relative p-8">
        <RegisterForm />
        
        <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-[#c1ff72]/20 rounded-tr-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-[#c1ff72]/20 rounded-bl-3xl -z-10" />
      </div>
    </div>
  );
};

export default RegisterPage;

