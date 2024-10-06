import React from "react";
import FeaturedDesign from "@/components/root/FeaturedDesign";
import Hero from "@/components/root/Hero";
import Partner from "@/components/root/Partner";
import Reviews from "@/components/root/Reviews";
import ResumeGuide from "@/components/root/resume_guided/ResumeGuide";
import ResumeApplicationInfo from "@/components/root/ResumeApplicationInfo";
import FrequentAnswerQuestion from "@/components/root/Faq";
import JoinOver from "@/components/root/JoinOver";

export default function Home() {
  return (
    <>
      <Hero />
      <Partner />
      <Reviews />
      <FeaturedDesign />
      <ResumeGuide />
      <ResumeApplicationInfo />
      <FrequentAnswerQuestion />
      <JoinOver />
    </>
  );
}
