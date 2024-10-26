"use client";
import { getResumeList } from '@/lib/actions/resume.actions';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, useTransition } from 'react';
import ResumeListItem from './ResumeListItem';
import { toast } from '@/hooks/use-toast';
import AddResume from './AddResume';

const Resumes = () => {
    const [resumeList, setResumeList] = useState<ResumeParams[]>([]); // Initialize as an empty array
    const [updateFieldTrigger, setUpdateFieldTrigger] = useState<number>();
    const [isPending, startTransition] = useTransition();

    const { user } = useUser();
    const UserId = user?.id as string;

    useEffect(() => {
            startTransition(() => {
                getResumeList(UserId)
                    .then((res) => {
                        if (res.error) {
                            toast({
                                title: "Failed!!",
                                description: res.error,
                                variant: 'destructive'
                            });
                        } else if (res.success) {
                            // Ensure data is plain JSON
                            const plainResumes = JSON.parse(JSON.stringify(res.success));
                            setResumeList(plainResumes);
                        }
                    })
                    .catch((error) => {
                        toast({
                            title: error.message,
                            variant: 'destructive'
                        });
                    });
            });
    },[UserId, updateFieldTrigger]);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 gap-x-5 my-3'>
            <AddResume />
            {isPending || resumeList.length > 0 ? (
                resumeList.map((resume) => (
                    <ResumeListItem
                        key={resume.id}
                        resume={resume}
                        setUpdateFieldTrigger={(v) => setUpdateFieldTrigger(v)}
                    />
                ))
            ) : (
                Array.from({ length: 3 }).map((_, index) => (
                    <div className='h-[280px] p-10 px-20 rounded-lg bg-slate-200 animate-pulse' key={index}></div>
                ))
            )}
        </div>
    );
};

export default Resumes;
