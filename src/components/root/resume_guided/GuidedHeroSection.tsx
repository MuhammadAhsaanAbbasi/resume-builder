import CreateResumeButton from '@/components/shared/CreateResumeButton'
import Image from 'next/image'
import React from 'react'

const GuidedHeroSection = () => {
    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-20">
            <div className="flex-1">
                <Image
                    src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/resume-visual.png"
                    alt="Illustration of resume creation"
                    width={600}
                    height={400}
                />
            </div>
            <div className="flex-1 my-5 md:my-0">
                <h2 className="text-4xl md:text-5xl font-bold my-3">
                    Use the best resume maker as your guide
                </h2>
                <p className="text-lg font-medium my-4">
                    Getting that dream job can seem like an impossible task. We're here to change that. Give yourself a real advantage with the best online resume maker: created by experts, improved by data, trusted by millions of professionals.
                </p>
                <CreateResumeButton />
            </div>
        </section>
    )
}

export default GuidedHeroSection