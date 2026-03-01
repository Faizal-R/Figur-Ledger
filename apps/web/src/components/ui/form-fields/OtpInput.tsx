"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    if (newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (value === "" && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          maxLength={1}
          value={digit}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => {
            if (e.key === "Backspace")
              handleBackspace(
                (e.target as HTMLInputElement).value,
                index
              );
          }}
          ref={(el) => { refs.current[index] = el; }}
          className="w-12 h-14 text-center text-xl bg-[#18212f] border border-slate-700 
                     text-slate-100 placeholder:text-slate-500 
                     focus:border-emerald-400 transition-all"
        />
      ))}
    </div>
  );
}

export default OtpInput;