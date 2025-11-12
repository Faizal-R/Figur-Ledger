import type { Config } from "tailwindcss";
import { default as colors } from "tailwindcss/colors";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "hsl(158 64% 52%)",
          primaryDark: "hsl(158 84% 42%)",
          background: "hsl(222 47% 11%)",
          surface: "hsl(217 33% 14%)",
          border: "hsl(217 33% 20%)",
          text: {
            light: "hsl(210 40% 98%)",
            muted: "hsl(215 20% 65%)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
