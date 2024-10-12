"use client"
import { useResumeContext } from '@/components/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Brain } from 'lucide-react';
import React, { useState } from 'react'


interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void; 
}

export const EditProfileSummary = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    const {resumeInfo, setResumeInfo} = useResumeContext();

    const [summery, setSummery] = useState("");

    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summery according to your job title</p>
            <div className='my-5'>
                <div className='flex justify-between items-center gap-2'>
                    <Label>Add Summary</Label>
                    <Button variant={"outline"} size={"sm"}
                    className="border-primary text-primary flex items-center gap-2"
                    >
                        <Brain className='h-5 w-5' />
                        <span>Generate from A.I</span>
                    </Button>
                </div>
                <Textarea
                className='my-4'
                defaultValue={resumeInfo.summery}
                onChange={(e) => setSummery(e.target.value)}
                />
            </div>
        </div>
    )
}
