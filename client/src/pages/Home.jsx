import React from "react";
import Navbar from "../components/Home/Navbar";
import HeroSection from "../components/Home/HeroSection";
const Home = () => {
  return (
    <>
      <div className="w-screen min-h-screen overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
};

export default Home;
