export const FigurLedgerTheme = {
  background: "bg-slate-900",
  card: "bg-[#18212f]",
  cardRounded: "rounded-2xl",
  border: "border border-slate-700",
  text: {
    primary: "text-white",
    secondary: "text-slate-400",
    muted: "text-slate-500",
  },
  accent: {
    gradient: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    glow: "shadow-lg shadow-emerald-500/30",
    hoverGlow: "hover:shadow-xl hover:shadow-emerald-500/40",
    ring: "ring-emerald-400/50",
  },
  gradients: {
    emeraldTeal:
      "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500",
    emeraldGreen: "bg-gradient-to-r from-emerald-300 to-green-400",
    subtleEmerald: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
    glow: "from-emerald-400/20 via-emerald-500/20 to-teal-500/20",
  },
  input: {
    base: "bg-[#18212f] border border-slate-700 text-white",
    focus: "focus:border-emerald-400 transition-all",
  },
  button: {
    primary:
      "bg-gradient-to-r rounded-lg from-emerald-400 text-white 0 to-emerald-500  font-semibold shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 transition-all",
    secondary:
      "bg-slate-800 rounded-lg border border-slate-700 text-white font-medium hover:bg-slate-700 hover:border-slate-600 shadow-md hover:shadow-lg transition-all",
  },
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
  },
};

export const FigurLedgerThemeV2 = {
  background: "bg-[#f8faf8]",
  bgGradient: "bg-gradient-to-br from-[#f0f7f0] via-white to-[#e8f5e9]",
  card: {
    main: "bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm",
    dark: "bg-gradient-to-br from-[#1a3a32] to-[#2d5a4c] shadow-xl shadow-[#1a3a32]/20",
    accent: "bg-[#c1ff72] shadow-lg shadow-[#c1ff72]/30",
  },
  text: {
    primary: "text-[#1a2e2a]",
    secondary: "text-[#4a635d]",
    muted: "text-[#8ba39c]",
    inverse: "text-white",
    accent: "text-[#1a3a32]",
  },
  accent: {
    primary: "bg-[#c1ff72]",
    primaryHover: "hover:bg-[#b0f061]",
    secondary: "bg-[#1a3a32]",
    glass: "bg-white/20 backdrop-blur-md",
  },
  gradients: {
    hero: "bg-gradient-to-br from-[#1a3a32] to-[#2d5a4c]",
    card: "bg-gradient-to-br from-[#1a3a32] via-[#244f44] to-[#2d5a4c]",
    light: "bg-gradient-to-br from-white to-[#f1f8f1]",
  },
  radius: {
    xs: "rounded-md",
    sm: "rounded-lg",
    md: "rounded-2xl",
    lg: "rounded-[2.5rem]",
    full: "rounded-full",
  },
  button: {
    primary:
      "bg-[#c1ff72] text-[#1a3a32] font-bold hover:scale-105 active:scale-95 transition-all",
    dark: "bg-[#1a3a32] text-white font-semibold hover:bg-[#244f44] transition-all",
  },
};

export const EliteTheme = {
  light: {
    background: "bg-[#f8faf8]",
    meshGradient:
      "bg-[#f8faf8] bg-[radial-gradient(at_0%_0%,rgba(193,255,114,0.1)_0,transparent_50%),radial-gradient(at_100%_0%,rgba(26,58,50,0.05)_0,transparent_50%)]",
    text: {
      display: "text-[#0a1a15] font-black tracking-tighter leading-[1.1]",
      heading: "text-[#0a1a15] font-bold tracking-tight",
      body: "text-[#1a2e2a] font-medium leading-relaxed",
      muted: "text-[#4a635d]", // explicitly darker
      accent: "text-[#0a1a15]",
      lime: "text-[#1a3a32]",
      white: "text-white",
    },
    card: {
      base: "bg-[#f4faf4] border border-green-100 shadow-sm",
      bento:
        "bg-[#f4faf4] border border-green-50 shadow-sm hover:shadow-md transition-all duration-300",
      emerald: "bg-[#0a1a15] text-white shadow-xl",
      lime: "bg-[#c1ff72] shadow-md",
      onyx: "bg-[#0a1a15] text-white shadow-xl",
    },
    button: {
      primary:
        "bg-[#b0f061] text-[#0a1a15] font-bold hover:bg-[#c1ff72] transition-all duration-200 shadow-sm",
      onyx: "bg-[#0a1a15] text-white font-bold hover:bg-[#1a3a32] transition-all duration-200",
      glass:
        "bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200 transition-all",
    },
    radius: {
      xs: "rounded-lg",
      sm: "rounded-xl",
      md: "rounded-2xl",
      lg: "rounded-3xl",
      full: "rounded-full",
    },
  },
  dark: {
    background: "bg-[#050a09]",
    // Midnight Emerald Mesh Gradient
    meshGradient:
      "bg-[#050a09] bg-[radial-gradient(at_0%_0%,rgba(193,255,114,0.1)_0,transparent_50%),radial-gradient(at_100%_0%,rgba(26,58,50,0.2)_0,transparent_50%),radial-gradient(at_50%_50%,rgba(10,26,21,0.4)_0,transparent_80%)]",
    text: {
      display: "text-white font-black tracking-tighter leading-[0.9]",
      heading: "text-[#f1f8f1] font-bold tracking-tight",
      body: "text-[#b0c4b1] font-medium leading-relaxed",
      muted: "text-[#6a8d73] font-medium",
      accent: "text-[#c1ff72]",
      lime: "text-[#c1ff72]",
      white: "text-white",
    },
    card: {
      base: "bg-[#0a1a15]/60 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
      bento:
        "bg-[#0a1a15]/80 border-[#1a3a32]/30 shadow-2xl hover:border-[#c1ff72]/20 transition-all duration-500",
      emerald:
        "bg-gradient-to-br from-[#050a09] via-[#0a1a15] to-[#050a09] border border-white/5 shadow-2xl",
      lime: "bg-[#c1ff72] shadow-[0_15px_35px_rgba(193,255,114,0.2)]",
      onyx: "bg-black border border-white/10 shadow-2xl",
    },
    button: {
      primary:
        "bg-[#c1ff72] text-[#0a1a15] font-black hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_40px_rgba(193,255,114,0.4)]",
      onyx: "bg-white text-[#0a1a15] font-bold hover:bg-[#e8f5e9] transition-all duration-300",
      glass:
        "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all",
    },
    radius: {
      xs: "rounded-xl",
      sm: "rounded-2xl",
      md: "rounded-3xl",
      lg: "rounded-[3rem]",
      full: "rounded-full",
    },
  },
};
