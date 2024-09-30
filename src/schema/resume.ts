import * as z from "zod"

export const resumeSchema = z.object({
    title:z.string().min(3, {message: "Title is required"}),
})