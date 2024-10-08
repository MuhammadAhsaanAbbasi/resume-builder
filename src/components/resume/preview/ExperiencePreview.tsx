import React from 'react'

const ExperiencePreview = ({ resume_info }: { resume_info: UserData }) => {
    const themeColor = resume_info.themeColor;
    return (
        <div className='my-2'>
            <h3 className='text-xl font-serif font-bold'>Experience</h3>
            {resume_info.experience.map((experience, index) => (
                <div key={index} className='my-1'>
                    <h4 className='text-lg font-semibold'>{experience.title}</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <h5 className='text-base font-medium'>
                            {experience.companyName}, {experience.city}, {experience.state}
                        </h5>
                        <p className={`text-base text-[${themeColor}]`}>
                            {experience.startDate} - {!experience.currentlyWorking ? experience.endDate
                                :
                                "Present"
                            }
                        </p>
                    </div>
                    <div className='text-xm my-2' dangerouslySetInnerHTML={{__html:experience.workSummery}} />
                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview