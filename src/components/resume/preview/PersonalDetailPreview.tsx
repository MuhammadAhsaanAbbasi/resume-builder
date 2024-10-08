import { LocateIcon, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const PersonalDetailPreview = ({ resume_info }: { resume_info: UserData }) => {
    const themeColor = resume_info.themeColor
    return (
        <div
            style={{
                backgroundColor: themeColor,
            }}
        >
            <div className='flex flex-col justify-center items-center gap-1 px-14 py-8'>
                <h2 className={`text-3xl font-bold font-serif`}>
                    {resume_info.firstName} {resume_info.lastName}
                </h2>
                <h2 className='text-lg font-medium'>{resume_info.jobTitle.toUpperCase()}</h2>
            </div>
            <hr className='w-full h-[1.5px] bg-secondary' />
            <div className='flex justify-center items-center gap-4 px-14 py-3'>
                <h2 className={`font-normal flex items-center gap-2`}>
                    <Mail size={16} /> 
                    <span className='text-xs'>
                        {resume_info.email}
                    </span>
                </h2>
                <h2 className={`text-xm font-normal flex items-center gap-2`}>
                    <MapPin size={16} />
                    <span className='text-xs'>
                        {resume_info.city}, {resume_info.country}
                    </span>
                </h2>
                <h2 className={`text-xm font-normal flex items-center gap-2`}>
                    <Phone size={16} />
                    <span className='text-xs'>
                        {resume_info.phone}
                    </span>
                </h2>
            </div>
        </div>
    )
}

export default PersonalDetailPreview