import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaAirbnb } from "react-icons/fa";

import place1 from "@assets/Image1.png";
import place2 from "@assets/Image2.png";;
import place3 from "@assets/Image3.png";;
import place4 from "@assets/Image4.png";;
import place5 from "@assets/Image5.png";;
import place7 from "@assets/Image7.png";;

const images = [
  { src: place1, alt: "Airbnb place photo 1" },
  { src: place2, alt: "Airbnb place photo 2" },
  { src: place3, alt: "Airbnb place photo 3" },
  { src: place4, alt: "Airbnb place photo 4" },
  { src: place5, alt: "Airbnb place photo 5" },
  { src: place7, alt: "Airbnb place photo 7" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

interface AirbnbSectionProps {
  airbnbUrl?: string;
}

export function AirbnbSection({ airbnbUrl = "https://www.airbnb.com" }: AirbnbSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="our-place" className="pt-8 pb-24 md:pt-10 md:pb-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Our Airbnb
            </h4>
            <h2 className="text-4xl md:text-5xl font-display text-foreground">
              The <span className="italic text-foreground/70">Place</span>
            </h2>
          </div>

          {/* Airbnb Link */}
          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 w-fit border border-foreground/20 px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <FaAirbnb className="w-5 h-5 text-[#FF5A5F] group-hover:text-background transition-colors duration-300" />
            <span className="text-sm tracking-widest uppercase font-medium">
              View on Airbnb
            </span>
            <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" />
          </a>
        </motion.div>

        {/* Carousel */}
        <motion.div variants={fadeInUp} className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4 md:gap-6">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_48%] min-w-0 relative"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        idx === selectedIndex ? "opacity-100 scale-100" : "opacity-60 scale-[0.98]"
                      }`}
                    />
                    {/* Slide number */}
                    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs tracking-widest text-foreground/60 uppercase font-mono">
                      {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`transition-all duration-300 ${
                    idx === selectedIndex
                      ? "w-8 h-[2px] bg-foreground"
                      : "w-4 h-[2px] bg-foreground/25 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow controls */}
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                className="w-11 h-11 border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="w-11 h-11 border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
