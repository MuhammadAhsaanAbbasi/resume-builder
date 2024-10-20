"use client"
import React, { useEffect, useState } from 'react'
import ResumeEditSection from './ResumeEditSection'
import ResumePreviewSection from './ResumePreviewSection'
import { ResumeContextProvider } from '../context/ResumeContext'
import { data } from '../../../constants/data'
import { getResumeData } from '@/lib/actions/resume.actions'

const ResumeEditPreview = ({ resume_id }: { resume_id: string }) => {
    const [resumeInfo, setResumeInfo] = useState<UserData>(data);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getResumeData(resume_id);
            setResumeInfo(data?.success);
        }
        fetchData();
    }, [resume_id])
    return (
        <ResumeContextProvider value={{resumeInfo, setResumeInfo}} >
            <main className='grid grid-cols-1 md:grid-cols-2 py-10 px-5 gap-10'>
                <ResumeEditSection resume_id={resume_id} />
                <ResumePreviewSection />
            </main>
        </ResumeContextProvider>
    )
}

export default ResumeEditPreview