"use client";
import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { Grid } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useResumeContext } from '../context/ResumeContext'
import { UpdateThemeColor } from '@/lib/actions/resume.actions';
import { toast } from '@/hooks/use-toast';

const ThemeButton = ({resume_id}: {resume_id: string}) => {
    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#Fa9005", 
        "#A1FF33", "#ffad33", "#ffde4d", "#5A33FF", 
        "#fa3916", "#44ff33", "#33d3ff", "#489DA9",
    ]

    const {resumeInfo, setResumeInfo} = useResumeContext();

    const [themeColor, setThemeColor] = useState(resumeInfo?.themeColor);

    const [isPending, startTransition] = useTransition();

    const handleColor = (color: string) => {
        setThemeColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })

        console.log(themeColor)

        startTransition(() => {
            UpdateThemeColor(resume_id, color)
            .then((resp) => {
                if (resp?.error) {
                    toast({
                        title: "Failed",
                        description: resp?.error,
                        variant: "destructive",
                        duration: 2000,
                    });
                }
                if (resp?.success) {
                    toast({
                        title: "Successfully Updated!",
                        description: resp.success,
                        duration: 2000,
                    });
                }
            }).catch((error) => {
                toast({
                    title: "Failed",
                    description: error.message,
                    variant: "destructive",
                });
                console.error(error.message);
            })
        });
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className='flex items-center gap-2'>
                    <Grid />
                    <span>
                        Theme
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='my-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {colors.map((item,index) => (
                        <div key={index} style={{
                            backgroundColor: item
                        }} className={`h-6 w-6 rounded-full cursor-pointer
                        ${themeColor === item && "border-2 border-black"}
                        `}
                        onClick={() => handleColor(item)}
                        >
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeButton