"use client"
import React, { useEffect, useState, useTransition } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { ExperienceFormSchema } from '@/schema/resume';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod'
import { Input } from '@/components/ui/input';
import { useResumeContext } from '@/components/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus, Trash } from 'lucide-react';

interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}

export const ExperienceEdit = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    const { resumeInfo, setResumeInfo } = useResumeContext();
    const [isPending, startTransition] = useTransition();
    const [isLoading, startLoading] = useTransition();

    // Utility to format date strings to yyyy-MM-dd
    const formatDateString = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ''; // Handle invalid date
        return date.toISOString().split('T')[0];
    };

    // Initialize state from context or default value
    const [experienceList, setExperienceList] = useState(
        resumeInfo.experience.map((exp, index) => {
            return {
                ...exp,
                startDate: formatDateString(exp.startDate),
                endDate: formatDateString(exp.endDate),
            };
        }) || []
    );

    // Initialize form with context data
    const form = useForm<z.infer<typeof ExperienceFormSchema>>({
        resolver: zodResolver(ExperienceFormSchema),
        defaultValues: { experience: resumeInfo.experience || [] },
    });

    // UseFieldArray to handle dynamic experience fields
    const { fields: experienceFields, append: appendExperience, remove: removeFormExperience } = useFieldArray({
        name: 'experience',
        control: form.control,
    });

    // Update resumeInfo context when experienceList changes
    useEffect(() => {
        startLoading(() => {
            setResumeInfo({
                ...resumeInfo,
                experience: experienceList,
            });
        });
    }, [experienceList, setResumeInfo]);

    // Update context when form values change
    const updateResumeInfo = (name: string, value: any, index: number) => {
        setExperienceList((prev) => {
            const updatedList = [...prev];
            updatedList[index] = {
                ...updatedList[index],
                [name]: value,
            };
            return updatedList;
        });
    };

    const removeExperience = (index:number) => {
        const updateExperienceList = experienceList.filter((_, i) => i !== index);
        removeFormExperience(index);
        setExperienceList(updateExperienceList);
    }

    const onSubmit = (values: z.infer<typeof ExperienceFormSchema>) => {
        setEnableNext(false);
        console.log(`Values: ${values.experience}`)
    };

    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        {experienceFields.map((field, index) => (
                            <div key={field.id} className='grid grid-cols-2 gap-3 border p-3 my-3 rounded-lg relative'>
                                <FormField
                                    control={form.control}
                                    name={`experience.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={`experience-${index}-title`}>Job Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={`experience-${index}-title`}
                                                    {...field}
                                                    type="text"
                                                    placeholder='Full-Stack Developer'
                                                    className='p-2 border border-gray-300 rounded-md'
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        updateResumeInfo('title', e.target.value, index);
                                                    }}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experience.${index}.companyName`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={`experience-${index}-companyName`}>Company Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={`experience-${index}-companyName`}
                                                    {...field}
                                                    type="text"
                                                    placeholder='AbbasiKoders'
                                                    className='p-2 border border-gray-300 rounded-md'
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        updateResumeInfo('companyName', e.target.value, index);
                                                    }}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experience.${index}.city`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={`experience-${index}-city`}>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={`experience-${index}-city`}
                                                    {...field}
                                                    type="text"
                                                    placeholder='Karachi'
                                                    className='p-2 border border-gray-300 rounded-md'
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        updateResumeInfo('city', e.target.value, index);
                                                    }}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experience.${index}.state`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={`experience-${index}-state`}>State</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={`experience-${index}-state`}
                                                    {...field}
                                                    type="text"
                                                    placeholder='PK'
                                                    className='p-2 border border-gray-300 rounded-md'
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        updateResumeInfo('state', e.target.value, index);
                                                    }}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experience.${index}.startDate`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={`experience-${index}-startDate`}>Start Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={`experience-${index}-startDate`}
                                                    {...field}
                                                    type="date"
                                                    className='p-2 border border-gray-300 rounded-md'
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        updateResumeInfo('startDate', e.target.value, index);
                                                    }}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experience.${index}.endDate`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={`experience-${index}-endDate`}>End Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={`experience-${index}-endDate`}
                                                    {...field}
                                                    type="date"
                                                    className='p-2 border border-gray-300 rounded-md'
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        updateResumeInfo('endDate', e.target.value, index);
                                                    }}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='my-3 flex justify-end col-span-2'>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    onClick={() => removeExperience(index)}
                                    disabled={isPending || isLoading}
                                >
                                    <Trash className="text-destructive hover:text-destructive/90" />
                                </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='my-3 flex justify-between items-center'>
                        <Button
                            type="button"
                            onClick={() =>
                                appendExperience({
                                    title: '',
                                    companyName: '',
                                    city: '',
                                    state: '',
                                    startDate: '',
                                    endDate: '',
                                    currentlyWorking: false,
                                    workSummary: '',
                                })
                            }
                            className='rounded-md disabled:cursor-progress flex items-center gap-2'
                            disabled={isPending || isLoading}
                        >
                            <Plus />
                            <span>Add New Experience</span>
                        </Button>
                        <Button
                            type="submit"
                            className='rounded-md disabled:cursor-progress'
                            disabled={isPending}
                        >
                            {isPending ? (
                                <LoaderCircle className='animate-spin' />
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
