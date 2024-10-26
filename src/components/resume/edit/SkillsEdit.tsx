"use client"
import { useResumeContext } from '@/components/context/ResumeContext';
import { SkillsFormSchema } from '@/schema/resume';
import React, { useEffect, useState, useTransition } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod'
import { toast } from '@/hooks/use-toast';
import { UpdateSkills } from '@/lib/actions/resume.actions';
import { Input } from '@/components/ui/input';
import { Rating, RoundedStar } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus, Trash } from 'lucide-react';
import '@smastrom/react-rating/style.css'

interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}

export const SkillsEdit = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    const { resumeInfo, setResumeInfo } = useResumeContext();
    const [isPending, startTransition] = useTransition();
    const [isLoading, startLoading] = useTransition();

    // Initialize state from context or default value
    const [skillsList, setSkillsList] = useState(
        resumeInfo.skills || []
    );

    // Initialize form with context data
    const form = useForm<z.infer<typeof SkillsFormSchema>>({
        resolver: zodResolver(SkillsFormSchema),
        defaultValues: { skills: skillsList },
    });

    // UseFieldArray to handle dynamic experience fields
    const { fields: skillsFields, append: appendSkill, remove: removeFormSkill } = useFieldArray({
        name: 'skills',
        control: form.control,
    });

    // Update context when form values change
    const updateResumeInfo = (name: string, value: any, index: number) => {
        setSkillsList((prev) => {
            const updatedList = [...prev];
            updatedList[index] = {
                ...updatedList[index],
                [name]: value,
            };
            return updatedList;
        });
    };

    // Update resumeInfo context when experienceList changes
    useEffect(() => {
        startLoading(() => {
            setResumeInfo({
                ...resumeInfo,
                skills: skillsList,
            });
        });
    }, [skillsList, setResumeInfo]);

    const removeSkill = (index: number) => {
        const updateSkillList = skillsList.filter((_, i) => i !== index);
        removeFormSkill(index);
        setSkillsList(updateSkillList);
    };

    const appendSkills = () => {
        const data = {
            name: '',
            rating: 0
        }
        appendSkill(data);
        setSkillsList([...skillsList, data]);
    };

    const onSubmit = async (values: z.infer<typeof SkillsFormSchema>) => {
        startTransition(() => {
            UpdateSkills(resume_id, values)
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
                        });
                    }
                })
                .catch((error) => {
                    toast({
                        title: "Failed",
                        description: error.message,
                        variant: "destructive",
                        duration: 2000,
                    });
                })
                .finally(() => {
                    setEnableNext(false);
                });
        });
    };

    const ratingStyles = {
        itemShapes: RoundedStar,
        itemStrokeWidth: 2,
        activeFillColor: resumeInfo.themeColor || '#489DA9',
        activeStrokeColor: resumeInfo.themeColor || '#489DA9',
        inactiveFillColor: '#D3D3D3',
        inactiveStrokeColor: "#D3D3D3",
    }

    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {skillsFields.map((fields, index) => (
                        <div key={index} className='flex justify-between items-center gap-3 border p-3 my-3 rounded-lg'>
                            <FormField
                                control={form.control}
                                name={`skills.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className='col-span-2'>
                                        <FormLabel htmlFor={`skills-${index}-name`}>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id={`skills-${index}-name`}
                                                {...field}
                                                type="text"
                                                placeholder='React, Next.js'
                                                className={`p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    updateResumeInfo('name', e.target.value, index);
                                                }}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex justify-end items-center gap-2'>
                                <FormField
                                    control={form.control}
                                    name={`skills.${index}.rating`}
                                    render={({ field }) => (
                                        <FormItem className='col-span-2'>
                                            <FormControl>
                                                <Rating
                                                    {...field}
                                                    style={{ maxWidth: 150 }}
                                                    value={field.value}
                                                    onChange={(e: number) => {
                                                        field.onChange(e);
                                                        updateResumeInfo('rating', e, index);
                                                    }}
                                                    itemStyles={ratingStyles}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    onClick={() => removeSkill(index)}
                                    disabled={isPending || isLoading}
                                >
                                    <Trash className="text-destructive hover:text-destructive/90" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className='my-3 flex justify-between items-center'>
                        <Button
                            type="button"
                            onClick={appendSkills}
                            className='rounded-md disabled:cursor-progress flex items-center gap-2'
                            disabled={isPending || isLoading}
                        >
                            <Plus />
                            <span>Add New Skills</span>
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
