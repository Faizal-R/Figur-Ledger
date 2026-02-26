"use client";
import { IBiller } from "@/types/IBill";
import BillerCard from "./BillerCard";
import EmptyState from "./EmptyState";

export default function BillerGrid({ billers }: { billers: IBiller[] }) {
  if (billers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {billers.map((biller) => (
        <BillerCard key={biller._id} biller={biller} />
      ))}
    </div>
  );
}