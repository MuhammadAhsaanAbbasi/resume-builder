import React from 'react'


interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}

export const EducationEdit = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your educational details</p>
        </div>
    )
}
