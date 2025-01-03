"use server"
import { EducationFormSchema, ExperienceFormSchema, resumePersonalDetailsSchema, resumeSchema, SkillsFormSchema } from "@/schema/resume"
import * as z from "zod"
import { v4 as uuidv4 } from 'uuid';


const TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_KEY!

const HEADERS = {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${TOKEN}`,
}

export const generateResume = async (userId: string, userName: string,
    values: z.infer<typeof resumeSchema>) => {
    const ValidatedTypes = resumeSchema.safeParse(values)

    if (!ValidatedTypes.success) {
        return { error: "Invalid Types" }
    }

    const { title } = ValidatedTypes.data;
    const data = {
        data: {
            title: title,
            userId: userId,
            userName: userName,
            resumeId: uuidv4(),
        }
    }
    try {
        const request = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes`, {
            headers: HEADERS,
            method: "POST",
            body: JSON.stringify(data)
        })

        if (request.status !== 201) {
            const error = await request.json();
            return { error: error.detail };
        }

        const response = await request.json();

        console.log(response.data.documentId);

        return { success: response.data.documentId, "messege": "Resume created" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const getResumeList = async (UserId: string) => {
    try {
        const request = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes?filters[userId][$eq]=${UserId}`, {
            headers: HEADERS,
            method: "GET",
        })

        if (request.status !== 200) {
            const error = await request.json();
            return { error: error.detail };
        }

        const response = await request.json();

        console.log(response);

        return { success: response.data, "messege": "Resume Details" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const UpdateRequest = async (data: object, resumeId: string) => {
    const request = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes/${resumeId}`, {
        headers: HEADERS,
        method: "PUT",
        body: JSON.stringify(data)
    })

    const updateResponse = await request.json();

    return updateResponse
}


export const UpdatePersonalDetails = async (resumeId: string, values: z.infer<typeof resumePersonalDetailsSchema>) => {
    const ValidatedTypes = resumePersonalDetailsSchema.safeParse(values)

    if (!ValidatedTypes.success) {
        return { error: "Invalid Types" }
    }

    const { firstName, lastName, jobTitle, address, phone, email } = ValidatedTypes.data;
    try {
        const data = {
            data: {
                firstName: firstName,
                lastName: lastName,
                jobTitle: jobTitle,
                address: address,
                phone: phone,
                email: email
            }
        }

        const response = await UpdateRequest(data, resumeId);

        // console.log(updateResponse)

        return { success: response.data, "message": "Successfully Resume Updated!!" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const UpdateSummery = async (resumeId: string, summary: string) => {
    try {
        const data = {
            data: {
                summary: summary
            }
        }

        const response = await UpdateRequest(data, resumeId);

        // console.log(updateResponse)

        return { success: response.data, "message": "Successfully Resume Updated!!" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const UpdateExperience = async (resumeId: string,
    values: z.infer<typeof ExperienceFormSchema>) => {
    const ValidatedTypes = ExperienceFormSchema.safeParse(values)

    if (!ValidatedTypes.success) {
        return { error: "Invalid Types" }
    }

    const { experience } = ValidatedTypes.data;
    try {
        console.log(experience)
        const data = {
            data: {
                experience: experience
            }
        }

        const response = await UpdateRequest(data, resumeId);

        // console.log(`UpdatedResume: ${updateResponse}`) 

        return { success: response.data, "message": "Successfully Resume Updated!!" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const UpdateEducation = async (resumeId: string,
    values: z.infer<typeof EducationFormSchema>) => {
    const ValidatedTypes = EducationFormSchema.safeParse(values)

    if (!ValidatedTypes.success) {
        return { error: "Invalid Types" }
    }

    const { education } = ValidatedTypes.data;
    try {
        console.log(education)
        const data = {
            data: {
                education: education
            }
        }

        const response = await UpdateRequest(data, resumeId);

        // console.log(`UpdatedResume: ${updateResponse}`) 

        return { success: response.data, "message": "Successfully Resume Updated!!" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const UpdateSkills = async (resumeId: string,
    values: z.infer<typeof SkillsFormSchema>) => {
    const ValidatedTypes = SkillsFormSchema.safeParse(values)

    if (!ValidatedTypes.success) {
        return { error: "Invalid Types" }
    }

    const { skills } = ValidatedTypes.data;
    try {
        console.log(skills)
        const data = {
            data: {
                skills: skills
            }
        }

        const response = await UpdateRequest(data, resumeId);

        // console.log(`UpdatedResume: ${updateResponse}`) 

        return { success: response.data, "message": "Successfully Resume Updated!!" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const UpdateThemeColor = async (resumeId: string, themeColor: string) => {
    console.log(themeColor)
    try {
        const data = {
            data: {
                themeColor: themeColor
            }
        }

        const response = await UpdateRequest(data, resumeId);

        // console.log(`UpdatedResume: ${updateResponse}`) 

        return { success: response.data, "message": "Successfully Resume Updated!!" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const getResumeData = async (resumeId: string) => {
    try {
        const request = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes/${resumeId}?populate[0]=experience&populate[1]=education&populate[2]=skills`, {
            headers: HEADERS,
            method: "GET",
            cache: "no-cache",
        })

        if (request.status !== 200) {
            const error = await request.json();
            return { error: error.detail };
        }

        const response = await request.json();

        // console.log(response.data);

        return { success: response.data }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const deleteResume = async (resumeId: string) => {
    const url = `${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes/${resumeId}`;
    try {
        console.log(typeof(resumeId))
        const request = await fetch(url, {
            headers: HEADERS,
            method: "DELETE",
        })

        if (!request.ok) {
            const errorData = await request.json();
            return { error: errorData.message || "Network response was not ok" };
        }

        // const response = await request.json();

        // console.log(response);

        return { success: "Resume Deleted Successfully" }

    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}