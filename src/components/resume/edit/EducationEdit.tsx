import { useResumeContext } from '@/components/context/ResumeContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { LoaderCircle, Plus, Trash } from 'lucide-react';
import React, { useEffect, useState, useTransition } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { EducationFormSchema } from '@/schema/resume';
import { z } from 'zod'
import { ToastAction } from '@/components/ui/toast';
import { UpdateEducation } from '@/lib/actions/resume.actions';
import { Textarea } from '@/components/ui/textarea';


interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}

export const EducationEdit = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
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
    const [educationList, setEducationList] = useState(
        resumeInfo.education.map((exp, index) => {
            return {
                ...exp,
                startDate: formatDateString(exp.startDate),
                endDate: formatDateString(exp.endDate),
            };
        }) || []
    );

    // Initialize form with context data
    const form = useForm<z.infer<typeof EducationFormSchema>>({
        resolver: zodResolver(EducationFormSchema),
        defaultValues: { education: educationList },
    });

    // UseFieldArray to handle dynamic experience fields
    const { fields: educationFields, append: appendEducation, remove: removeFormEducation } = useFieldArray({
        name: 'education',
        control: form.control,
    });

    // Update resumeInfo context when experienceList changes
    useEffect(() => {
        startLoading(() => {
            setResumeInfo({
                ...resumeInfo,
                education: educationList,
            });
        });
    }, [educationList, setResumeInfo]);

    // Update context when form values change
    const updateResumeInfo = (name: string, value: any, index: number) => {
        setEducationList((prev) => {
            const updatedList = [...prev];
            updatedList[index] = {
                ...updatedList[index],
                [name]: value,
            };
            return updatedList;
        });
    };

    const removeExperience = (index: number) => {
        const updateExperienceList = educationList.filter((_, i) => i !== index);
        removeFormEducation(index);
        setEducationList(updateExperienceList);
    };

    const onSubmit = async (values: z.infer<typeof EducationFormSchema>) => {
        startTransition(() => {
            UpdateEducation(resume_id, values)
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
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your educational details</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto my-6">
                        {educationFields.map((fields, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="p-4 text-xl font-semibold flex justify-between items-center w-full hover:bg-gray-100 transition duration-500">
                                    { educationList[index].degree ? 
                                    <p>{educationList[index].degree} in {educationList[index].major}</p> : "Undefined Education"}
                                </AccordionTrigger>
                                <AccordionContent className='grid grid-cols-2 gap-3 border p-5 my-5 rounded-lg relative'>
                                    <FormField
                                        control={form.control}
                                        name={`education.${index}.universityName`}
                                        render={({ field }) => (
                                            <FormItem className='col-span-2'>
                                                <FormLabel htmlFor={`education-${index}-universityName`}>University Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id={`education-${index}-universityName`}
                                                        {...field}
                                                        type="text"
                                                        placeholder='M.I.T University'
                                                        className={`p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            updateResumeInfo('universityName', e.target.value, index);
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
                                        name={`education.${index}.degree`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={`education-${index}-degree`}>Degree</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id={`education-${index}-degree`}
                                                        {...field}
                                                        type="text"
                                                        placeholder='Bachelors'
                                                        className={`p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            updateResumeInfo('degree', e.target.value, index);
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
                                        name={`education.${index}.major`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={`education-${index}-major`}>Major</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id={`education-${index}-major`}
                                                        {...field}
                                                        type="text"
                                                        placeholder='CS'
                                                        className={`p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            updateResumeInfo('major', e.target.value, index);
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
                                        name={`education.${index}.startDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={`education-${index}-startDate`}>Start Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id={`education-${index}-startDate`}
                                                        {...field}
                                                        type="date"
                                                        className={`p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
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
                                        name={`education.${index}.endDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={`education-${index}-endDate`}>End Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id={`education-${index}-endDate`}
                                                        {...field}
                                                        type="date"
                                                        className={`p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
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

                                    <FormField
                                        control={form.control}
                                        name={`education.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem className='col-span-2'>
                                                <FormLabel htmlFor={`education-${index}-description`}>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                    id={`education-${index}-description`}
                                                        {...field}
                                                        className={`p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            updateResumeInfo('description', e.target.value, index);
                                                        }}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
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
                        )
                        )}
                    </Accordion>
                    <div className='my-3 flex justify-between items-center'>
                        <Button
                            type="button"
                            onClick={() =>
                                appendEducation({
                                    universityName: '',
                                    startDate: '',
                                    endDate: '',
                                    degree: '',
                                    major: '',
                                    description: '',
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
    )
}
