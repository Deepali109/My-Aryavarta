import React from "react";
import vedio from "../../assets/vedios/v1.mp4";
function HeroSection() {
  return (
    <div>
      <header className="relative w-screen min-h-screen flex items-center justify-center text-center text-white bg-black bg-opacity-50 px-0">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={vedio} type="video/mp4" />
          </video>
        </div>

        <div className="z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest mb-6">
            Explore the Indian Culture and Heritage.
          </h1>
          <p className="text-sm md:text-base leading-7 mb-6">
            India is a country dotted with stunning wildlife diversity...
          </p>
          <a
            href="https://indianculture.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-700 px-6 py-3 font-semibold text-sm transition-all duration-500 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-green-700 w-0 group-hover:w-full transition-all duration-500 z-0"></span>
            <span className="relative z-10 group-hover:text-white">
              Read More
            </span>
          </a>
        </div>
      </header>
    </div>
  );
}

export default HeroSection;
