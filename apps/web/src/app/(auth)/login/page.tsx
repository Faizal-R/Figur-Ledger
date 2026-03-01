"use client";

import LoginForm from "@/components/features/auth/LoginForm";
import { Shield, Sparkles, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const LoginPage = () => {
  const { theme: t } = useTheme();

  return (
    <div className={`min-h-screen flex ${t.background} ${t.meshGradient} transition-colors duration-1000 overflow-hidden`}>
      
      {/* --- Left Branding & Features Section --- */}
      <div className="hidden lg:flex lg:w-[55%] relative p-16 flex-col justify-between border-r border-black/5 dark:border-white/5 overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(193,255,114,0.08)_0,transparent_60%)] -z-10 blur-3xl opacity-50 transition-opacity" />
        
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-between"
        >
          <div />
          
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full bg-[#4caf50] animate-pulse`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted}`}>Secure Node: Node-084</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-[#0a1a15] dark:bg-[#c1ff72] rounded-4xl flex items-center justify-center shadow-2xl transition-all">
                <Sparkles className="text-[#c1ff72] dark:text-[#0a1a15]" size={32} />
              </div>
              <div>
                <span className={`text-sm font-black uppercase tracking-[0.3em] ${t.text.muted} mb-1 block`}>Architecture V2.4.0</span>
                <h1 className={`text-5xl font-black tracking-tighter ${t.text.display.split(' ').slice(1).join(' ')}`}>
                  Figur<span className="text-[#4caf50]">Ledger</span>
                </h1>
              </div>
            </div>

            <h2 className={`text-[5rem] font-black leading-[0.9] tracking-tighter ${t.text.display}`}>
              Access the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1a3a32] to-[#4caf50] dark:from-[#c1ff72] dark:to-[#81c784] transition-all duration-1000">Financial</span> Layer.
            </h2>
            <p className={`mt-8 text-2xl ${t.text.body} max-w-xl opacity-80 font-medium`}>
              Precision banking deployment starts here. Authenticate to manage your global ledger.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { icon: Shield, title: "Vault Protection", desc: "Military-grade hardware enclaves", color: "text-emerald-500" },
              { icon: Globe, title: "Distributed Nodes", desc: "140+ real-time clearing clusters", color: "text-[#c1ff72]" },
            ].map((feature, i) => (
              <div key={i} className={`p-8 ${t.card.base} ${t.radius.md} border border-black/5 dark:border-white/5 space-y-4`}>
                <div className={`w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className={`font-bold ${t.text.heading} text-lg`}>{feature.title}</h3>
                  <p className={`text-sm ${t.text.muted} font-medium`}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative">
           <p className={`text-[10px] font-black tracking-[0.4em] uppercase ${t.text.muted} opacity-40`}>
              © 2026 FIGUR LEDGER SYSTEMS INC. // SESSION ENCRYPTED
           </p>
        </div>
      </div>

      {/* --- Right Login Form Section --- */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center relative p-8">
        <LoginForm />
        
        {/* Subtle Decorative Elements for the Form Side */}
        <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-[#c1ff72]/20 rounded-tr-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-[#c1ff72]/20 rounded-bl-3xl -z-10" />
      </div>
    </div>
  );
};

export default LoginPage;
