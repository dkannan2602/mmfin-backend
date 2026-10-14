"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const posters = [
  {
    src: "/Image/posters/homeloan.png",
    alt: "Home Loan",
  },
  {
    src: "/Image/posters/personalloan.png",
    alt: "Personal Loan",
  },
  {
    src: "/Image/posters/businessloan.png",
    alt: "Business Loan",
  },
  {
    src: "/Image/posters/vehicleloan.png",
    alt: "Vehicle Loan",
  },
  {
    src: "/Image/posters/propertyloan.png",
    alt: "Property Loan",
  },
];

export default function PosterCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % posters.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Our <span className="text-blue-600">Financial Products</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Explore our range of loan solutions tailored for you
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-50">
          {/* Slides Wrapper */}
          <div className="relative h-96 sm:h-[420px] md:h-[500px] lg:h-[600px]">
            {posters.map((poster, index) => {
              let position = "translate-x-full opacity-0";
              let delay = 0;

              if (index === currentIndex) {
                position = "translate-x-0 opacity-100";
                delay = 0;
              } else if (
                index === (currentIndex - 1 + posters.length) % posters.length
              ) {
                position = "-translate-x-full opacity-0";
                delay = 0;
              }

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${position} ${
                    isTransitioning ? "" : ""
                  }`}
                >
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-8 sm:p-10 md:p-12 lg:p-16">
                    <Image
                      src={poster.src}
                      alt={poster.alt}
                      fill
                      className="object-contain p-0"
                      quality={95}
                      priority={index === currentIndex}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side Indicators - Vertical */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {posters.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-blue-600 h-3 w-10"
                    : "bg-gray-400 h-2 w-2 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Side Indicators - Vertical (Right) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {posters.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-blue-600 h-3 w-10"
                    : "bg-gray-400 h-2 w-2 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} <span className="text-gray-300">/ {posters.length}</span>
            </span>
          </div>
        </div>

        {/* Slide Counter Below */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <p className="text-gray-600 text-sm">Slides auto-rotate every 5 seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
}
