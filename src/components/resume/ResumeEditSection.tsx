"use client"; // Ensure this component is only rendered on the client

import React, { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import ThemeButton from './ThemeButton';
import { activeSection } from '../../../constants/data';
import { useRouter } from 'next/navigation';

const ResumeEditSection = ({ resume_id }: { resume_id: string }) => {
    const [activeSectionIndex, setActiveSectionIndex] = useState(2);
    const [enableNext, setEnableNext] = useState(true); // Naming consistency

    const router = useRouter();

    // Function to go to the next section
    const handleNext = () => {
        setActiveSectionIndex((prevIndex) =>
            prevIndex < activeSection.length - 1 ? prevIndex + 1 : prevIndex
        );
        setEnableNext(true);
    };

    // Function to go to the previous section
    const handlePrevious = () => {
        setActiveSectionIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        setEnableNext(false);
    };

    return (
        <section className="">
            <div className="flex justify-between items-center gap-5">
                <div className="flex items-center gap-2">
                    <Button className="flex items-center gap-2" onClick={() => router.push('/')}>
                        <span>Home</span>
                        <Home />
                    </Button>
                    <ThemeButton />
                </div>
                <div className="flex items-center gap-2">
                    {activeSectionIndex > 0 && (
                        <Button
                            size={"sm"}
                            className="flex items-center gap-2"
                            onClick={handlePrevious}
                        >
                            <ArrowLeft />
                            <span>Previous</span>
                        </Button>
                    )}

                    <Button
                        size={"sm"}
                        className="flex items-center gap-2"
                        onClick={
                            activeSectionIndex < activeSection.length - 1
                                ? handleNext
                                : () => {
                                    router.push(`/resume/${resume_id}/view`);
                                }
                        }
                        disabled={enableNext}
                    >
                        <span>Next</span>
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            {/* Render the active section */}
            <div className="my-10 p-5 shadow-lg rounded-lg border-y-primary border-y-4">
                {activeSection.map((sections, index) =>
                    activeSectionIndex === sections.id ? (
                        <Fragment key={index}>
                            <sections.section
                                resume_id={resume_id}
                                setEnableNext={(value) => setEnableNext(value)}
                            />
                        </Fragment>
                    ) : null
                )}
            </div>
        </section>
    );
};

export default ResumeEditSection;
