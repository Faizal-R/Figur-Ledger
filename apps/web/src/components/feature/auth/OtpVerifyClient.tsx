"use client";

import { OtpInput } from "@/components/ui/form-fields/OtpInput";
import { toast } from "sonner";
import { useAuth } from "@/hooks/api/useAuth";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "@/store";

export function OtpVerifyClient({ email }: { email: string }) {
  const router = useRouter();
  const { verifyOtp } = useAuth();
  const {login:setUserInStore}=useAuthUserStore()
  

  const handleOtpComplete = async (code: string) => {
      console.log(code)
   verifyOtp.mutate(
  { email, otp: code },
  {
    onSuccess: (res) => {
      toast.success(res.message);
      console.log(res)
      console.log("otp verified",res)
     
        setUserInStore({
          email:res.data.user.email,
          id:res.data.user.id as string,
          phone:res.data.user.phone,
          role:res.data.user.role
        })

        useAuthUserStore.getState().setToken(res.data.accessToken)


      router.push(`/${res.data.user.role}/dashboard`);
  
    },
    onError: (err) => {
      // err is already normalized by axios interceptor + parseAxiosError
      toast.error(err.message || "OTP verification failed");
    },
  }
);

  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in-left">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Verify OTP
          </h2>
          <p className="text-slate-400 mt-2">
            Enter the 6-digit code sent to{" "}
            <span className="text-emerald-400">{email}</span>
          </p>
        </div>

        <OtpInput length={6} onComplete={handleOtpComplete} />

        {/* <Button
          className="w-full h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 
                     text-slate-900 font-semibold shadow-lg shadow-emerald-500/30 
                     hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 
                     transition-all group"
          onClick={() => toast.info("Enter OTP above")}
        >
          Verify OTP
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button> */}

        <p className="text-center text-sm text-slate-400">
          Didn’t receive the code?{" "}
          <button
            onClick={() => toast.info("Resend OTP API not implemented")}
            className="text-emerald-400 hover:text-emerald-500 transition-colors"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
