import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import Image from 'next/image';

export function ApplicationInfoTabs() {
    return (
        <Tabs defaultValue="sign-up" className="w-full max-w-5xl p-8">
            <TabsList className="grid w-full grid-cols-3 gap-4 my-2">
                <TabsTrigger value="sign-up" className="text-lg font-semibold text-[#1E2532]">1. Sign Up</TabsTrigger>
                <TabsTrigger value="create" className="text-lg font-semibold text-[#1E2532]">2. Create</TabsTrigger>
                <TabsTrigger value="download" className="text-lg font-semibold text-[#1E2532]">3. Download</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-up" className='bg-secondary rounded-md'>
                <Card>
                    <CardContent className="flex flex-col md:flex-row items-center p-6 gap-6">
                        <div className="flex-1">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold text-[#1E2532] mb-4">Your First Steps</CardTitle>
                                <CardDescription className="text-lg text-[#1E2532]">
                                    We’ve made sure that signing up to our resume maker tools is even more convenient than usual. Use one of the most common networks used by professionals (LinkedIn, Facebook, or your Google account) or simply skip this step and enter your name and email address. We keep your data strictly confidential.
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <Image
                                src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/sign_up-icon.png"
                                alt="Sign Up Icon"
                                width={200}
                                height={200}
                                className="w-28 h-auto md:w-auto"
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="create">
                <Card>
                    <CardContent className="flex flex-col md:flex-row items-center p-6 gap-6">
                        <div className="flex-1">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold text-[#1E2532] mb-4">Create Your Resume</CardTitle>
                                <CardDescription className="text-lg text-[#1E2532]">
                                    Start creating your resume by selecting from a wide range of professionally designed templates. Customize it according to your needs and create a resume that best reflects your skills and experience.
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <Image
                                src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/create-icon.png"
                                alt="Create Icon"
                                width={200}
                                height={200}
                                className="w-28 h-auto md:w-auto"
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="download">
                <Card>
                    <CardContent className="flex flex-col md:flex-row items-center p-6 gap-6">
                        <div className="flex-1">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold text-[#1E2532] mb-4">Download and Apply</CardTitle>
                                <CardDescription className="text-lg text-[#1E2532]">
                                    Download your resume in multiple formats including PDF and Word. Use it to apply for jobs and impress hiring managers with your professionally crafted resume.
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <Image
                                src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/download-icon.png"
                                alt="Download Icon"
                                width={200}
                                height={200}
                                className="w-28 h-auto md:w-auto"
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

export default ApplicationInfoTabs;