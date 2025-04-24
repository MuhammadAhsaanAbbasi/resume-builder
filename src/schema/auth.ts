import * as z from "zod";

export const RegisterSchema = z.object({
    firstname: z.string().min(4, { message: "First name is required" }), 
    lastname: z.string().min(4, { message: "Last name is required" }),
    username: z.string().min(6, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password is required" }),
    confirmPassword: z.string().min(8, { message: "Confirm password is required" })
})

.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password is required" }),
});