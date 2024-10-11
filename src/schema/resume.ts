import * as z from "zod"

export const resumeSchema = z.object({
    title:z.string().min(3, {message: "Title is required"}),
})


export const resumePersonalDetailsSchema = z.object({
    firstName:z.string().min(3, {message: "First Name is required"}),
    lastName:z.string().min(3, {message: "Last Name is required"}),
    jobTitle:z.string().min(3, {message: "Job Title is required"}),
    address: z.string().min(3, {message: "Address is required"}),
    phone:z.string().min(3, {message: "Phone is required"}),
    email:z.string().email({message: "Email is required"}),
})