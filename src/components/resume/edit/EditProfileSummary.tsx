import React from 'react'


interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void; 
}

export const EditProfileSummary = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summery according to your job title</p>
        </div>
    )
}
