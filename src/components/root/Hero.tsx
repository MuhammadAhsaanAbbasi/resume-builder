import React from 'react'
import { Button } from '../ui/button'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import CreateResumeButton from '../shared/CreateResumeButton'

const Hero = () => {
    return (
        <section className='flex flex-col items-center justify-center gap-4 bg-secondary text-[#1E2532]'>
            <div className='flex flex-col items-center justify-center gap-5 mt-12 w-full sm:w-[60vw]'>
                <div className='flex flex-col items-center justify-center gap-1 w-full sm:w-[50vw]'>
                    <h1 className='text-lg font-semibold text-[rgb(26,28,106)] text-center'>Online resume builder</h1>
                    <h2 className="text-4xl font-bold text-center">
                        Only 2% of resumes make it past the first round. Be in the top 2%
                    </h2>
                    <p className='text-xl text-center font-normal w-[75vw] sm:w-[60vw] md:w-[45vw]'>
                        Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!
                    </p>
                </div>
                <CreateResumeButton />
            </div>
            <div className='flex flex-col items-center justify-center gap-1 w-full sm:w-[60vw]'>
                <h4 className='flex items-center justify-center'>
                    <Dot size={50} className='text-green-600 animate-pulse duration-1000' />
                    <span className='text-sm -mx-2'>25,250 resumes created today</span>
                </h4>
                <Link href={""}>
                    <Image
                        src={"https://myapplication-logos.s3.ap-south-1.amazonaws.com/dublin-resume-templates.avif"}
                        alt='dublin-resume-templates'
                        width={1000}
                        height={1000}
                        className="rounded-t-md cursor-pointer animate-accordion-up w-96 sm:w-80 h-auto md:w-auto"
                    />
                </Link>
            </div>
        </section>
    )
}

export default Hero