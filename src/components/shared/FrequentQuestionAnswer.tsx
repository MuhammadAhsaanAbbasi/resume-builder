import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export const FrequentQuestionAnswer = () => {
    const faqs = [
        {
            trigger: "How can I use SkillForge for free?",
            content: "SkillForge has a few different tools you can use 100% for free without entering any credit card details.",
        },
        {
            trigger: "How can I customize my resume?",
            content: "Our resume templates are designed to adapt to your content and look great across all of our designs.",
        },
        {
            trigger: "Can I download my resume to Word or PDF?",
            content: "Once your resume is ready, there are a number of ways you can export your resumes or cover letters to start applying for jobs. You can download a PDF, DOCX (Word), or TXT file of your resume either directly from your Dashboard or from the Resume Editor.",
        },
        {
            trigger: "How do I cancel, downgrade or delete my account?",
            content: 'You can cancel a SkillForge subscription right from our website without even logging into the app. To do that, visit our Contact Us page and click the "Cancel Subscription" option from the menu.',
        },
    ];

    return (
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto my-12">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="w-full border-b border-gray-300">
                    <AccordionTrigger className="p-4 text-xl font-semibold flex justify-between items-center w-full hover:bg-gray-100 transition duration-500">
                        {faq.trigger}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 text-base">
                        {faq.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};