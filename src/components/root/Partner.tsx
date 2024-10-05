import React from 'react';
import { partners } from '../../../constants/constant';
import Image from 'next/image';

const Partner = () => {
    return (
        <section className='bg-white flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-[70px] p-3 border border-secondary'>
            {partners.map((partner) => (
                <div key={partner.id} className="opacity-40">
                    <Image
                        src={partner.src}
                        alt={partner.alt}
                        width={90}
                        height={60}
                        className="grayscale brightness-0 contrast-150 cursor-pointer w-20 h-full md:w-auto"
                    />
                </div>
            ))}
        </section>
    );
};

export default Partner;