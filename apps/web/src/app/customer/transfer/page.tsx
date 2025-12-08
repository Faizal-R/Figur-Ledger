import { FinledgerTheme } from "@/theme";
import TransferHeader from "@/components/feature/customer/transfer/TransferHeader";
// import AccountSelector from "@/components/accounts/AccountSelector";
import TransferForm from "@/components/feature/customer/transfer/TransferForm";

export default function TransferPage() {
  return (
    <div className={`${FinledgerTheme.background} min-h-screen p-8`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <TransferHeader />
        <TransferForm />
      </div>
    </div>
  );
}
