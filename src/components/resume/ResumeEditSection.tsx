import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import ThemeButton from './ThemeButton'
import { activeSection } from '../../../constants/data'
import { useResumeContext } from '../context/ResumeContext'
import { useRouter } from 'next/navigation'

const ResumeEditSection = ({ resume_id }: { resume_id: string }) => {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    // const { resumeInfo, setResumeInfo } = useResumeContext();

    const router = useRouter();

    const handleNext = () => {
        if (activeSectionIndex < activeSection.length - 1) {
            setActiveSectionIndex((prevIndex) => prevIndex + 1)
        }
        else {
            router.push(`/resume/${resume_id}/view`)
        }
    }

    const handlePrevious = () => {
        if (activeSectionIndex > 0) {
            setActiveSectionIndex((prevIndex) => prevIndex - 1)
        }
    }
    return (
        <section className=''>
            <div className='flex justify-between items-center gap-5'>
                <div className='flex items-center gap-2'>
                    <Button className='flex items-center gap-2'>
                        <span>
                            Home
                        </span>
                        <Home />
                    </Button>
                    <ThemeButton />
                </div>
                <div className='flex items-center gap-2'>
                    {
                        activeSectionIndex > 0 && <Button
                            size={"sm"}
                            className='flex items-center gap-2'
                            onClick={handlePrevious}
                        >
                            <ArrowLeft />
                            <span>Previous</span>
                        </Button>
                    }

                    <Button
                        size={"sm"}
                        className='flex items-center gap-2'
                        onClick={handleNext}
                    >
                        <span>Next</span>
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            <div className='my-5 shadow-lg rounded-lg border-y-primary border-y-4'>
                {activeSection.map((sections) => {
                    if (activeSectionIndex === sections.id) {
                        const SectionComponent = sections.section
                        return <SectionComponent key={sections.id} resume_id={resume_id} />
                    }
                    return null
                })}
            </div>
        </section>
    )
}

export default ResumeEditSection