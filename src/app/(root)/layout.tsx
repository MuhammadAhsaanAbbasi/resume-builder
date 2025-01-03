import { ReactNode } from 'react';
import { Metadata } from 'next';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: "SkillForge - Resume Builder",
    description: "A.I based resume builder",
};


const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default RootLayout;