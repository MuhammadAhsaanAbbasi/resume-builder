"use client"
import { useState, useTransition } from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    createButton,
    Editor,
    EditorProvider,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Bot, LoaderCircle } from 'lucide-react';
import { useResumeContext } from '../context/ResumeContext';
import { AISession } from '@/lib/gemini';
import { toast } from '@/hooks/use-toast';

interface Props {
    onChange: (value: string) => void;
    defaultValue: string;
    index: number;
    isPending: boolean;
}

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

export default function RichTextEditor({ onChange, defaultValue, index, isPending }: Props) {
    const { resumeInfo } = useResumeContext();

    const [value, setValue] = useState(defaultValue);

    const [isLoading, startLoading] = useState(false);

    const generateSummary = async () => {
        startLoading(true);
        if (!resumeInfo.experience[index].title) {
            toast({
                title: "Failed",
                description: "Please add Position Title!",
                variant: "destructive",
                duration: 2000,
            });
            startLoading(false);
            return;
        }
        const PROMPT = `Position title: ${resumeInfo.experience[index].title}. Based on this position title, provide 5-7 bullet points describing the experience for a resume in HTML tags. Do not include JSON or objects, just provide the bullet points in HTML list items.`;
        const request = await AISession.sendMessage(PROMPT);
        const response = await request.response.text();

        setValue(response.replace('"','').replace('"',''));
        onChange(response.replace('"','').replace('"','')); // Make sure to propagate the updated value to the parent.
        startLoading(false);
    };

    return (
        <FormItem className='col-span-2 my-2'>
            <div className='flex justify-between items-center gap-2'>
                <FormLabel htmlFor={`experience-${index}-workSummary`}>Work Summary</FormLabel>
                <Button
                    variant={"outline"}
                    type="button"
                    size={"sm"}
                    className="border-primary text-primary hover:text-primary/85"
                    disabled={isPending || isLoading}
                    onClick={generateSummary}
                >
                    {isLoading ? (
                        <LoaderCircle className='animate-spin' />
                    ) : (
                        <span className='flex items-center gap-2'>
                            <Bot className='h-5 w-5' />
                            <span>Generate from A.I</span>
                        </span>
                    )}
                </Button>
            </div>
            <FormControl>
                <EditorProvider>
                    <Editor
                        id={`experience-${index}-workSummary`}
                        containerProps={{ style: { resize: 'vertical' } }}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange(e.target.value); // Update the form value when the user changes the content.
                        }}
                        className='p-4 border border-gray-300 rounded-md'
                        disabled={isPending}
                    >
                        <Toolbar>
                            <BtnBold />
                            <BtnItalic />
                            <BtnUnderline />
                            <BtnStrikeThrough />
                            <Separator />
                            <BtnNumberedList />
                            <BtnBulletList />
                            <Separator />
                            <BtnLink />
                        </Toolbar>
                    </Editor>
                </EditorProvider>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}
