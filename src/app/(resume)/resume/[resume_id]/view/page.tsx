"use client"
import { ResumeContextProvider } from '@/components/context/ResumeContext';
import ResumePreviewSection from '@/components/resume/ResumePreviewSection';
import { Button } from '@/components/ui/button';
import { getResumeData } from '@/lib/actions/resume.actions';
import React, { startTransition, useEffect, useState, useTransition } from 'react'
import { data } from '../../../../../../constants/data';
import { RWebShare } from "react-web-share";
import { LoaderCircle } from 'lucide-react';

interface Iprops {
    params: {
        resume_id: string;
    }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ResumeViewPage = ({ params: { resume_id } }: Iprops) => {
    const [resumeInfo, setResumeInfo] = useState<UserData>(data);

    const [isPending, startTransition]  = useTransition();

    useEffect(() => {
        startTransition(() => {
            getResumeData(resume_id).then((data) => {
                setResumeInfo(data.success);
            })
        })
    }, [resume_id])
    return (
        <main className="flex flex-col items-center justify-center print:block">
            <div className='print:hidden'>
                <h1
                    className="my-5 text-center text-lg font-bold text-main print:hidden md:text-3xl"
                >
                    Congrats! Your Ultimate AI generates Resume is Ready!
                </h1>
                <p className='text-center text-gray-400'>
                    Now you are ready to download your resume and you can share unique
                    resume url with your friends and family </p>
                <div className='flex justify-between items-center my-3'>
                    <Button onClick={() => window.print()}>
                        Download
                    </Button>
                    <RWebShare
                        data={{
                            text: "Like humans, flamingos make friends for life",
                            url: `${BASE_URL}/resume/${resumeInfo.documentId}/view`,
                            title: `${resumeInfo.firstName} ${resumeInfo.lastName} Resume`,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button>
                            Share 🔗
                        </Button>
                    </RWebShare>

                </div>
            </div>
            <ResumeContextProvider value={{ resumeInfo, setResumeInfo }} >
                <div className='my-10 mx-10 md:mx-20 lg:mx-36 print:mx-0 print:my-0'>
                    {
                        isPending ? <LoaderCircle className='animate-spin text-primary' size={100} />
                        :
                        <ResumePreviewSection resume_preview={true} />
                    }
                    
                </div>
            </ResumeContextProvider>
        </main>
    )
}

export default ResumeViewPage