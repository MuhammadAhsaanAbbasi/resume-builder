import Resumes from '@/components/dashboard/Resumes'
import React from 'react'

export default function DashboardPage() {
    return (
        <div className='p-10 px-8 sm:px-12 md:px-20 lg:px-24'>
            <h2 className='font-bold text-3xl'>My Resume</h2>
            <p className='font-normal text-[#74736A] text-lg'>Start Creating AI resume to your next Job role</p>
            <Resumes />
        </div>
    )
}
