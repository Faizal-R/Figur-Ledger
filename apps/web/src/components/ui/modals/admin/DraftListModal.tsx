"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { LoanProductPayload } from "@/hooks/state/useLoanProductState";
import { Edit3, FileText, X } from "lucide-react";

export default function DraftListModal({
  open,
  drafts,
  onEdit,
  onClose,
}: {
  open: boolean;
  drafts: LoanProductPayload[];
  onEdit: (d: LoanProductPayload) => void;
  onClose: () => void;
}) {
  const { theme: t } = useTheme();
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4">
      <div className={cn(t.card.base, t.radius.lg, "w-full max-w-xl shadow-3xl border border-white/5 overflow-hidden animate-in fade-in zoom-in duration-300")}>
        {/* Header */}
        <div className="p-8 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#b0f061]/20 flex items-center justify-center">
              <FileText size={20} className="text-[#b0f061]" />
            </div>
            <div>
              <h3 className={cn("text-xl font-black uppercase tracking-tighter", t.text.heading)}>Staged <span className="text-[#b0f061]">Protocols.</span></h3>
              <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-1", t.text.muted)}>Offline Product Cache</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X size={20} className={t.text.muted} />
          </button>
        </div>

        <div className="p-8">
          {drafts.length === 0 ? (
            <div className="py-20 text-center">
               <p className={cn("text-xs font-black uppercase tracking-[0.3em] opacity-30", t.text.muted)}>No Cached Protocols Detected</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {drafts.map((d) => (
                <div key={d.id} className="p-6 rounded-2xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex justify-between items-center group hover:border-[#b0f061]/30 transition-all duration-300">
                  <div>
                    <h4 className={cn("text-lg font-black tracking-tight", t.text.heading)}>{d.name}</h4>
                    <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", t.text.muted)}>{d.code}</p>
                  </div>
                  <button
                    onClick={() => onEdit(d)}
                    className={cn(
                      "h-12 px-6 rounded-xl flex items-center gap-3 transition-all duration-300",
                      "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-widest group-hover:bg-[#b0f061] group-hover:text-[#0a1a15] group-hover:border-[#b0f061]",
                      t.text.heading
                    )}
                  >
                    <Edit3 size={14} /> Resume
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex justify-end">
          <button 
            onClick={onClose} 
            className={cn("px-8 h-12 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black/5 dark:hover:bg-white/5", t.text.muted)}
          >
            Terminal Close
          </button>
        </div>
      </div>
    </div>
  );
}
