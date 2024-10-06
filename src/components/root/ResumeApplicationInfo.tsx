import Image from 'next/image'
import React from 'react'
import CreateResumeButton from '../shared/CreateResumeButton'
import { ApplicationInfoTabs } from '../shared/ApplicationInfoTabs'

const ResumeApplicationInfo = () => {
    return (
        <section className='h-full flex flex-col antialiased items-center justify-center gap-10 p-10 lg:p-20'>
            <section className="flex flex-col items-center justify-center gap-4">
                <div className="flex-shrink-0">
                    <Image
                        src={"https://myapplication-logos.s3.ap-south-1.amazonaws.com/beer-icon.png"}
                        alt={"beer logo"}
                        width={80}
                        height={80}
                        className='w-14 h-auto md:w-auto'
                    />
                </div>
                <div className="w-full md:w-[50vw] text-center">
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
                        Create perfect resumes for the modern job market
                    </h2>
                    <p className="text-lg font-medium my-4">
                        Creating a resume has never been this easy! In three simple steps, create the perfect document to impress hiring managers and employers. Minimum time, maximum professional quality.
                    </p>
                    <CreateResumeButton />
                </div>
            </section>
            <ApplicationInfoTabs />
        </section>
    )
}

export default ResumeApplicationInfo