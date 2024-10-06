import ResumeEditPreview from '@/components/resume/ResumeEditPreview';
import React from 'react'


interface Iprops {
    params: {
        resume_id: string;
    }
}

const ResumeEditPage = ({ params: {resume_id} }: Iprops) => {
    return (
        <ResumeEditPreview resume_id={resume_id} />
    )
}

export default ResumeEditPage