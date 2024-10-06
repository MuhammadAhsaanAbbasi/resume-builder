import CreateResumeButton from '@/components/shared/CreateResumeButton';
import Image from 'next/image';
import React from 'react';

const ProfessionalGuidedSection = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 my-14 md:my-28 pt-28 md:pt-0">
            <div className="flex-1 flex items-center justify-center relative mb-32 md:mb-0">
                <div className="absolute w-[200px] md:w-[300px] h-[270px] md:h-[400px] transform rotate-[-25deg] right-[50%] md:right-0 md:left-[5%]">
                    <Image
                        src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/dublin-resume-templates.jpg"
                        alt="Resume 1"
                        width={300}
                        height={400}
                        className='rounded-md cursor-pointer'
                    />
                </div>
                <div className="absolute w-[200px] md:w-[300px] h-[270px] md:h-[400px] transform rotate-[15deg] z-10 left-[60%] md:left-[40%] rounded-md">
                    <Image
                        src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/amsterdam-resume-templates.jpg"
                        alt="Resume 3"
                        width={300}
                        height={400}
                        className='rounded-md cursor-pointer'
                    />
                </div>
                <div className="absolute w-[200px] md:w-[300px] h-[270px] md:h-[400px] transform rounded-md">
                    <Image
                        src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/stockholm-resume-templates.jpg"
                        alt="Resume 2"
                        width={300}
                        height={400}
                        className='rounded-md cursor-pointer'
                    />
                </div>
            </div>
            <div className="flex-1 my-10 md:my-0 text-center md:text-left ">
                <h2 className="text-3xl md:text-5xl font-bold my-3">
                    Try our professional Resume builder now!
                </h2>
                <p className="text-lg font-medium my-4">
                    Getting that dream job can seem like an impossible task. We're here to change that. Give yourself a real advantage with the best online resume maker: created by experts, improved by data, trusted by millions of professionals.
                </p>
                <CreateResumeButton />
            </div>
        </section>
    );
};

export default ProfessionalGuidedSection;