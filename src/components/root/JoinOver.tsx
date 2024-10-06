import React from 'react'
import CreateResumeButton from '../shared/CreateResumeButton'

const JoinOver = () => {
    return (
        <section className='h-full flex flex-col antialiased items-center justify-center text-center gap-4 p-10 md:p-20'>
            <h2 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold w-full md:w-[50vw] text-center text-primary leading-relaxed'>
                Join over <span className='underline-offset-8 relative'>
                    40,815,000
                    <span className='absolute left-0 bottom-[5px] w-full h-[5px] bg-orange-500'></span>
                </span> users worldwide
            </h2>
            <p className="text-lg font-medium">Start for free — try our resume builder now</p>
            <CreateResumeButton />
        </section>
    )
}

export default JoinOver