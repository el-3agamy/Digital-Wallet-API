// auth.validation.js
import z, { email } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(3).max(12),
    lastName: z.string().min(3).max(12),
    email: z.string().email(),
    phone: z.union([z.string() , z.number()]),
    password: z.string().min(3).max(12),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const googleSignInSchema = z.object({
  email : z.string().email() 
})
