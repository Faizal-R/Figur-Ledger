import LoginForm from "@/components/feature/auth/LoginForm";
import { Shield, Zap, Lock } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";
const LoginPage = () => {
  return (
    <div className="min-h-screen flex bg-[hsl(222_47%_11%)] text-[hsl(210_40%_98%)]">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(217_33%_14%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(158_64%_52%_/_0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-20">
          <img
            src={heroImage.src}
            alt="Financial Technology"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="animate-fade-in-left">
            <h1 className="text-4xl font-bold mb-2 text-[hsl(158_64%_52%)]">
              Fin<span className="text-[hsl(158_84%_42%)]">Ledger</span>
            </h1>
            <p className="text-[hsl(215_20%_65%)]">
              Advanced Banking & Finance Platform
            </p>
          </div>

          <div
            className="space-y-8 animate-fade-in-left"
            style={{ animationDelay: "0.2s" }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Banking Made{" "}
                <span className="text-[hsl(158_64%_52%)]">Simple</span>
              </h2>
              <p className="text-[hsl(215_20%_65%)] text-lg">
                Experience the future of digital banking with secure, fast, and
                intelligent financial services.
              </p>
            </div>

            <div className="space-y-4">
              {/** Feature Items */}
              {[
                {
                  icon: <Shield className="w-5 h-5 text-[hsl(158_64%_52%)]" />,
                  title: "Bank-Grade Security",
                  desc: "Your data is protected with enterprise-level encryption",
                },
                {
                  icon: <Zap className="w-5 h-5 text-[hsl(45_93%_58%)]" />,
                  title: "Lightning Fast",
                  desc: "Instant transactions and real-time updates",
                },
                {
                  icon: <Lock className="w-5 h-5 text-[hsl(0_84%_60%)]" />,
                  title: "Privacy First",
                  desc: "Your financial data stays yours, always",
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-[hsl(158_64%_52%_/_0.2)] rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-[hsl(210_40%_98%)]">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[hsl(215_20%_65%)]">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="text-sm text-[hsl(215_20%_65%)] animate-fade-in-left"
            style={{ animationDelay: "0.4s" }}
          >
            © 2024 FinLedger. All rights reserved.
          </div>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
