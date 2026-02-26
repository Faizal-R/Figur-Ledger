import LoanControlHero from "@/components/features/admin/loan-products/LoanControlHero";
import LoanActionStrip from "@/components/features/admin/loan-products/LoanActionStripe";
import LoanProductGrid from "@/components/features/admin/loan-products/LoanProductGrid";
import LoanInsightPanel from "@/components/features/admin/loan-products/LoanInsightPanel";

export default function LoanProductManagementPage() {
  return (
    <div className={`min-h-screen px-8 py-10`}>
      <div className="max-w-7xl mx-auto space-y-10">
        <LoanControlHero />
        <LoanActionStrip />
        <LoanProductGrid />
        <LoanInsightPanel />
      </div>
    </div>
  );
}
