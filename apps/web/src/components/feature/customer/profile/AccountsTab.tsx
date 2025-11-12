"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, TrendingUp, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IAccount } from "@/types/user-account";
import { Button } from "@/components/ui/button";
import AccountDialog from "../account/AccountDialog";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const getAccountIcon = (type: string) => {
  if (type.includes("Investment"))
    return <TrendingUp className="h-6 w-6 text-emerald-400" />;
  if (type.includes("Savings"))
    return <CreditCard className="h-6 w-6 text-emerald-400" />;
  return <Building2 className="h-6 w-6 text-emerald-400" />;
};

const accountSchema = z.object({
  accountType: z.enum(["savings", "current", "credit"]),
  currency: z.string().min(1),
  balance: z.number().min(0),
});

const AccountsTab = ({ accounts }: { accounts: IAccount[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userAccounts, setUserAccounts] = useState<IAccount[]>(accounts);

  const handleCreateAccount = async (data: any) => {
    const parsed = accountSchema.safeParse(data);
    if (!parsed.success) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    const newAccount: IAccount = {
      id: crypto.randomUUID(),
      userId: "dummy-user-id", // replace with actual
      accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
      accountType: parsed.data.accountType,
      balance: parsed.data.balance,
      currency: parsed.data.currency,
      status: "active",
      createdAt: new Date().toISOString(),
      lastTransactionAt: new Date().toISOString(),
    };

    setUserAccounts((prev) => [...prev, newAccount]);
    toast.success("Account created successfully!");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-5">
      {userAccounts.map((acc) => (
        <Card
          key={acc.id}
          className="bg-slate-800/80 border border-slate-700 hover:border-emerald-400/40 
                     transition-all duration-300 rounded-2xl hover:shadow-emerald-400/20 
                     hover:-translate-y-1"
        >
          <CardContent className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                {getAccountIcon(acc.accountType)}
              </div>
              <div>
                <h3 className="text-slate-100 font-semibold">
                  {acc.accountType}
                </h3>
                <p className="text-slate-400 text-sm">{acc.accountNumber}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge className="border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                    {acc.status}
                  </Badge>
                  <span className="text-slate-400 text-xs">
                    Last transaction: {acc.lastTransactionAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-slate-100 font-bold text-2xl text-right">
              {formatCurrency(acc.balance)}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-slate-800/80 border border-emerald-400/30 rounded-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all">
        <CardContent className="p-6 flex items-center justify-between gap-6">
          <div className="p-4 rounded-xl bg-emerald-400/20 flex items-center justify-center shadow-inner">
            <CreditCard className="h-6 w-6 text-emerald-400" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-slate-100 text-lg">
              Want to open a new account?
            </h3>
            <p className="text-sm text-slate-400">
              Explore our range of financial products
            </p>
          </div>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-emerald-400 text-slate-900 font-semibold px-6 rounded-lg hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            Open Account
          </Button>
        </CardContent>
      </Card>

      <AccountDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        mode="create"
        onSubmit={handleCreateAccount}
      />
    </div>
  );
};

export default AccountsTab;
