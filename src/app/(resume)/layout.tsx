import { ReactNode } from 'react';
import { Metadata } from 'next';
import Header from '@/components/navigation/Header';

export const metadata: Metadata = {
    title: "SkillForge - Resume Builder",
    description: "A.I based resume builder",
};


const ResumeLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
};

export default ResumeLayout;