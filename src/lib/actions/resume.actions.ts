"use server"
import { resumeSchema } from "@/schema/resume"
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