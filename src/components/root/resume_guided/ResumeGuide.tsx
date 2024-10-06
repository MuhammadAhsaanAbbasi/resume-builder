import Image from 'next/image'
import React from 'react'
import { Button } from '../../ui/button'
import CreateResumeButton from '../../shared/CreateResumeButton'
import GuidedHeroSection from './GuidedHeroSection'
import GuidedFeatureSection from './GuidedFeatureSection'
import ProfessionalGuidedSection from './ProfessionalGuidedSection'

const ResumeGuide = () => {
    return (
        <section className='h-full bg-secondary rounded-md flex flex-col antialiased items-center justify-center gap-10 p-10 lg:p-20'>
            <GuidedHeroSection />
            <GuidedFeatureSection />
            <ProfessionalGuidedSection />
        </section>
    )
}

export default ResumeGuide