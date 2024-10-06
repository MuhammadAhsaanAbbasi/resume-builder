import React from 'react';
import Image from 'next/image';
import linkedin from "@/../public/linkedin.svg"
import youtube from "@/../public/youtube.svg"
import twitter from "@/../public/twitter.svg"
import instagram from "@/../public/instagram.svg"
import facebook from "@/../public/facebook.svg"
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16 text-white px-6 md:px-20 bg-[#0F141E] py-10">
            <div className="flex flex-col gap-5">
                <h4 className="text-2xl font-semibold">Connect with us on social media</h4>
                <div className="flex items-center gap-2">
                    <Link href={'https://www.linkedin.com/in/mahsaanabbasi-fullstack-cloud-ai-developer/'}>
                    <Image src={linkedin}
                        alt="LinkedIn"
                        width={40} height={40}
                        className="cursor-pointer"
                    />
                    </Link>
                    <Link href={'https://www.youtube.com/@humanity2666'}>
                    <Image src={youtube}
                        alt="YouTube"
                        width={40} height={40}
                        className="cursor-pointer"
                    />
                    </Link>
                    <Link href={'https://x.com/Muhamma99141099'}>
                    <Image src={twitter}
                        alt="twitter"
                        width={40} height={40}
                        className="cursor-pointer"
                    />
                    </Link>
                    <Link href={"https://www.instagram.com/m_ahsaan_abbasi"}>
                    <Image src={instagram}
                        alt="Instagram"
                        width={40} height={40}
                        className="cursor-pointer"
                    />
                    </Link>
                    <Link href={"https://www.facebook.com/ahsaan.abbasi.334/"}>
                    <Image src={facebook}
                        alt="Facebook"
                        width={40} height={40}
                        className="cursor-pointer"
                    />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div>
                    <h6 className="text-xl font-semibold my-2">SkillForge Resources</h6>
                    <ul className="space-y-2">
                        <li>Create a resume</li>
                        <li>Resume examples</li>
                        <li>Resume templates</li>
                        <li>Resume Help</li>
                        <li>Sponsorship Program</li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-xl font-semibold my-2">Our Company</h6>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Pricing</li>
                        <li>Career</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-xl font-semibold my-2">Support</h6>
                    <ul className="space-y-2">
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Terms of Service</li>
                        <li>Privacy</li>
                        <li>Right of Withdrawal</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;