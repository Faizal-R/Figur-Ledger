export default function UpcomingEmi() {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex justify-between items-center">
      <p className="text-amber-400 text-sm">
        Upcoming EMI of ₹12,450 due on 15 Feb 2026
      </p>
      <button className="text-sm font-medium text-amber-300 hover:underline">
        Pay Now
      </button>
    </div>
  );
}
