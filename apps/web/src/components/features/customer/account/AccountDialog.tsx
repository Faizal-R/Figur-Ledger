"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/buttons/button";
import { useState, useEffect } from "react";
import { z } from "zod";
import { IAccount } from "@/types/user-account";

// Schema validation
const accountSchema = z.object({
  accountType: z.enum(["savings", "current", "credit","checking","business","salary"]),
  currency: z.string().min(1, "Currency is required"),
  balance: z.number().min(0, "Balance must be positive"),
});

type AccountFormData = z.infer<typeof accountSchema>;

interface AccountDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mode: "create" | "update";
  account?: IAccount | null;
  onSubmit: (data: AccountFormData) => void; // Send raw validated form data upward
}

const AccountDialog = ({
  isOpen,
  setIsOpen,
  mode,
  account,
  onSubmit,
}: AccountDialogProps) => {
  const [formData, setFormData] = useState<AccountFormData>({
    accountType: "savings",
    currency: "USD",
    balance: 0,
  });

  // Prefill when editing
  useEffect(() => {
    if (account && mode === "update") {
      setFormData({
        accountType: account.type,
        currency: account.currency,
        balance: account.balance,
      });
    } else {
      setFormData({ accountType: "savings", currency: "USD", balance: 0 });
    }
  }, [account, mode]);

  const handleSubmit = () => {
    const parsed = accountSchema.safeParse(formData);
    if (!parsed.success) return; // Validation handled externally (e.g., toast)
    onSubmit(parsed.data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px] bg-slate-900 border border-emerald-400/30 shadow-emerald-500/30 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-100">
            {mode === "create" ? "Open a New Account" : "Update Account"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === "create"
              ? "Fill in the details below to create your new account."
              : "Modify the account details and save your changes."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Account Type</Label>
            <Select
              value={formData.accountType}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  accountType: value as AccountFormData["accountType"],
                }))
              }
            >
              <SelectTrigger className="bg-slate-800 border border-slate-700 text-slate-100">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border border-slate-700 text-slate-100">
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Currency</Label>
            <Input
              value={formData.currency}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, currency: e.target.value }))
              }
              className="bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">
              {mode === "create" ? "Initial Balance" : "Current Balance"}
            </Label>
            <Input
              type="number"
              value={formData.balance}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  balance: Number(e.target.value),
                }))
              }
              className="bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-400 text-slate-900 font-semibold px-6 rounded-lg hover:bg-emerald-500"
          >
            {mode === "create" ? "Create Account" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialog;
