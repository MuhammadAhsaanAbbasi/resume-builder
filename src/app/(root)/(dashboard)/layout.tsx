import { ReactNode } from 'react';
import { Metadata } from 'next';
// import Header from '@/components/Navigation/Header/Header';

export const metadata: Metadata = {
    title: "SkillForge - Resume Builder",
    description: "A.I based resume builder",
};


const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            {children}
        </main>
    );
};

export default DashboardLayout;