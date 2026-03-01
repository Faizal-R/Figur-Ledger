import { TrendingUp, DollarSign, PieChart } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

const BrandingSection = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(222_47%_11%)] to-[hsl(217_33%_14%)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(158_64%_52%_/_0.15),transparent_50%)]" />
      <div className="absolute inset-0 opacity-20">
        <img src={heroImage.src} alt="Financial Technology" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex flex-col justify-between p-12 text-[hsl(210_40%_98%)]">
        <div className="animate-fade-in-right">
          <h1 className="text-4xl font-bold mb-2">
            Fin<span className="text-[hsl(158_64%_52%)]">Ledger</span>
          </h1>
          <p className="text-[hsl(215_20%_65%)]">Advanced Banking & Finance Platform</p>
        </div>

        <div className="space-y-8 animate-fade-in-right" style={{ animationDelay: "0.2s" }}>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Join Thousands of{" "}
              <span className="text-[hsl(158_64%_52%)]">Smart Users</span>
            </h2>
            <p className="text-[hsl(215_20%_65%)] text-lg">
              Experience modern banking with powerful tools for managing your finances.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <TrendingUp className="w-5 h-5 text-[hsl(158_64%_52%)]" />,
                title: "Smart Analytics",
                desc: "Track spending patterns and get personalized insights",
              },
              {
                icon: <DollarSign className="w-5 h-5 text-[hsl(158_64%_52%)]" />,
                title: "Multi-Currency Support",
                desc: "Manage accounts in multiple currencies effortlessly",
              },
              {
                icon: <PieChart className="w-5 h-5 text-[hsl(158_64%_52%)]" />,
                title: "Financial Planning",
                desc: "Set goals and track your progress automatically",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-[hsl(158_64%_52%_/_0.2)] rounded-lg">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-[hsl(215_20%_65%)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-[hsl(215_20%_65%)] animate-fade-in-right" style={{ animationDelay: "0.4s" }}>
          © 2024 FinLedger. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default BrandingSection;
