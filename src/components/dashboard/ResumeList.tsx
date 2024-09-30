"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getResumeList } from '@/lib/actions/resume.actions';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import ResumeListItem from './ResumeListItem';

const ResumeList = () => {

    const [resumeList, setResumeList] = useState<ResumeParams[] | []>([]);

    const { user } = useUser();
    const UserId = user?.id as string;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getResumeList(UserId);
            if (data.success) {
                setResumeList(data.success);
            }
        }

        fetchData();
    }, [UserId])

    return resumeList.length > 0 ? resumeList.map((resume) => (
        <ResumeListItem key={resume.id} resume={resume} />
    ))
        :
        Array.from({ length: 3 }).map((_, index) => (
            <div className='h-[280px] p-10 px-20 rounded-lg bg-slate-200 animate-pulse' key={index}>
            </div>
        ))
}

export default ResumeList