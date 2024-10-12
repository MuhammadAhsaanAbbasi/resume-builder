import React from 'react'


interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}

export const SkillsEdit = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>
        </div>
    )
}
