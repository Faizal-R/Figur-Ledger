"use client";
import { useEffect } from 'react';
import { CheckCircle2, X, Terminal, Cpu, ArrowRight, Share2, Copy } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountData: {
    accountNumber: string;
    ifsc: string;
    accountType: string;
  };
  onGoToDashboard: () => void;
  onManageAccount: () => void;
}

export function SuccessModal({
  isOpen,
  onClose,
  accountData,
  onGoToDashboard,
  onManageAccount,
}: SuccessModalProps) {
  const { theme: t, mode } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Protocol ID synced to clipboard");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className={cn(
          "relative w-full max-w-md overflow-hidden flex flex-col shadow-3xl",
          mode === 'dark' ? "bg-[#0a0a0b] border border-[#c1ff72]/20" : "bg-white border border-slate-200",
          t.radius.lg
        )}
      >
        {/* Animated Success Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#c1ff72] to-transparent animate-pulse" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c1ff72]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-8 text-center space-y-7">
           <div className="relative mx-auto w-20 h-20">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-[1.75rem] bg-[#c1ff72] text-[#0a1a15] flex items-center justify-center shadow-[0_0_50px_rgba(193,255,114,0.3)]"
              >
                 <CheckCircle2 size={40} strokeWidth={2.5} />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg">
                 <Cpu size={14} />
              </div>
           </div>

           <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                 <div className="w-1 h-1 rounded-full bg-[#c1ff72]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c1ff72]">Initialization Complete</span>
                 <div className="w-1 h-1 rounded-full bg-[#c1ff72]" />
              </div>
              <h2 className={cn("text-3xl font-black tracking-tighter leading-none", t.text.display)}>
                Node <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4caf50] to-[#c1ff72]">Integrated.</span>
              </h2>
              <p className={cn("text-[11px] font-medium opacity-50 max-w-[280px] mx-auto leading-relaxed", t.text.muted)}>
                Dynamic cluster established. Your node is now live on the FigurLedger mainnet.
              </p>
           </div>

           {/* Metrics Grid */}
           <div className={cn(
             "p-8 rounded-[2rem] border space-y-6 text-left relative group transition-all",
             mode === 'dark' ? "bg-black/40 border-white/5" : "bg-slate-50 border-slate-200"
           )}>
              <div className="flex items-center gap-3 opacity-20 group-hover:opacity-40 transition-opacity">
                 <Terminal size={14} />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Protocol Metadata</span>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className={cn("text-[8px] font-black uppercase tracking-[0.2em] opacity-30 mb-1", t.text.muted)}>NODE ADDRESS</p>
                       <p className={cn("text-xl font-black tracking-tight font-mono", t.text.heading)}>{accountData.accountNumber}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(accountData.accountNumber)}
                      className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#c1ff72]/10 hover:text-[#c1ff72] transition-all"
                    >
                       <Copy size={14} />
                    </button>
                 </div>

                 <div className="grid grid-cols-2 gap-8 pt-4 border-t border-black/5 dark:border-white/5">
                    <div>
                       <p className={cn("text-[8px] font-black uppercase tracking-[0.2em] opacity-30 mb-1", t.text.muted)}>IFSC_CORE</p>
                       <p className={cn("text-sm font-black tracking-widest font-mono", t.text.heading)}>{accountData.ifsc}</p>
                    </div>
                    <div>
                       <p className={cn("text-[8px] font-black uppercase tracking-[0.2em] opacity-30 mb-1", t.text.muted)}>PROTOCOL</p>
                       <span className="inline-flex px-3 py-1 rounded-lg bg-[#c1ff72]/10 text-[#c1ff72] text-[9px] font-black uppercase tracking-widest border border-[#c1ff72]/20">
                          {accountData.accountType}
                       </span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Tactical Actions */}
           <div className="flex flex-col gap-4">
              <button
                onClick={onGoToDashboard}
                className={cn(
                  "w-full h-14 rounded-[1.25rem] font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 transition-all shadow-2xl relative overflow-hidden",
                  mode === 'dark' 
                    ? "bg-[#c1ff72] text-[#0a1a15] hover:scale-[1.02] active:scale-95" 
                    : "bg-slate-900 text-white hover:bg-slate-800"
                )}
              >
                Sync Dashboard <ArrowRight size={14} />
              </button>
              <button
                onClick={onManageAccount}
                className={cn(
                  "w-full h-14 rounded-[1.25rem] font-black uppercase tracking-widest text-[9px] transition-all flex items-center justify-center gap-3",
                  mode === 'dark' ? "bg-white/5 text-white hover:bg-white/10" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                )}
              >
                Access Command Hub <Share2 size={12} />
              </button>
           </div>
        </div>

        {/* Tactical Alerts */}
        <div className="p-4 bg-black/[0.05] dark:bg-white/[0.05] flex items-center justify-center gap-6 opacity-30">
           {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-[#c1ff72]" />
           ))}
        </div>
      </motion.div>
    </div>
  );
}
