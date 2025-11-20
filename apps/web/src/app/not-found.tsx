"use client";

import { motion } from "framer-motion";
import { Home, Rocket } from "lucide-react";
import Link from "next/link";
import { FinledgerTheme } from "@/theme";

export default function NotFound() {
  return (
    <div
      className={`relative flex flex-col items-center justify-center h-screen 
      ${FinledgerTheme.background} text-white overflow-hidden`}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)]
        bg-[length:20px_20px] opacity-20 animate-pulse pointer-events-none"
      />

      {/* Floating Rocket */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 pointer-events-none"
      >
        <Rocket size={80} className="text-emerald-400 drop-shadow-lg" />
      </motion.div>

      {/* Large 404 */}
      <motion.h1
        className="text-9xl font-extrabold tracking-widest text-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className={`mt-6 text-lg md:text-xl ${FinledgerTheme.text.secondary} max-w-md text-center`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        🚀 This page drifted off into deep space.  
        We’ll get you back on track.
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        className="mt-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 px-6 py-3 rounded-full 
            ${FinledgerTheme.accent.gradient} ${FinledgerTheme.accent.glow}
            transition`}
        >
          <Home size={20} className="text-slate-900" />
          <span className="text-slate-900 font-semibold">Go Back Home</span>
        </Link>
      </motion.div>

      {/* Floating Emerald Glow Orb */}
      <motion.div
        className="absolute -bottom-20 w-[500px] h-[500px] bg-emerald-500/20 blur-3xl rounded-full pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
