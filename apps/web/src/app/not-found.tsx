"use client";

import { motion } from "framer-motion";
import { Home, Zap, Activity } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const { theme: t } = useTheme();

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center h-screen w-full overflow-hidden p-6",
        t.background
      )}
    >
      {/* Structural Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(176,240,97,0.05)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />
      
      {/* Floating Artifacts */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[15%] opacity-20"
      >
        <div className="w-16 h-16 border-2 border-[#b0f061] rounded-2xl rotate-45" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 40, 0],
          rotate: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-[20%] opacity-10"
      >
        <Activity size={100} className="text-[#b0f061]" />
      </motion.div>

      <div className="text-center z-10">
        {/* Large 404 */}
        <div className="relative inline-block">
          <motion.h1
            className={cn("text-[12rem] font-black tracking-tighter leading-none select-none", t.text.display)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            404
          </motion.h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-[#b0f061] shadow-[0_0_50px_#b0f061] rotate-12 opacity-50" />
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 space-y-2"
        >
          <h2 className={cn("text-2xl font-black uppercase tracking-[0.2em]", t.text.heading)}>
            Protocol <span className="text-[#b0f061]">Void.</span>
          </h2>
          <p className={cn("text-xs font-black uppercase tracking-[0.4em] opacity-40 max-w-sm mx-auto leading-relaxed", t.text.muted)}>
            The requested resource has been purged from the Ledger Network or moved to an inaccessible sector.
          </p>
        </motion.div>

        {/* Back Home Button */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            href="/dashboard"
            className={cn(
              t.button.primary,
              "inline-flex items-center gap-4 px-12 py-5 rounded-3xl uppercase text-[11px] font-black tracking-[0.4em] shadow-2xl transition-all"
            )}
          >
            <Zap size={18} />
            Initialize Re-entry
          </Link>
        </motion.div>
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#b0f061]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#4caf50]/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
