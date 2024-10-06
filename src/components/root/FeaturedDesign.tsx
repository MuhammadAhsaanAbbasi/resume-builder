import React from 'react';
import Image from 'next/image';
import { features } from '../../../constants/constant';

const FeaturedDesign = () => {
    return (
        <section className='h-full rounded-md flex flex-col antialiased bg-white items-center justify-center gap-6 py-10 md:py-20'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E2532] w-full md:w-[50vw] text-center'>
                Features designed to help you win your dream job
            </h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 px-20">
                {features.map((feature) => (
                    <div key={feature.id} className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start gap-4">
                        <div className="flex-shrink-0">
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={60}
                                height={60}
                                className='w-14 h-auto md:w-auto'
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1E2532]">{feature.title}</h3>
                            <p className="text-sm text-[#1E2532] leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}

export default FeaturedDesign