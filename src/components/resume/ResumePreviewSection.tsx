"use client"
import React from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import { useResumeContext } from '../context/ResumeContext'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationPreview from './preview/EducationPreview'
import SkillsPreview from './preview/SkillsPreview'

const ResumePreviewSection = () => {
    const { resumeInfo } = useResumeContext();
    return (
        <section className={`h-full shadow-md border-[1px] border-black print:block`}
        >
            {/* Personal Details */}
            <PersonalDetailPreview resume_info={resumeInfo} />
            <section className='px-14 py-6'>
                {/* Summary */}
                {
                    resumeInfo.summary && <SummaryPreview resume_info={resumeInfo} />
                }

                {/* Experience */}
                {
                    resumeInfo.experience.length > 0 &&
                    <ExperiencePreview resume_info={resumeInfo} />
                }

                {/* Education */}
                {
                    resumeInfo.education.length > 0 &&
                    <EducationPreview resume_info={resumeInfo} />
                }

                {/* Skills */}
                {
                    resumeInfo.skills.length > 0 &&
                    <SkillsPreview resume_info={resumeInfo} />
                }
            </section>
        </section>
    )
}

export default ResumePreviewSection