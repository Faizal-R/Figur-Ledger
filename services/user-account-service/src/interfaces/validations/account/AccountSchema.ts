import { z } from "zod";
import { DateString } from "@figur-ledger/types";
import { accountType } from "../../../interator/constant/account";
import { AccountType } from "../../../domain/entities/Account";

export const AccountSchema = z.object({
  id: z.string().optional(),

  userId: z.string().min(1, "User ID is required"),

  accountNumber: z
    .string()
    .regex(/^[0-9]{8,20}$/, "Account number must be 8–20 digits").optional(),

  type: z.enum(Object.values(accountType) as AccountType[]).optional(),

  balance: z.number().min(0, "Balance cannot be negative").optional(),

  currency: z
    .string()
    .regex(/^[A-Z]{3}$/, "Currency must be a valid 3-letter ISO code (e.g., USD)").optional(),

  status: z.enum(["active", "frozen", "closed"]).optional(),

  nickname: z.string().min(1, "Nickname is required"),

  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code").optional(),

  interestRate: z.number().optional(),
  minBalance: z.number().optional(),

  createdAt: z.string().datetime().optional() as z.ZodType<DateString>,
  updatedAt: z.string().datetime().optional() as z.ZodType<DateString>,
});
