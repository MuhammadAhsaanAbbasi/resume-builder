"use client"
import React from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import { useResumeContext } from '../context/ResumeContext'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationPreview from './preview/EducationPreview'
import SkillsPreview from './preview/SkillsPreview'

const ResumePreviewSection = () => {
    const {resumeInfo} = useResumeContext();
    return (
        <section className={`h-full shadow-md border-[1px] border-black`}
        >
            {/* Personal Details */}
            <PersonalDetailPreview resume_info={resumeInfo} />
            <section className='px-14 py-6'>
                {/* Summary */}
                <SummaryPreview resume_info={resumeInfo} />

                {/* Experience */}
                <ExperiencePreview resume_info={resumeInfo} />

                {/* Education */}
                <EducationPreview resume_info={resumeInfo} />

                {/* Skills */}
                <SkillsPreview resume_info={resumeInfo} />
            </section>
        </section>
    )
}

export default ResumePreviewSection