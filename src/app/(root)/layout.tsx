import { ReactNode } from 'react';
import { Metadata } from 'next';
// import Header from '@/components/Navigation/Header/Header';

export const metadata: Metadata = {
    title: "Resume Builder",
    description: "A.I based resume builder",
};


const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            {/* <Header /> */}
            {children}
        </main>
    );
};

export default RootLayout;