"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Hash } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) {
  const { theme: t, mode } = useTheme();

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    if (totalPage <= showMax) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPage - 2) {
        pages.push("...");
      }
      if (!pages.includes(totalPage)) pages.push(totalPage);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 mt-12 mb-8 border border-black/5 dark:border-white/5 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] relative overflow-hidden group">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#b0f061]/10 group-hover:bg-[#b0f061]/20 transition-all duration-500" />
      
      <div className="flex items-center gap-3 mb-6 opacity-40 group-hover:opacity-100 transition-all">
         <Hash size={12} className="text-[#b0f061]" />
         <span className={cn("text-[9px] font-black uppercase tracking-[0.4em]", t.text.muted)}>Page Index Navigation</span>
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
            currentPage === 1
              ? "opacity-20 cursor-not-allowed"
              : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-[#b0f061] hover:text-[#0a1a15] hover:border-[#b0f061] " + t.text.heading
          )}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-3">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span key={`dots-${index}`} className={cn("px-2 text-sm font-black opacity-30", t.text.muted)}>
                  •••
                </span>
              );
            }

            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all duration-500",
                  isActive
                    ? "bg-[#c1ff72] text-[#0a1a15] shadow-[0_0_20px_rgba(193,255,114,0.3)] scale-110 rotate-3"
                    : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 " + t.text.muted
                )}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPage, currentPage + 1))}
          disabled={currentPage === totalPage}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
            currentPage === totalPage
              ? "opacity-20 cursor-not-allowed"
              : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-[#b0f061] hover:text-[#0a1a15] hover:border-[#b0f061] " + t.text.heading
          )}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
