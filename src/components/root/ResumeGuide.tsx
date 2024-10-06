import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import CreateResumeButton from '../shared/CreateResumeButton'

const ResumeGuide = () => {
    const features = [
        {
            id: 0,
            title: 'Make a resume that wins interviews',
            description: 'Use our resume maker with its advanced creation tools to tell a professional story that engages recruiters, hiring managers and even CEOs.',
            icon: 'https://myapplication-logos.s3.ap-south-1.amazonaws.com/feature+1.png'
        },
        {
            id: 1,
            title: 'Resume writing made easy',
            description: 'Resume writing has never been this effortless. Pre-generated text, visual designs and more - all already integrated into the resume maker. Just fill in your details.',
            icon: 'https://myapplication-logos.s3.ap-south-1.amazonaws.com/feature+2.png'
        },
        {
            id: 2,
            title: 'A recruiter-tested CV maker tool',
            description: 'Our resume builder and its pre-generated content are tested by recruiters and IT experts. We help your resume become truly competitive in the hiring process.',
            icon: 'https://myapplication-logos.s3.ap-south-1.amazonaws.com/feature+3.png'
        }
    ];
    return (
        <section className='h-full bg-secondary rounded-md flex flex-col antialiased items-center justify-center gap-6 p-10 lg:p-20'>
            <section className="flex flex-col md:flex-row items-center justify-between gap-20">
                <div className="flex-1">
                    <Image
                        src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/resume-visual.png"
                        alt="Illustration of resume creation"
                        width={600}
                        height={400}
                    />
                </div>
                <div className="flex-1 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1E2532] my-3">
                        Use the best resume maker as your guide
                    </h1>
                    <p className="text-lg text-[#1E2532] my-5">
                        Getting that dream job can seem like an impossible task. We're here to change that. Give yourself a real advantage with the best online resume maker: created by experts, improved by data, trusted by millions of professionals.
                    </p>
                    <CreateResumeButton />
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
                {features.map((feature) => (
                    <div key={feature.id} className="flex flex-col items-center text-center justify-center lg:items-start lg:justify-start lg:text-left gap-3">
                        <div className="flex-shrink-0">
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className='text-[#1E2532]'>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}

export default ResumeGuide