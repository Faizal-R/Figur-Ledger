import { IBiller } from "@/types/IBill";
import {
  Building2,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  ExternalLink,
} from "lucide-react";

export default function BillerCard({
  biller,
  theme,
}: {
  biller: IBiller;
  theme: any;
}) {
  const categoryIcons: Record<string, string> = {
    ELECTRICITY: "⚡",
    WATER: "💧",
    GAS: "🔥",
    TELECOM: "📱",
    INTERNET: "🌐",
    TAX: "💰",
    INSURANCE: "🛡️",
    EDUCATION: "🎓",
  };

  // mask ids -> BLR-AB12C / ACC-92KD3
  const maskId = (id?: string, prefix = "ID") => {
    if (!id) return "N/A";
    return `${prefix}-${id.slice(-5).toUpperCase()}`;
  };

  const formattedDate = new Date(biller.createdAt).toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <div
      className={`${theme.card} ${theme.border}
      relative rounded-2xl p-5 overflow-hidden
      transition-all duration-300
      hover:-translate-y-[3px]
      hover:shadow-xl hover:shadow-emerald-500/10
      group`}
    >
      {/* subtle gradient glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent" />

      {/* HEADER */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl shadow-lg">
            {categoryIcons[biller.category] || "🏢"}
          </div>

          <div>
            <h3
              className={`font-semibold text-base ${theme.text.primary} group-hover:text-emerald-300 transition`}
            >
              {biller.name}
            </h3>

            <span className="text-[10px] px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              {biller.category}
            </span>
          </div>
        </div>
      </div>

      {/* ID SECTION */}
      <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className={`text-[10px] ${theme.text.muted} mb-1`}>
            Biller ID
          </p>
          <p className={`text-sm font-medium ${theme.text.primary}`}>
            {maskId(biller._id, "BLR")}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className={`text-[10px] ${theme.text.muted} mb-1`}>
            Account
          </p>
          <p className={`text-sm font-medium ${theme.text.primary}`}>
            {maskId(biller.collectionAccountId, "ACC")}
          </p>
        </div>
      </div>

      {/* CONTACT */}
    {/* CONTACT - redesigned as info chips */}
<div className="pt-4 border-t border-slate-700 relative z-10">
  <div className="flex flex-wrap gap-2">
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg
      bg-slate-800/60 border border-slate-700
      hover:border-emerald-500/30 transition"
    >
      <Mail size={12} className="text-emerald-400" />
      <span className="text-xs text-slate-300 max-w-[160px] truncate">
        {biller.contact?.email || "No Email"}
      </span>
    </div>

    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg
      bg-slate-800/60 border border-slate-700
      hover:border-emerald-500/30 transition"
    >
      <Phone size={12} className="text-emerald-400" />
      <span className="text-xs text-slate-300">
        {biller.contact?.phone || "No Phone"}
      </span>
    </div>
  </div>
</div>

{/* FOOTER - cleaner fintech style */}
<div className="mt-5 pt-4 border-t border-slate-700 flex justify-between items-center relative z-10">
  <div
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg
    bg-emerald-500/10 border border-emerald-500/20
    text-[11px] text-emerald-300"
  >
    <Calendar size={12} />
    {formattedDate}
  </div>

  <button
    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg
    bg-gradient-to-r from-emerald-500/20 to-emerald-500/10
    border border-emerald-500/30
    hover:from-emerald-500/30 hover:to-emerald-500/20
    hover:text-emerald-300
    transition"
  >
    <ExternalLink size={12} />
    Details
  </button>
</div>

    </div>
  );
}
