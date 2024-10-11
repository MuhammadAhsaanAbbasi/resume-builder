import { useResumeContext } from '@/components/context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resumePersonalDetailsSchema } from '@/schema/resume'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

export const EditPersonalDetails = ({ resume_id }: { resume_id: string }) => {
    const {resumeInfo, setResumeInfo} = useResumeContext();

    const form = useForm<z.infer<typeof resumePersonalDetailsSchema>>({
        resolver: zodResolver(resumePersonalDetailsSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            address: "",
            phone: "",
            email: "",
        }
    })
    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get Started with Some Basic Information</p>
            <form>
                <div className='grid grid-cols-2 gap-4 my-5'>
                    <div>
                        <Label htmlFor='first_name'>First Name</Label>
                        <Input id='first_name' 
                        type="text" 
                        defaultValue={resumeInfo.firstName}
                        placeholder='First Name' 
                        className='p-2 border border-gray-300 rounded-md' 
                        />
                    </div>
                    <div>
                        <Label htmlFor='last_name'>Last Name</Label>
                        <Input id='last_name' 
                        type="text" 
                        defaultValue={resumeInfo.lastName}
                        placeholder='Last Name' 
                        className='p-2 border border-gray-300 rounded-md' 
                        />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor='job_title'>Job Title</Label>
                        <Input id='job_title' 
                        type="text" 
                        defaultValue={resumeInfo.jobTitle}
                        placeholder='Full Stack Developer' 
                        className='p-2 border border-gray-300 rounded-md' 
                        />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor='address'>Address</Label>
                        <Input id='address' 
                        type="text" 
                        defaultValue={resumeInfo.address}
                        placeholder='Karachi, Pakistan' 
                        className='p-2 border border-gray-300 rounded-md' 
                        />
                    </div>
                    <div>                                                                                   
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' 
                        type="email" 
                        defaultValue={resumeInfo.email}
                        placeholder='abc@gmail.com' 
                        className='p-2 border border-gray-300 rounded-md' 
                        />
                    </div>
                    <div>
                        <Label htmlFor='phone_number'>Phone Number</Label>
                        <Input id='phone_number' 
                        type="tel" 
                        defaultValue={resumeInfo.phone}
                        placeholder='Phone Number' 
                        className='p-2 border border-gray-300 rounded-md' 
                        />
                    </div>
                    
                </div>
                <Button
                    type="submit"
                    className='-2 rounded-md my-5'>Save Changes</Button>
            </form>
        </div>
    )
}
