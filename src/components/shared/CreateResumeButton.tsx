"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const CreateResumeButton = () => {
    const router = useRouter();
    return (
        <Button size={"lg"}
        onClick={() => router.push('/dashboard')}
            className="text-lg px-5 py-6 rounded-md font-medium">
            Create my resume
        </Button>
    )
}

export default CreateResumeButton