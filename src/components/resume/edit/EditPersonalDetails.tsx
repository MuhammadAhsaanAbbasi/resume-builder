"use client"
import { useResumeContext } from '@/components/context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resumePersonalDetailsSchema } from '@/schema/resume'
import React, { ChangeEvent, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import FormError from '@/components/shared/FormError'
import FormSuccess from '@/components/shared/FormSuccess'
import { UpdatePersonalDetails } from '@/lib/actions/resume.actions'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { LoaderCircle } from 'lucide-react'

interface ResumeDetailsProps {
    resume_id: string;
    setEnableNext: (loading: boolean) => void;
}


export const EditPersonalDetails = ({ resume_id, setEnableNext }: ResumeDetailsProps) => {
    const { resumeInfo, setResumeInfo } = useResumeContext();

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof resumePersonalDetailsSchema>>({
        resolver: zodResolver(resumePersonalDetailsSchema),
    })

    const updateResumeInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        startTransition(() => {
            setResumeInfo({
                ...resumeInfo,
                [name]: value
            })
        })
    }

    const onSubmit = async (values: z.infer<typeof resumePersonalDetailsSchema>) => {
        startTransition(() => {
            UpdatePersonalDetails(resume_id, values)
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
        })
    }

    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get Started with Some Basic Information</p>
            <Form
                {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4 my-5'>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor='first_name'>First Name</FormLabel>
                                    <FormControl>
                                        <Input id='first_name'
                                            {...field}
                                            type="text"
                                            placeholder='First Name'
                                            defaultValue={resumeInfo?.firstName}
                                            className='p-2 border border-gray-300 rounded-md'
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateResumeInfo(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor='last_name'>Last Name</FormLabel>
                                    <FormControl>
                                        <Input id='last_name'
                                            {...field}
                                            type="text"
                                            placeholder='Last Name'
                                            className='p-2 border border-gray-300 rounded-md'
                                            defaultValue={resumeInfo?.lastName}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateResumeInfo(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem className='col-span-2'>
                                    <FormLabel htmlFor='job_title'>Job Title</FormLabel>
                                    <FormControl>
                                        <Input id='job_title'
                                            {...field}
                                            type="text"
                                            placeholder='Full Stack Developer'
                                            className='p-2 border border-gray-300 rounded-md'
                                            defaultValue={resumeInfo?.jobTitle}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateResumeInfo(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className='col-span-2'>
                                    <FormLabel htmlFor='address'>Address</FormLabel>
                                    <FormControl>
                                        <Input id='address'
                                            {...field}
                                            type="text"
                                            placeholder='Karachi, Pakistan'
                                            className='p-2 border border-gray-300 rounded-md'
                                            defaultValue={resumeInfo?.address}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateResumeInfo(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <FormControl>
                                        <Input id='email'
                                            {...field}
                                            type="email"
                                            className='p-2 border border-gray-300 rounded-md'
                                            placeholder='abc@gmail.com'
                                            defaultValue={resumeInfo?.email}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateResumeInfo(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor='phone_number'>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input id='phone_number'
                                            {...field}
                                            className='p-2 border border-gray-300 rounded-md'
                                            placeholder='Phone Number'
                                            defaultValue={resumeInfo?.phone}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateResumeInfo(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='my-3 flex justify-end'>
                        <Button
                            type="submit"
                            className='rounded-md disabled:cursor-progress'
                            disabled={isPending}
                        >
                            {isPending ?
                                <LoaderCircle className='animate-spin' /> :
                                'Save Change'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
