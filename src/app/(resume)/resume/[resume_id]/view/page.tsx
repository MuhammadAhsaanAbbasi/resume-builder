"use client"
import { ResumeContextProvider } from '@/components/context/ResumeContext';
import ResumePreviewSection from '@/components/resume/ResumePreviewSection';
import { Button } from '@/components/ui/button';
import { getResumeData } from '@/lib/actions/resume.actions';
import React, { useEffect, useState } from 'react'
import { data } from '../../../../../../constants/data';

interface Iprops {
    params: {
        resume_id: string;
    }
}

const ResumeViewPage = ({ params: { resume_id } }: Iprops) => {
    const [resumeInfo, setResumeInfo] = useState<UserData>(data);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getResumeData(resume_id);
            setResumeInfo(data?.success);
        }
        fetchData();
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
                    <Button className=''>
                        Share
                    </Button>
                </div>
            </div>
            <ResumeContextProvider value={{ resumeInfo, setResumeInfo }} >
                <div className='my-10 mx-10 md:mx-20 lg:mx-36 print:mx-0 print:my-0'>
                    <ResumePreviewSection />
                </div>
            </ResumeContextProvider>
        </main>
    )
}

export default ResumeViewPage