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
import { UpdateExperience } from '@/lib/actions/resume.actions';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import RichTextEditor from '@/components/shared/RichTextEditor';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

    const removeExperience = (index: number) => {
        const updateExperienceList = experienceList.filter((_, i) => i !== index);
        removeFormExperience(index);
        setExperienceList(updateExperienceList);
    };

    const onSubmit = async (values: z.infer<typeof ExperienceFormSchema>) => {
        startTransition(() => {
            UpdateExperience(resume_id, values)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            title: "Failed",
                            variant: "destructive",
                            duration: 2000,
                        });
                    }
                    if (data.success) {
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
        });
    };

    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto my-12">
                        {experienceFields.map((field, index) => {
                            const isCurrentlyWorking = form.watch(`experience.${index}.currentlyWorking`);
                            return (
                                <AccordionItem key={field.id} value={`item-${index}`}>
                                    <AccordionTrigger className="p-4 text-xl font-semibold flex justify-between items-center w-full hover:bg-gray-100 transition duration-500">
                                        {field.title}
                                    </AccordionTrigger>
                                    <AccordionContent className='grid grid-cols-2 gap-3 border p-5 my-5 rounded-lg relative'>
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
                                            name={`experience.${index}.currentlyWorking`}
                                            render={({ field }) => (
                                                <FormItem className='my-2 col-span-2 flex items-center gap-2'>
                                                    <FormControl>
                                                        <div className='relative'>
                                                            <Checkbox
                                                                checked={field.value || false}
                                                                onCheckedChange={(e) => {
                                                                    field.onChange(e)
                                                                    updateResumeInfo('currentlyWorking', e, index);
                                                                }}
                                                                className={`transition-all duration-500 ${!field.value && 'bg-transparent border-gray-300'} border rounded-md`}
                                                                disabled={isPending}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormLabel className='mx-2'>I am currently working in this role</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`experience.${index}.startDate`}
                                            render={({ field }) => (
                                                <FormItem className='col-span-2'>
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
                                                <FormItem className='col-span-2'>
                                                    <FormLabel htmlFor={`experience-${index}-endDate`}>End Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id={`experience-${index}-endDate`}
                                                            {...field}
                                                            type="date"
                                                            className={`p-2 border border-gray-300 rounded-md ${isCurrentlyWorking ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                                updateResumeInfo('endDate', e.target.value, index);
                                                            }}
                                                            disabled={isPending || isCurrentlyWorking}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`experience.${index}.workSummary`}
                                            render={({ field }) => (
                                                <RichTextEditor
                                                    {...field}
                                                    index={index}
                                                    defaultValue={field.value || ""}
                                                    onChange={(e) => updateResumeInfo('workSummary', e, index)}
                                                    isPending={isPending}
                                                />
                                            )}
                                        />
                                        <div className='flex justify-end col-span-2'>
                                            <Button
                                                type="button"
                                                variant={"outline"}
                                                onClick={() => removeExperience(index)}
                                                disabled={isPending || isLoading}
                                            >
                                                <Trash className="text-destructive hover:text-destructive/90" />
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
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
};
