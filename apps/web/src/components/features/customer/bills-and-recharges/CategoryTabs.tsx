"use client";
import React from "react";
import {
  Zap,
  Droplets,
  Wifi,
  Smartphone,
  Tv,
  Fuel,
  History,
  Sparkles,
  Layers,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Category } from "@/types/IBill";
import { motion } from "framer-motion";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  const { theme: t } = useTheme();

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "ELECTRICITY": return <Zap size={22} />;
      case "WATER": return <Droplets size={22} />;
      case "INTERNET": return <Wifi size={22} />;
      case "MOBILE": return <Smartphone size={22} />;
      case "CABLE": return <Tv size={22} />;
      case "GAS": return <Fuel size={22} />;
      case "ALL": return <History size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className={`w-10 h-10 ${t.card.base} ${t.radius.md} border border-black/5 dark:border-white/5 flex items-center justify-center shadow-md`}>
              <Layers size={18} className="text-[#c1ff72]" />
           </div>
           <div>
              <h2 className={`text-2xl font-black tracking-tighter ${t.text.display}`}>Service Sectors</h2>
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.text.muted}`}>Protocol Categories</p>
           </div>
        </div>

        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#c1ff72]/20 bg-[#c1ff72]/5 w-fit"
        >
          <Sparkles size={14} className="text-[#c1ff72]" />
          <span className={`text-[10px] font-black uppercase tracking-widest text-[#c1ff72]`}>
            {categories.find((c) => c.id === activeCategory)?.name || "Primary Matrix"}
          </span>
        </motion.div>
      </div>

      {/* Grid of Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative h-44 rounded-3xl border transition-all duration-500 overflow-hidden group
                ${isActive 
                  ? `${t.card.base} border-[#c1ff72]/40 shadow-2xl shadow-[#c1ff72]/10 z-10` 
                  : `${t.card.base} border-black/5 dark:border-white/5 hover:border-[#c1ff72]/20 shadow-lg`
                }
              `}
            >
              {/* Active Indication */}
              {isActive && (
                <>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#c1ff72] to-transparent" />
                  <div className="absolute inset-0 bg-[#c1ff72]/5 pointer-events-none" />
                </>
              )}

              <div className="flex flex-col items-center justify-center h-full p-6 space-y-4 relative z-10">
                {/* ICON BOX */}
                <div
                  className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                    ${isActive 
                      ? 'bg-[#0a1a15] dark:bg-[#c1ff72] text-[#c1ff72] dark:text-[#0a1a15] shadow-xl transform rotate-3' 
                      : 'bg-black/5 dark:bg-white/5 text-slate-400 group-hover:text-[#c1ff72] group-hover:bg-[#c1ff72]/10'
                    }
                  `}
                >
                  {getCategoryIcon(category.id)}
                </div>

                {/* TEXT */}
                <div className="text-center space-y-1">
                  <h3
                    className={`
                      text-[12px] font-black uppercase tracking-wider transition-colors duration-300
                      ${isActive ? t.text.heading : t.text.muted}
                    `}
                  >
                    {category.name}
                  </h3>
                  {category.id === "ALL" && (
                    <p className={`text-[10px] font-bold opacity-40 ${isActive ? t.text.heading : t.text.muted}`}>
                      {category.count} NODES
                    </p>
                  )}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className={`absolute -bottom-4 -right-4 w-12 h-12 rounded-full blur-2xl transition-opacity duration-500 ${isActive ? 'bg-[#c1ff72]/20' : 'bg-transparent opacity-0 group-hover:opacity-100 group-hover:bg-[#c1ff72]/5'}`} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
