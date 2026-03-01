import { z } from "zod";
import { Roles } from '@figur-ledger/shared';

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain one uppercase letter")
  .regex(/[a-z]/, "Password must contain one lowercase letter")
  .regex(/[0-9]/, "Password must contain one number");

// Main schema

export const userRegisterSchema = z.object({
  id: z.string().optional(),
  fullName: z
    .string()
    .trim()
    .min(2, " Name must be at least 2 characters")
    .max(50, " Name  Cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address (e.g. jane@example.com)"),
  password: passwordSchema,
  role: z.nativeEnum(Roles).default(Roles.CUSTOMER),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime().optional(), 
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address (e.g. jane@example.com)"),
  password: passwordSchema,
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
