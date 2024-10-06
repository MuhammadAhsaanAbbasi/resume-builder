import React from 'react'
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { testimonials } from '../../../constants/constant';

const Reviews = () => {
    return (
        <section className="h-[35rem] rounded-md flex flex-col antialiased items-center justify-center gap-6 relative overflow-hidden border-b-2 border-secondary">
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold w-full md:w-[50vw] text-center'>
                Reviewed by the community. Trusted by professionals
            </h2>
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="normal"
            />
        </section>
    );
}

export default Reviews