import { OtpVerifyClient } from "@/components/features/auth/OtpVerifyClient";


export default async function VerifyOtpPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const email = resolvedSearchParams.email ?? "";
  console.log(email)
  return (
    <OtpVerifyClient email={email} />
  );
}
