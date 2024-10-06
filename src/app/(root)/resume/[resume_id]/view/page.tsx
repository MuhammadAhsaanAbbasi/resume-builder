import React from 'react'


interface Iprops {
    params: {
        resume_id: string;
    }
}

const ResumeViewPage = ({ params: {resume_id} }: Iprops) => {
    return (
        <div>ResumeViewPage {resume_id} </div>
    )
}

export default ResumeViewPage