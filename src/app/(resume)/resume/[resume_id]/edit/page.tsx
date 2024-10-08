import ResumeEditSection from '@/components/resume/ResumeEditSection';
import ResumePreviewSection from '@/components/resume/ResumePreviewSection';
import ResumeEditPreview from '@/components/resume/ResumePreviewSection';
import React from 'react'


interface Iprops {
    params: {
        resume_id: string;
    }
}

const ResumeEditPage = ({ params: { resume_id } }: Iprops) => {
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
            <ResumeEditSection resume_id={resume_id} />
            <ResumePreviewSection />
        </main>
    )
}

export default ResumeEditPage