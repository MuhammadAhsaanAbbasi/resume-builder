import React from 'react'

const SummaryPreview = ({ resume_info }: { resume_info: UserData }) => {
    return (
        <div className='my-4'>
            <h3 className='text-xl font-serif font-bold'>Summary</h3>
            <p className='text-justify text-sm'>{resume_info.summery}</p>
        </div>
    )
}

export default SummaryPreview