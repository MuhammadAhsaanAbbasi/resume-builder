import React from 'react'


interface Iprops {
    params: {
        resume_id: string;
    }
}

const ResumeEditPage = ({ params: {resume_id} }: Iprops) => {
    return (
        <div>ResumeEditPage {resume_id} </div>
    )
}

export default ResumeEditPage