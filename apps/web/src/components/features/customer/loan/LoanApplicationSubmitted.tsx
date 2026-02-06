import { FinledgerTheme } from "@/theme";

export default function LoanApplicationSubmitted({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.radius.lg} ${FinledgerTheme.border}
      w-full max-w-md p-6`}
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <span className="text-emerald-400 text-2xl">✓</span>
        </div>

        <h2 className="text-xl font-semibold text-white">
          Loan Application Submitted
        </h2>

        <p className="text-slate-400 text-sm">
          Your loan request has been received and is currently under review.
        </p>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-sm space-y-2">
          <Info text="Our team will review your application within 24 hours." />
          <Info text="You will be notified once a decision is made." />
          <Info text="No amount is deducted until approval." />
        </div>

        <button
          onClick={onClose}
          className={`${FinledgerTheme.button.secondary} w-full py-2.5 rounded-xl`}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Info({ text }: { text: string }) {
  return (
    <p className="text-slate-300 text-sm">• {text}</p>
  );
}
