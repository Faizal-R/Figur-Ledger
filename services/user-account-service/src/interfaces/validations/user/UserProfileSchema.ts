import { z } from "zod";
import { ROLES } from "../../../domain/enums";

export const userProfileSchema = z.object({
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
  
    role: z.nativeEnum(ROLES).default(ROLES.CUSTOMER),
    isActive: z.boolean().default(false),
    createdAt: z.string().datetime().optional(), 
  });