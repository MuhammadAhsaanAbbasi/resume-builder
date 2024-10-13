"use client"
import { useResumeContext } from '@/components/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { UpdateSummery } from '@/lib/actions/resume.actions';
import { AISession } from '@/lib/gemini';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { FormEvent, useEffect, useState, useTransition } from 'react'


interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}

export const EditProfileSummary = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    const { resumeInfo, setResumeInfo } = useResumeContext();

    const [summary, setSummary] = useState("");
    const [summeryLists, setSummeryLists] = useState<SummerParams[] | []>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary])


    const generateSummary = async () => {
        const prompt = `Job Title: ${resumeInfo.jobTitle} , Depends on job title give me list of  summery for 3 Experience levels: Fresher, Mid-Level, Experienced in 3 -4 lines in array format, With summery and experience_level Field in JSON Format`
        const request = await AISession.sendMessage(prompt);
        const response: SummerParams[] = JSON.parse(request.response.text())

        console.log(response)

        setSummeryLists(response)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            UpdateSummery(resume_id, summary)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            title: "Failed",
                            variant: "destructive",
                            duration: 2000,
                        });
                    }
                    if (data?.success) {
                        toast({
                            title: "Updated!",
                            description: (data.message) as string,
                            duration: 2000,
                            action: (
                                <ToastAction altText="Resume Update!!">Updated</ToastAction>
                            ),
                        });
                    }
                })
                .finally(() => {
                    setEnableNext(false);
                });
        })
    }


    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summery according to your job title</p>
            <form className='my-5' onSubmit={(e) => onSubmit(e)}>
                <div className='flex justify-between items-center gap-2'>
                    <Label>Add Summary</Label>
                    <Button variant={"outline"}
                        type="button"
                        size={"sm"}
                        className="border-primary text-primary flex items-center gap-2"
                        disabled={isPending}
                        onClick={generateSummary}
                    >
                        <Brain className='h-5 w-5' />
                        <span>Generate from A.I</span>
                    </Button>
                </div>
                <Textarea
                    className='my-4'
                    value={summary}
                    defaultValue={resumeInfo.summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <Button
                    type="submit"
                    className='rounded-md my-3 disabled:cursor-progress'
                    disabled={isPending}
                >
                    {isPending ?
                        <LoaderCircle className='animate-spin' /> :
                        'Save Change'}
                </Button>
            </form>
            {
                summeryLists.length > 0 && (
                    <div className='my-4'>
                        <h2 className='font-bold text-lg'>Suggestions</h2>
                        {
                            summeryLists.map((item, index) => (
                                <div key={index}
                                onClick={() => setSummary(item.summary)}
                                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'
                                >
                                    <h3 className='my-1 font-bold text-primary'>{item.experience_level}</h3>
                                    <p>{item.summary}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
