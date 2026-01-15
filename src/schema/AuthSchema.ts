import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  gender: z.enum(["male", "female", "other"], {
    error: "Gender is required",
  }),

  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Phone number must be a number"),

  role: z.enum(["admin", "user"]),


});

export const registerSecondSchema = z.object({
  
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password must be at most 20 characters"),

  address: z.array(
    z.object({
      street: z.string().min(5, "Street is required"),
      city: z.string().min(2, "City is required"),
      state: z.string().min(2, "State is required"),
      pin: z
        .number()
        .int()
        .min(100000, "PIN must be 6 digits")
        .max(999999, "PIN must be 6 digits"),
    })
  ).min(1, "At least one address is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});


export type RegisterSecondData = z.infer<typeof registerSecondSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type CreateUserData = z.infer<typeof createUserSchema>;