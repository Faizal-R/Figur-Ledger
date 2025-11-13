import z from 'zod';

const RegisterSchema = z.object({
  // Email with additional checks
  email: z.string()
    .email("Please provide a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters")
    .transform(email => email.toLowerCase().trim()),
  
  // Phone number (required for banking)
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?[\d\s-()]+$/, "Please provide a valid phone number"),
  
  // Strong password requirements
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  
  // Personal information (KYC requirements)
  personalInfo: z.object({
    firstName: z.string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
    
    lastName: z.string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
    
    dateOfBirth: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format")
      .refine(dob => {
        const birthDate = new Date(dob);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        return age >= 18;
      }, "You must be at least 18 years old to register")
  }),
  
  // Address information (required for banking)
  address: z.object({
    street: z.string()
      .min(1, "Street address is required")
      .max(100, "Street address must be less than 100 characters"),
    
    city: z.string()
      .min(1, "City is required")
      .max(50, "City must be less than 50 characters"),
    
    state: z.string()
      .min(1, "State is required")
      .max(50, "State must be less than 50 characters"),
    
    zipCode: z.string()
      .min(5, "ZIP code must be at least 5 characters")
      .max(10, "ZIP code must be less than 10 characters")
      .regex(/^[0-9-]+$/, "ZIP code can only contain numbers and hyphens")
  })
});

// Optional: Add confirm password validation
export const RegisterWithConfirmSchema = RegisterSchema.extend({
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export default RegisterSchema;



export const loginSchema=z.object({
   email: z.string()
    .email("Please provide a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters")
    .transform(email => email.toLowerCase().trim()),
    password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})


