"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { EliteTheme } from "@/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  theme: typeof EliteTheme.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("figur-theme") as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("figur-theme", newMode);
  };

  const theme = EliteTheme[mode];

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      <div className={mode === "dark" ? "dark" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
