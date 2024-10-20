import * as z from "zod"

export const resumeSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
})


export const resumePersonalDetailsSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    jobTitle: z.string(),
    address: z.string(),
    phone: z.string(),
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

// Define the schema for a single education object
const EducationSchema = z.object({
    universityName: z.string().min(3, { message: 'Title is required' }),
    startDate: z.string().min(1, { message: 'Start date is required' }),
    endDate: z.string().optional(),
    degree: z.string().min(1, { message: 'Degree is required' }),
    major: z.string().min(1, { message: 'Major Subject is required' }),
    description: z.string().optional(),
});

// Schema for an array of experiences
export const EducationFormSchema = z.object({
    education: z.array(EducationSchema).min(1, {
        message: 'At least one experience is required',
    }),
});

// Define the schema for a single Skills object
const SkillSchema = z.object({
    name: z.string().min(3, { message: 'Title is required' }),
    rating: z.number().min(1, { message: 'Start date is required' }),
});

// Schema for an array of experiences
export const SkillsFormSchema = z.object({
    skills: z.array(SkillSchema).min(1, {
        message: 'At least one experience is required',
    }),
});
