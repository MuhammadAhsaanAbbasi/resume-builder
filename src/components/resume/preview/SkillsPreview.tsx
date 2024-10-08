import React from 'react'

const SkillsPreview = ({ resume_info }: { resume_info: UserData }) => {
    return (
        <div className='my-4'>
            <h3 className='text-xl font-serif font-bold'>Skills</h3>
            <div className='grid grid-cols-2 gap-4 my-2'>
                {
                    resume_info.skills.map((skill, index) => (
                        <div key={skill.id} className='flex items-center justify-between'>
                            <h2>{skill.name}</h2>
                            <div className='h-2 bg-gray-200 w-[120px]'>
                                <div className='h-2'
                                    style={{
                                        backgroundColor: resume_info.themeColor,
                                        width: `${skill.rating}%`
                                    }}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SkillsPreview