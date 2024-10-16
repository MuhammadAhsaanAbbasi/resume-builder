"use client"
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { ExperienceFormSchema } from '@/schema/resume';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod'
import { Input } from '@/components/ui/input';
import { useResumeContext } from '@/components/context/ResumeContext';

interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}

export const ExperienceEdit = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    const { resumeInfo, setResumeInfo } = useResumeContext();

    const [experienceList, setExperienceList] = useState<z.infer<typeof ExperienceFormSchema>>({
        experience: [
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                workSummary: ''
            }
        ]
    });
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ExperienceFormSchema>>({
        resolver: zodResolver(ExperienceFormSchema),
        defaultValues: {
            experience: [
                {
                    title: '',
                    companyName: '',
                    city: '',
                    state: '',
                    startDate: '',
                    endDate: '',
                    currentlyWorking: false,
                    workSummary: ''
                }
            ],
        },
    });

    // UseFieldArray to handle dynamic experience fields
    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
        name: 'experience',
        control: form.control,
    });

    const updateResumeInfo = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;

        startTransition(() => {
            setResumeInfo({
                ...resumeInfo,
                [name]: value
            })
        })
    }

    const onSubmit = async (values: z.infer<typeof ExperienceFormSchema>) => {
        setEnableNext(false);
    }

    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>
            <Form
                {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        {
                            experienceFields.map((field, index) => (
                                <div key={index} className=''>
                                    <FormField
                                        control={form.control}
                                        name={`experience.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor='first_name'>First Name</FormLabel>
                                                <FormControl>
                                                    <Input id='first_name'
                                                        {...field}
                                                        type="text"
                                                        placeholder='First Name'
                                                        className='p-2 border border-gray-300 rounded-md'
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            updateResumeInfo(e, index);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                    </div>
                </form>

            </Form>
        </div>
    )
}
