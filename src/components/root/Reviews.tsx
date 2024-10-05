import React from 'react'
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { testimonials } from '../../../constants/constant';

const Reviews = () => {
    return (
        <div className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center gap-6 relative overflow-hidden">
            <h2 className='text-5xl font-bold text-[#1E2532] w-[50vw] text-center'>
                Reviewed by the community. Trusted by professionals
            </h2>
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="normal"
            />
        </div>
    );
}

export default Reviews