import React from 'react'


interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void; 
}

export const ExperienceEdit = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>
        </div>
    )
}
