"use client"; // required for hooks

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/api/useAuth";
import { useAuthUserStore } from "@/store";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { setUser: setUserInStore, setToken } = useAuthUserStore();

  const navigator = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast("Please enter your email");
    if (!password.trim()) return toast("Please enter your password");

    login.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          console.log(res);
          setUserInStore({
            email: res.data.user.email,
            id: res.data.user.id as string,
            phone: res.data.user.phone,
            role: res.data.user.role,
          });

          setToken(res.data.accessToken);

          navigator.push(`/${res.data.user.role.toLowerCase()}/dashboard`);
          toast.success("Login successful!");
        },

        onError: (err: any) => {
          // err is ApiErrorResponse because axios interceptor normalizes it
          toast.error(err.message || "Login failed");
        },
      }
    );
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[hsl(222,47%,11%)]">
      <div className="w-full max-w-md space-y-8 animate-fade-in-right">
        <div className="lg:hidden text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[hsl(158_64%_52%)]">
            Fin<span className="text-[hsl(158_84%_42%)]">Ledger</span>
          </h1>
          <p className="text-[hsl(215_20%_65%)]">Advanced Banking Platform</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-[hsl(215_20%_65%)]">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[hsl(210_40%_98%)]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-[hsl(217_33%_14%)] border border-[hsl(217_33%_20%)] text-[hsl(210_40%_98%)] focus:border-[hsl(158_64%_52%)] transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[hsl(210_40%_98%)]">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[hsl(158_64%_52%)] hover:text-[hsl(158_84%_42%)] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-[hsl(217_33%_14%)] border border-[hsl(217_33%_20%)] text-[hsl(210_40%_98%)] focus:border-[hsl(158_64%_52%)] transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[hsl(158_64%_52%)] to-[hsl(158_84%_42%)] text-[hsl(222_47%_11%)] font-semibold shadow-[0_10px_40px_-10px_hsl(158_64%_52%_/_0.3)] hover:scale-105 transition-all group"
            size="lg"
          >
            Sign in
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[hsl(217_33%_25%)]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[hsl(217_33%_17%)] px-2 text-[hsl(215_20%_65%)]">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-[hsl(217_33%_14%)] border border-[hsl(217_33%_25%)] hover:border-[hsl(158_64%_52%)] hover:text-[hsl(158_64%_52%)] transition-all"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-[hsl(217_33%_14%)] border border-[hsl(217_33%_25%)] hover:border-[hsl(45_93%_58%)] hover:text-[hsl(45_93%_58%)] transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-[hsl(215_20%_65%)]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[hsl(158_64%_52%)] hover:text-[hsl(158_84%_42%)] transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
