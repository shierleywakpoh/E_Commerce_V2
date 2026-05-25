import React from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";

function Home() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <BestSeller />
      <BottomBanner />
    </div>
  );
}

export default Home;
