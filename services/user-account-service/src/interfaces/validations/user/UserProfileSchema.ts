import { z } from "zod";

export const userProfileSchema = z.object({
    id: z.string().optional(),
    personalInfo: z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        dateOfBirth: z.preprocess((arg) => {
            if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
        }, z.date()),
    }),

        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Please enter a valid email address (e.g. jane@example.com)").optional(),
        phone: z.number().min(10, "Phone number must be at least 10 digits").optional(),
    
    address: z.object({
        street: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zipCode: z.string().min(1, "Zip code is required"),
        country: z.string().min(1, "Country is required"),
    }),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});
