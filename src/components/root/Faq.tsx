import React from 'react'
import { FrequentQuestionAnswer } from '../shared/FrequentQuestionAnswer'

const FrequentAnswerQuestion = () => {
    return (
        <section className='h-full flex flex-col antialiased bg-secondary items-center justify-center border-b-2 border-secondary gap-6 p-10 md:p-20'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold w-full md:w-[40vw] text-center'>
                Frequently Asked Questions
            </h2>
            <FrequentQuestionAnswer />
        </section>
    )
}

export default FrequentAnswerQuestion