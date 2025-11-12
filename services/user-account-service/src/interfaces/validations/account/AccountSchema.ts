import { z } from "zod";

// ✅ Define Account Schema
export const AccountSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),

  accountNumber: z
    .string()
    .regex(/^[0-9]{8,20}$/, "Account number must be 8–20 digits"),

  accountType: z.enum(["savings", "current", "credit"]),

  balance: z
    .number()
    .min(0, "Balance cannot be negative")
    .default(0),

  currency: z
    .string()
    .min(1, "Currency is required")
    .regex(/^[A-Z]{3}$/, "Currency must be a valid 3-letter code (e.g., USD)"),

  status: z.enum(["active", "frozen", "closed"]).default("active"),

  transactionCount: z.number().optional(),
  lastTransactionAt: z.string().datetime().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

// ✅ Export inferred TypeScript type
export type AccountInput = z.infer<typeof AccountSchema>;
