import * as z from "zod"

export const resumeSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
})


export const resumePersonalDetailsSchema = z.object({
    firstName: z.string().min(3, { message: "First Name is required" }),
    lastName: z.string().min(3, { message: "Last Name is required" }),
    jobTitle: z.string().min(3, { message: "Job Title is required" }),
    address: z.string().min(3, { message: "Address is required" }),
    phone: z.string().min(3, { message: "Phone is required" }),
    email: z.string().email({ message: "Email is required" }),
})

// Define the schema for a single experience object
const ExperienceSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    companyName: z.string().min(1, { message: 'Company name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    startDate: z.string().min(1, { message: 'Start date is required' }),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean().default(false),
    workSummary: z.string().optional(),
});

// Schema for an array of experiences
export const ExperienceFormSchema = z.object({
    experience: z.array(ExperienceSchema).min(1, {
        message: 'At least one experience is required',
    }),
});
