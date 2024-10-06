import Image from 'next/image'
import React from 'react'

const GuidedFeatureSection = () => {
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
            {features.map((feature) => (
                <div key={feature.id} className="flex flex-col items-center text-center justify-center lg:items-start lg:justify-start lg:text-left gap-3">
                    <div className="flex-shrink-0">
                        <Image
                            src={feature.icon}
                            alt={feature.title}
                            width={80}
                            height={80}
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-base leading-relaxed font-medium">{feature.description}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default GuidedFeatureSection