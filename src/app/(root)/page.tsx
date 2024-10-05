import React from "react";
import FeaturedDesign from "@/components/root/FeaturedDesign";
import Hero from "@/components/root/Hero";
import Partner from "@/components/root/Partner";
import Reviews from "@/components/root/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <Partner />
      <Reviews />
      <FeaturedDesign />
    </>
  );
}
