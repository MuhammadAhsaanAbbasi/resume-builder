"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarHalfIcon } from "lucide-react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        rating: number;
        quote: string;
        name: string;
        picture: string;
        link: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    const [start, setStart] = useState(false);
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    useEffect(() => {
        addAnimation();
    }, [addAnimation]);

    const getStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} className="text-[#FFD700]">
                    <StarFilledIcon className="h-5 w-5" />
                </span>
            );
        }

        if (halfStar) {
            stars.push(
                <span key="half" className="text-[#FFD700]">
                    <StarHalfIcon className="h-5 w-5" />
                </span>
            );
        }

        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars.push(
                <span key={`empty-${i}`} className="text-[#D3D3D3]">
                    <StarFilledIcon className="h-5 w-5" />
                </span>
            );
        }

        return stars;
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-primary/70 px-8 py-6 md:w-[450px] bg-primary"
                        key={idx}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <div className="flex flex-col justify-start gap-2">
                                <span className="flex justify-start mb-2">
                                    {getStars(item.rating)}
                                </span>
                                <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                                    {item.quote}
                                </span>
                            </div>
                            <div className="relative z-20 mt-6 flex flex-row items-center">
                                <Link href={item.link} className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src={item.picture} />
                                        <AvatarFallback>{item.name}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm leading-[1.6] text-[#1E2532] font-normal hover:underline-offset-2">
                                        {item.name}
                                    </span>
                                </Link>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
