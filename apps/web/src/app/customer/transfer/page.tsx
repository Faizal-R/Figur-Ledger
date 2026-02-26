import TransferHeader from "@/components/features/customer/transfer/TransferHeader";
import TransferForm from "@/components/features/customer/transfer/TransferForm";

export default function TransferPage() {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-4 md:p-8 space-y-6">
      <div className="w-full max-w-xl space-y-6">
        <TransferHeader />
        <TransferForm />
      </div>
    </div>
  );
}
