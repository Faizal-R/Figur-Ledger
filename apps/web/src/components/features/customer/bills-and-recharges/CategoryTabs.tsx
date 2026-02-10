// components/bills-recharges/components/CategoryTabs.tsx
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
} from "lucide-react";
import { FinledgerTheme } from "@/theme";
import { Category } from "@/types/IBill";

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
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "ELECTRICITY":
        return <Zap size={20} />;
      case "WATER":
        return <Droplets size={20} />;
      case "INTERNET":
        return <Wifi size={20} />;
      case "MOBILE":
        return <Smartphone size={20} />;
      case "CABLE":
        return <Tv size={20} />;
      case "GAS":
        return <Fuel size={20} />;
      case "ALL":
        return <History size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  const getCategoryColors = (categoryId: string, isActive: boolean) => {
    if (isActive) {
      return {
        iconBg: "from-emerald-400 to-emerald-600",
        cardBg:
          "from-emerald-500/15 via-emerald-500/10 to-emerald-500/5",
        border: "border-emerald-500/40",
        text: "text-white",
        subText: "text-emerald-300",
        shadow: "shadow-lg shadow-emerald-500/20",
      };
    }

    switch (categoryId) {
      case "ELECTRICITY":
        return {
          iconBg: "from-yellow-500 to-orange-500",
          cardBg: "",
          border: "border-slate-700",
          text: FinledgerTheme.text.primary,
          subText: FinledgerTheme.text.secondary,
          shadow: "",
        };
      case "WATER":
        return {
          iconBg: "from-cyan-500 to-blue-500",
          cardBg: "",
          border: "border-slate-700",
          text: FinledgerTheme.text.primary,
          subText: FinledgerTheme.text.secondary,
          shadow: "",
        };
      case "INTERNET":
        return {
          iconBg: "from-pink-500 to-rose-500",
          cardBg: "",
          border: "border-slate-700",
          text: FinledgerTheme.text.primary,
          subText: FinledgerTheme.text.secondary,
          shadow: "",
        };
      case "MOBILE":
        return {
          iconBg: "from-purple-500 to-indigo-500",
          cardBg: "",
          border: "border-slate-700",
          text: FinledgerTheme.text.primary,
          subText: FinledgerTheme.text.secondary,
          shadow: "",
        };
      case "CABLE":
        return {
          iconBg: "from-green-500 to-emerald-500",
          cardBg: "",
          border: "border-slate-700",
          text: FinledgerTheme.text.primary,
          subText: FinledgerTheme.text.secondary,
          shadow: "",
        };
      case "GAS":
        return {
          iconBg: "from-orange-500 to-amber-500",
          cardBg: "",
          border: "border-slate-700",
          text: FinledgerTheme.text.primary,
          subText: FinledgerTheme.text.secondary,
          shadow: "",
        };
      default:
        return {
          iconBg: "from-slate-600 to-slate-700",
          cardBg: "",
          border: "border-slate-700",
          text: FinledgerTheme.text.primary,
          subText: FinledgerTheme.text.secondary,
          shadow: "",
        };
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
  };

  return (
    <div className="mb-8 relative z-10">
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`${FinledgerTheme.text.primary} text-2xl font-bold`}
        >
          Categories
        </h2>

        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl">
          <Sparkles size={16} className="text-emerald-400" />
          <span
            className={`${FinledgerTheme.text.primary} text-sm font-medium`}
          >
            {categories.find((c) => c.id === activeCategory)?.name ||
              "All Categories"}
          </span>
        </div>
      </div>

      {/* GRID WITHOUT SCROLLING */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const colors = getCategoryColors(category.id, isActive);

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              type="button"
              className={`
                relative rounded-2xl p-4 border
                transition-all duration-300 ease-out
                ${isActive ? "z-10" : "hover:-translate-y-1"}
                ${isActive ? colors.cardBg : FinledgerTheme.card}
                ${colors.border}
                ${
                  isActive
                    ? colors.shadow
                    : "hover:shadow-lg hover:shadow-emerald-500/10"
                }
                ${!isActive ? "hover:border-emerald-500/30" : ""}
                flex flex-col items-center justify-center
                h-full min-h-[140px]
              `}
            >
              {/* ACTIVE GLOW — pointer events disabled */}
              {isActive && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl" />
              )}

              {/* CONTENT WRAPPER — forced above overlays */}
              <div className="relative z-20 w-full flex flex-col items-center justify-center">
                {/* ICON */}
                <div
                  className={`
                    w-12 h-12 rounded-xl mb-3 flex items-center justify-center
                    bg-gradient-to-br ${colors.iconBg}
                    ${
                      isActive
                        ? "shadow-lg shadow-emerald-500/30"
                        : "shadow-md"
                    }
                    transition-all duration-300
                  `}
                >
                  <div className="text-white">
                    {getCategoryIcon(category.id)}
                  </div>
                </div>

                {/* TEXT */}
                <div className="text-center w-full">
                  <h3
                    className={`
                      font-semibold mb-1 transition-colors duration-300
                      ${colors.text}
                    `}
                  >
                    {category.name}
                  </h3>
                 {
                    category.id=="ALL" && (
                          <p
                    className={`
                      text-xs transition-colors duration-300
                      ${colors.subText}
                    `}
                  >
                    {category.count} billers
                  </p>
                    )
                 }
                </div>
              </div>

              {/* ACTIVE DOT */}
              {isActive && (
                <div className="absolute top-3 right-3 pointer-events-none w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              )}

              {/* HOVER OVERLAY — non-blocking */}
              {!isActive && (
                <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 hover:from-emerald-500/5 hover:to-emerald-500/10 transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
