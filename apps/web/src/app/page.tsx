import Link from "next/link";
import { ArrowRight, Shield, BarChart3, Wallet, CreditCard, TrendingUp, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-95" />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-left">
              <div className="inline-block">
                <span className="px-4 py-2 bg-emerald-400/20 text-emerald-400 rounded-full text-sm font-semibold border border-emerald-400/30">
                  Next-Gen Banking Platform
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to{" "}
                <span className="text-emerald-400">FinLedger</span>
                <br />
                Your Financial Future
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed">
                Experience microservice-based banking with cutting-edge technology.
                Manage accounts, transactions, loans, and payments—all in one secure platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link href="/login">
                  <button className="w-full sm:w-auto px-8 py-4 border border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-400/10 transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700">
                <div>
                  <div className="text-3xl font-bold text-emerald-400">99.9%</div>
                  <div className="text-sm text-slate-400">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">10k+</div>
                  <div className="text-sm text-slate-400">Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">24/7</div>
                  <div className="text-sm text-slate-400">Support</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-3xl blur-3xl opacity-20 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="FinLedger Platform"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Powerful Features for Modern Banking
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built with microservices architecture for scalability, reliability, and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Wallet, title: "Account Management", desc: "Create and manage multiple accounts with ease. Track balances and transactions in real-time." },
              { icon: CreditCard, title: "Instant Transactions", desc: "Lightning-fast deposits, withdrawals, and transfers with complete transaction history." },
              { icon: TrendingUp, title: "Loans & Credit", desc: "Apply for loans with streamlined approval workflows and flexible repayment schedules." },
              { icon: Shield, title: "Bank-Grade Security", desc: "Enterprise-level encryption and security protocols keep your data safe and private." },
              { icon: BarChart3, title: "Analytics & Reports", desc: "Comprehensive financial insights with detailed statements and admin dashboards." },
              { icon: Users, title: "Smart Notifications", desc: "Stay informed with real-time email and SMS alerts for all your financial activities." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group p-8 bg-slate-900 rounded-2xl border border-slate-700 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-emerald-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.15),transparent_50%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your <span className="text-emerald-400">Financial Future?</span>
            </h2>
            <p className="text-xl text-slate-400">
              Join thousands of users who trust FinLedger for their banking needs.
              Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-semibold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40 flex items-center justify-center gap-2">
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/login">
                <button className="w-full sm:w-auto px-8 py-4 border border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-400/10 transition-colors">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900/50 border-t border-slate-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Fin<span className="text-emerald-400">Ledger</span>
              </h3>
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} FinLedger. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
