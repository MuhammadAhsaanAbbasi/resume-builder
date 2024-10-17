"use server"
import { ExperienceFormSchema, resumePersonalDetailsSchema, resumeSchema } from "@/schema/resume"
import * as z from "zod"
import { v4 as uuidv4 } from 'uuid';


const TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_KEY!

export const generateResume = async (userId:string, userName:string,
    values: z.infer<typeof resumeSchema>) => {
    const ValidatedTypes = resumeSchema.safeParse(values)

    if(!ValidatedTypes.success){
        return {error: "Invalid Types"}
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            method: "POST",
            body: JSON.stringify(data)
        })

        if(request.status !== 201){
            const error = await request.json();
            return { error: error.detail };
        }

        const response = await request.json();
        
        console.log(response.data.documentId);

        return { success: response.data.documentId,  "messege": "Resume created"}

    } catch (error) {
        if(error instanceof Error){
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const getResumeList = async (UserId:string) => {
    try {
        const request = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes?filters[userId][$eq]=${UserId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            method: "GET",
        })

        if(request.status !== 200){
            const error = await request.json();
            return { error: error.detail };
        }

        const response = await request.json();
        
        console.log(response);

        return { success: response.data,  "messege": "Resume Details"}

    } catch (error) {
        if(error instanceof Error){
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const UpdatePersonalDetails = async (resumeId:string, values: z.infer<typeof resumePersonalDetailsSchema>) => {
    const ValidatedTypes = resumePersonalDetailsSchema.safeParse(values)

    if(!ValidatedTypes.success){
        return {error: "Invalid Types"}
    }

    const { firstName, lastName, jobTitle, address, phone, email } = ValidatedTypes.data;
    try {
        const data={
            data:{
                firstName: firstName,
                lastName: lastName,
                jobTitle: jobTitle,
                address: address,
                phone: phone,
                email: email
            }
        }
        
        const updateRequest = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes/${resumeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            method: "PUT",
            body: JSON.stringify(data)
        })

        const updateResponse = await updateRequest.json();

        // console.log(updateResponse)

        return { success: updateResponse.data,  "message": "Successfully Resume Updated!!"}

    } catch (error) {
        if(error instanceof Error){
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const UpdateSummery = async (resumeId:string, summary:string) => {
    try {
        const data={
            data:{
                summary: summary
            }
        }
        
        const updateRequest = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes/${resumeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            method: "PUT",
            body: JSON.stringify(data)
        })

        const updateResponse = await updateRequest.json();

        // console.log(updateResponse)

        return { success: updateResponse.data,  "message": "Successfully Resume Updated!!"}

    } catch (error) {
        if(error instanceof Error){
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const UpdateExperience = async (resumeId:string, 
    values: z.infer<typeof ExperienceFormSchema>) => {
    const ValidatedTypes = ExperienceFormSchema.safeParse(values)

    if(!ValidatedTypes.success){
        return {error: "Invalid Types"}
    }

    const { experience } = ValidatedTypes.data;
    try {
        console.log(experience)
        const data={
            data:{
                experience: experience
            }
        }
        
        const updateRequest = await fetch(`${process.env.NEXT_STRAPI_API_BASE_URL}/api/user-resumes/${resumeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            method: "PUT",
            body: JSON.stringify(data)
        })

        const updateResponse = await updateRequest.json();

        console.log(`UpdatedResume: ${updateResponse}`) 

        return { success: updateResponse.data, "message": "Successfully Resume Updated!!"}

    } catch (error) {
        if(error instanceof Error){
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}