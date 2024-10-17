import React from 'react'

const EducationPreview = ({ resume_info }: { resume_info: UserData }) => {
    const themeColor = resume_info.themeColor;
    return (
        <div className='my-4'>
            <h3 className='text-xl font-serif font-bold'>Education</h3>
            {resume_info.education.map((education) => (
                <div key={education.id} className='my-1'>
                    <h4 className='text-lg font-semibold'>{education.universityName}</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <h5 className='text-base font-medium'>
                            {education.degree} In {education.major}
                        </h5>
                        <p className={`text-base`}
                        style={{
                            color: themeColor,
                        }}
                        >
                            {education.startDate} - {education.endDate}
                        </p>
                    </div>
                    <div className='text-xm my-2' dangerouslySetInnerHTML={{ __html: education.description }} />
                </div>
            ))}
        </div>
    )
}

export default EducationPreview