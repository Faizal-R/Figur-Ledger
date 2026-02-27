"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Wallet, 
  Zap, 
  BarChart3, 
  Bell, 
  Plus, 
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  ChevronRight,
  Shield,
  Layers,
  Globe,
  Sparkles,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useRef } from "react";

const Home = () => {
  const { theme: t, mode, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className={`min-h-screen ${t.background} ${t.meshGradient} relative selection:bg-[#c1ff72] selection:text-[#0a1a15] transition-colors duration-1000`}>
      
      {/* --- Sticky Elite Nav --- */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex justify-between items-center transition-all duration-500">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-[#0a1a15] dark:bg-[#c1ff72] rounded-2xl flex items-center justify-center shadow-2xl transition-colors duration-700">
            <Sparkles className="text-[#c1ff72] dark:text-[#0a1a15] transition-colors duration-700" size={24} />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${t.text.display.split(' ').slice(1).join(' ')}`}>
            Figur<span className="text-[#4caf50]">Ledger</span>
          </span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-10 bg-white/40 dark:bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/50 dark:border-white/10 shadow-sm transition-all duration-700">
          {["Ecosystem", "Governance", "Treasury", "Security"].map((item) => (
            <a key={item} href="#" className={`text-[13px] font-extrabold uppercase tracking-widest ${t.text.muted} hover:text-[#c1ff72] transition-colors`}>{item}</a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <button 
            onClick={toggleTheme}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm hover:scale-110 active:scale-95 transition-all text-[#0a1a15] dark:text-white`}
          >
            {mode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link href="/login">
            <button className={`px-6 py-3 rounded-2xl font-bold text-sm ${t.text.heading} hover:bg-white/50 dark:hover:bg-white/10 transition-all`}>
              Inquire
            </button>
          </Link>
          <Link href="/register">
            <button className={`px-8 py-3 ${t.button.primary} ${t.radius.md} text-sm`}>
              Get Started
            </button>
          </Link>
        </motion.div>
      </nav>

      {/* --- Cinematic Hero Section --- */}
      <section className="relative pt-48 pb-32 px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-20 items-center">
          
          <div className="relative z-10 space-y-12">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-full shadow-sm transition-colors duration-700"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#c1ff72] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c1ff72]"></span>
              </span>
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${t.text.accent} transition-colors duration-700`}>Systems Live: V2.4 Legacy Upgrade</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[5.5rem] md:text-[8rem] ${t.text.display}`}
            >
              Finance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a32] to-[#4caf50] dark:from-[#c1ff72] dark:to-[#81c784] transition-all duration-1000">Architected</span><br />
              for Scale.
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-xl md:text-2xl ${t.text.body} max-w-xl opacity-80`}
            >
              Precision-engineered banking infrastructure for those who demand absolute reliability and elegant control.
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 pt-6"
            >
              <button className={`${t.button.primary} px-12 py-6 ${t.radius.lg} text-lg shadow-2xl flex items-center gap-4 group transition-all duration-300`}>
                Deploy My Ledger <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 border-l border-slate-200 dark:border-white/10 ml-4 transition-colors duration-700">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0a1a15] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm transition-colors duration-700">
                      <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-black ${t.text.heading}`}>50K+ Users</span>
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${t.text.muted}`}>Across 120 Countries</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- Interactive High-Fidelity Showcase --- */}
          <div className="relative group">
            <motion.div 
              style={{ y: backgroundY }}
              className="relative aspect-square w-full"
            >
              {/* Dynamic Abstract Shapes (Glassy Orbs) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(193,255,114,0.1)_0,transparent_60%)] -z-10 blur-3xl opacity-50 dark:opacity-20 transition-opacity duration-1000" />
              
              {/* The "Master Card" Mockup */}
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`absolute top-0 right-10 w-[350px] aspect-[1/2] ${t.card.emerald} ${t.radius.lg} p-10 z-30 shadow-[0_50px_100px_rgba(0,0,0,0.2)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden border border-white/10 transition-all duration-700`}
              >
                  <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-[#c1ff72]/10 blur-[80px] rounded-full" />
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/5 transition-colors">
                      <Layers className="text-[#c1ff72]" size={20} />
                    </div>
                    <div className="flex gap-4 text-white/40">
                      <Bell size={22} className="hover:text-white transition-colors cursor-pointer" />
                      <MoreHorizontal size={22} className="hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>

                  <div>
                    <span className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em] block mb-2">Primary Liquidity</span>
                    <h2 className="text-white text-5xl font-black tracking-tighter">$42,910.00</h2>
                    <div className="mt-6 flex gap-3">
                       <span className="px-3 py-1 bg-[#c1ff72]/20 rounded-full text-[#c1ff72] text-[10px] font-bold border border-[#c1ff72]/20 shadow-[0_0_15px_rgba(193,255,114,0.2)]">+12.5% Today</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-t border-white/10 pt-8 mt-8">
                       <div className="space-y-1">
                          <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Global Reach</span>
                          <p className="text-white font-black text-xl">14 Active Nodes</p>
                       </div>
                       <Globe className="text-white/20" size={32} />
                    </div>
                  </div>
              </motion.div>

              {/* Floating Statistic Card */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className={`absolute bottom-20 left-0 w-[280px] ${t.card.base} ${t.radius.md} p-8 z-40 border border-white/30 dark:border-white/5 transition-all duration-700`}
              >
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-[#c1ff72]/10 flex items-center justify-center transition-colors">
                      <BarChart3 className="text-emerald-600 dark:text-[#c1ff72]" size={20} />
                    </div>
                    <div>
                       <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${t.text.muted}`}>Risk Factor</span>
                       <p className={`text-sm font-black ${t.text.heading}`}>Extremely Stable</p>
                    </div>
                 </div>
                 <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden transition-colors">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="h-full bg-[#c1ff72] shadow-[0_0_10px_rgba(193,255,114,0.5)]" 
                    />
                 </div>
              </motion.div>

              {/* Secondary Visual Card */}
              <motion.div 
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: -15 }}
                className={`absolute top-20 left-[-40px] w-56 h-80 bg-[#c1ff72] ${t.radius.lg} -z-10 shadow-2xl p-8 flex flex-col justify-end overflow-hidden transition-all duration-700`}
              >
                 <div className="absolute top-0 right-0 p-4">
                    <Shield className="text-[#0a1a15]/10 dark:text-[#0a1a15]/20" size={100} />
                 </div>
                 <h3 className="text-[#0a1a15] font-black text-2xl leading-tight">Quantum Safe <br />Security.</h3>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Bento Grid Ecosystem --- */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto">
        <div className="mb-20 text-center space-y-4">
           <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-[11px] font-black uppercase tracking-[0.4em] ${t.text.muted}`}
           >
            Core Capabilities
           </motion.span>
           <h2 className={`text-5xl md:text-7xl ${t.text.display}`}>The Ecosystem for <br />Advanced Finance.</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-6 h-[800px]">
          {/* Feature 1: Large Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`md:col-span-8 ${t.card.bento} ${t.radius.lg} p-12 flex flex-col justify-between overflow-hidden relative group transition-all duration-700`}
          >
             <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[70%] bg-[#e8f5e9]/50 dark:bg-[#c1ff72]/5 rounded-full blur-[80px] group-hover:bg-[#c1ff72]/20 dark:group-hover:bg-[#c1ff72]/10 transition-colors duration-700" />
             <div className="max-w-md relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#0a1a15] dark:bg-[#c1ff72] flex items-center justify-center mb-8 shadow-xl transition-colors">
                  <Globe className="text-[#c1ff72] dark:text-[#0a1a15]" size={32} />
                </div>
                <h3 className={`text-4xl font-black ${t.text.heading} mb-6`}>Borderless Infrastructure.</h3>
                <p className={`${t.text.body} opacity-80 text-lg`}>Deploy capital anywhere in the world in milliseconds. Our network operates across 12 node clusters for absolute zero-latency execution.</p>
             </div>
             <div className="flex gap-4 relative z-10 transition-opacity">
                <button className={`${t.button.onyx} px-8 py-3 rounded-xl shadow-xl transition-all`}>Read Paper</button>
             </div>
          </motion.div>

          {/* Feature 2: Small Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`md:col-span-4 ${t.card.onyx} ${t.radius.lg} p-10 flex flex-col justify-center text-center space-y-6 transition-all duration-700 border border-white/5`}
          >
             <div className="w-20 h-20 bg-white/10 dark:bg-[#c1ff72]/10 rounded-full flex items-center justify-center mx-auto border border-white/10 dark:border-[#c1ff72]/20 transition-colors">
                <Shield className="text-[#c1ff72]" size={36} />
             </div>
             <h3 className="text-white text-2xl font-black">Military Grade <br />Data Enclaves.</h3>
             <p className="text-white/60 text-sm font-medium">Your data remains encrypted in hardware enclaves, inaccessible to third parties.</p>
          </motion.div>

          {/* Feature 3: Small Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`md:col-span-4 ${t.card.bento} ${t.radius.lg} p-10 flex flex-col items-center justify-center text-center space-y-6 transition-all duration-700`}
          >
             <div className="w-16 h-16 bg-[#c1ff72]/20 dark:bg-[#c1ff72]/10 rounded-2xl flex items-center justify-center transition-colors">
                <Zap className="text-[#1a3a32] dark:text-[#c1ff72]" size={32} />
             </div>
             <h3 className={`text-2xl font-black ${t.text.heading}`}>Instant <br />Clearance.</h3>
             <p className={`${t.text.body} text-sm opacity-70`}>Real-time settlement for all transaction types. No waiting periods, just pure speed.</p>
          </motion.div>

          {/* Feature 4: Medium Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`md:col-span-8 ${t.card.bento} ${t.radius.lg} p-12 flex items-center gap-12 overflow-hidden transition-all duration-700`}
          >
             <div className="flex-1 space-y-6">
                <h3 className={`text-4xl font-black ${t.text.heading}`}>Treasury Management.</h3>
                <p className={`${t.text.body} opacity-70`}>Sophisticated tools for teams to manage collective funds, payroll, and algorithmic investments.</p>
                <div className={`flex items-center gap-2 text-emerald-600 dark:text-[#c1ff72] font-black uppercase text-[10px] tracking-widest cursor-pointer group transition-colors`}>
                   See Dashboard <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
             <div className="flex-1 h-full hidden lg:block bg-slate-50 dark:bg-black/20 rounded-[2rem] border border-slate-100 dark:border-white/5 p-6 transition-all">
                <div className="space-y-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="h-10 w-full bg-white dark:bg-white/5 rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center px-4 justify-between transition-colors">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 dark:bg-[#c1ff72]/20" />
                        <div className="h-2 w-24 bg-slate-100 dark:bg-white/10 rounded-full" />
                        <div className="h-2 w-10 bg-[#c1ff72] rounded-full" />
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Elite CTA Section --- */}
      <section className="py-32 px-8">
        <motion.div 
          className={`max-w-[1400px] mx-auto ${t.card.emerald} ${t.radius.lg} p-20 text-center relative overflow-hidden transition-all duration-1000 border border-white/5`}
        >
           <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-white/5 dark:bg-[#c1ff72]/5 blur-[120px] rounded-full rotate-45 transition-colors duration-1000" />
           <div className="max-w-3xl mx-auto relative z-10 space-y-10">
              <h2 className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-none text-balance">
                The future belongs to the <span className="text-[#c1ff72]">fast.</span>
              </h2>
              <p className="text-white/60 text-xl md:text-2xl font-medium">
                Join the network that defines the standard of modern digital finance. No hurdles, no legacy baggage. Just elite banking.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                 <button className={`${t.button.primary} px-12 py-6 ${t.radius.md} text-xl shadow-2xl transition-all`}>Deploy Your Vault</button>
                 <button className={`${t.button.glass} px-12 py-6 ${t.radius.md} text-xl shadow-xl transition-all`}>Contact Sales</button>
              </div>
           </div>
        </motion.div>
      </section>

      {/* --- Architectural Footer --- */}
      <footer className="py-20 px-8 border-t border-slate-200 dark:border-white/10 transition-colors duration-700">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0a1a15] dark:bg-[#c1ff72] rounded-xl flex items-center justify-center transition-colors">
                <Sparkles className="text-[#c1ff72] dark:text-[#0a1a15]" size={20} />
              </div>
              <span className={`text-xl font-black tracking-tighter ${t.text.display.split(' ').slice(1).join(' ')}`}>
                Figur<span className="text-[#4caf50]">Ledger</span>
              </span>
            </div>
            <p className={`${t.text.muted} text-sm font-medium leading-relaxed`}>
              The global standard for digital ledger infrastructure. Built with speed, security, and elegance at its core.
            </p>
          </div>
          
          <div className="space-y-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted}`}>Product</p>
            <ul className="space-y-4 text-sm font-bold opacity-80 cursor-pointer">
              <li className="hover:text-[#c1ff72] transition-colors">Deploy Cluster</li>
              <li className="hover:text-[#c1ff72] transition-colors">Treasury API</li>
              <li className="hover:text-[#c1ff72] transition-colors">Network Status</li>
              <li className="hover:text-[#c1ff72] transition-colors">Audit Logs</li>
            </ul>
          </div>

          <div className="space-y-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted}`}>Nodes</p>
            <ul className="space-y-4 text-sm font-bold opacity-80 cursor-pointer">
               <li className="flex items-center gap-2 hover:text-[#c1ff72] transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72]" /> US-EAST-1</li>
               <li className="flex items-center gap-2 hover:text-[#c1ff72] transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72]" /> EU-WEST-2</li>
               <li className="flex items-center gap-2 hover:text-[#c1ff72] transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-[#c1ff72]" /> AS-SOUTH-1</li>
               <li className="flex items-center gap-2 text-slate-300 dark:text-slate-600 transition-colors">More coming soon</li>
            </ul>
          </div>

          <div className="space-y-8 text-right md:text-left">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t.text.muted}`}>Legal</p>
            <ul className="space-y-4 text-sm font-bold opacity-80 cursor-pointer">
              <li className="hover:text-[#c1ff72] transition-colors">Privacy Matrix</li>
              <li className="hover:text-[#c1ff72] transition-colors">Terms of Deployment</li>
              <li className="hover:text-[#c1ff72] transition-colors">Security Disclosure</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-20 pt-10 border-t border-slate-100 dark:border-white/5 flex justify-between items-center transition-colors">
           <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 transition-colors">© 2026 FIGUR LEDGER SYSTEMS INC. ALL RIGHTS RESERVED.</span>
           <div className="flex gap-6">
              {/* Social icons would go here */}
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
