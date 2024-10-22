"use client";
import React, { useTransition } from 'react';
import { Button } from '../ui/button';
import { Edit, NotebookPenIcon, ScanEye, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '../ui/alert-dialog';
import { deleteResume } from '@/lib/actions/resume.actions';
import { toast } from '@/hooks/use-toast';

interface ResumeProps {
    resume: ResumeParams;
    setUpdateFieldTrigger: (val: number) => void;
}

const ResumeListItem = ({ resume, setUpdateFieldTrigger }: ResumeProps) => {
    const [isLoading, startLoading] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        const resumeId = resume.documentId;
        startLoading(() => {
            deleteResume(resumeId)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            title: "Failed",
                            description: data?.error,
                            variant: "destructive",
                            duration: 2000,
                        });
                    }
                    if (data?.success) {
                        toast({
                            title: "Successfully Deleted",
                            description: data.message as string,
                            duration: 2000,
                        });
                        setUpdateFieldTrigger(Date.now());
                    }
                })
                .catch((err) => {
                    toast({
                        title: "Failed",
                        description: err.message,
                        variant: "destructive",
                        duration: 2000,
                    });
                });
        });
    };

    return (
        <div className='flex flex-col justify-between p-5 px-5 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer text-black bg-gradient-to-b from-pink-100/60 via-purple-300/80 to-blue-200'>
            <div className='flex justify-end m-1'>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Trash className='h-6 w-6 text-destructive hover:text-destructive/90 cursor-pointer hover:scale-105 transition-all' />
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-full bg-secondary'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the form
                                and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={isLoading} onClick={handleDelete}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className='flex flex-col justify-center gap-8'>
                <div className='flex items-center justify-center'>
                    <NotebookPenIcon className='h-10 w-10 text-primary' />
                </div>
                <h1 className='text-xl font-semibold'>{resume.title || "Untitled Resume"}</h1>
            </div>
            <div className='w-full p-0.5 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200' />
            <div className='flex justify-between items-center gap-2'>
                <ScanEye
                    onClick={() => router.push(`/resume/${resume.documentId}/view`)}
                    className='h-6 w-6 text-muted hover:text-muted/90 cursor-pointer hover:scale-105 transition-all'
                />
                <Button
                    className='flex justify-center items-center gap-2'
                    onClick={() => router.push(`/resume/${resume.documentId}/edit`)}
                >
                    <Edit />
                    <span>Edit</span>
                </Button>
            </div>
        </div>
    );
};

export default ResumeListItem;
