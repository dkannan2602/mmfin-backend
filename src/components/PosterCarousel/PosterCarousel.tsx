"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "/Image/Housing Loan Scheme Infographic.png",
    alt: "Housing Loan Scheme",
  },
  {
    src: "/Image/Personal Loan Scheme Poster.png",
    alt: "Personal Loan Scheme",
  },
  {
    src: "/Image/Business Loan Scheme Poster.png",
    alt: "Business Loan Scheme",
  },
  {
    src: "/Image/Vehicle Loan Scheme Infographic.png",
    alt: "Vehicle Loan Scheme",
  },
  {
    src: "/Image/Loan Against Property Infographic.png",
    alt: "Loan Against Property",
  },
];

export default function PosterCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-scroll effect
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000); // Auto-scroll every 5 seconds

    return () => {
      clearInterval(autoScroll);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-0 bg-white">
      <div className="w-full">
        {/* Carousel Container */}
        <div className="relative">
          {/* Embla Carousel */}
          <div className="overflow-hidden rounded-none shadow-none w-full" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 relative h-[400px] sm:h-[500px] md:h-[600px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 transition-colors shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 transition-colors shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6 pb-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-blue-700 w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
