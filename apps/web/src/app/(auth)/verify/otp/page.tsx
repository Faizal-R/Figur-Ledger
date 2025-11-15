import { OtpVerifyClient } from "@/components/feature/auth/OtpVerifyClient";

// SERVER COMPONENT
export default function VerifyOtpPage({ searchParams }: { searchParams: { email?: string } }) {
  const email = searchParams.email ?? "";
  console.log(email)
  return (
    <OtpVerifyClient email={email} />
  );
}
