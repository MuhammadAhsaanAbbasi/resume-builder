"use client"
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'

const Header = () => {
    const {isSignedIn} = useUser();
    const path = usePathname();
    return (
        <header className='px-6 sm:px-12 md:px-18 flex justify-between items-center gap-3 shadow-md border-b-2 border-solid'>
            <Link href={"/"}
                className='flex items-center'
            >
                <Image
                    src={"https://myapplication-logos.s3.ap-south-1.amazonaws.com/SkillForge.png"}
                    alt='SkillForge'
                    width={60}
                    height={60}
                    className='w-20 h-auto md:w-auto' 
                    priority
                />
                <span className='text-2xl font-bold text-primary'>SkillForge</span>
            </Link>
            {
                isSignedIn ? 
                <div className='flex items-center gap-4'>
                    <Link href={"/dashboard"}>
                    <Button variant={"outline"} className={`${path==="/dashboard" && "bg-accent text-accent-foreground"}`}>
                        Dashboard
                    </Button>
                    </Link>
                    <UserButton />
                </div>
                : 
                <SignInButton>
                    <Button>
                        Get Started
                    </Button>
                </SignInButton>
            }
        </header>
    )
}

export default Header