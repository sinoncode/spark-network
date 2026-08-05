"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

import FirstSlide from "@/assets/auth-images/first-slider.png"
import SecondSlide from "@/assets/auth-images/second-slider.png"
import ThirdSlide from "@/assets/auth-images/third-slider.png"

const slides = [
  {
    image: FirstSlide,
    title: "Welcome to 2Morrow Real Estate",
    description: "Find your place where dreams become reality.",
  },
  {
    image: SecondSlide,
    title: "Manage Properties Effortlessly",
    description:
      "Track listings, monitor availability and manage property portfolios from a single platform.",
  },
  {
    image: ThirdSlide,
    title: "Convert More Leads",
    description:
      "Capture, nurture and convert prospects with powerful CRM workflows.",
  },
]

export function LoginCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const autoplayRef = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    updateCurrent()
    api.on("select", updateCurrent)

    return () => {
      api.off("select", updateCurrent)
    }
  }, [api])

  return (
    <div className="flex h-full items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-fulloverflow-hidden rounded-3xl">
        {/* 3D Perspective Wrapper */}
        <div className="relative" style={{ perspective: "1200px" }}>
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              duration: 35,
              align: "center",
            }}
            plugins={[autoplayRef.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="pl-0">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: current === index ? 1 : 0.92,
                      opacity: current === index ? 1 : 0.4,
                      rotateY: current === index ? 0 : index < current ? -8 : 8,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="flex h-[600px] sm:h-[650px] flex-col items-center justify-center px-6 sm:px-12 text-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Image with ambient glow */}
                    <div className="relative mb-8 sm:mb-10 group">
                      <div className="absolute inset-0  blur-3xl scale-110 transition-transform duration-700 group-hover:scale-125" />
                      <motion.div
                        className="relative rounded-3xl  p-6 sm:p-8"
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-[200px] sm:h-[260px] w-auto object-contain select-none"
                          draggable={false}
                        />
                      </motion.div>
                    </div>

                    {/* Text content with staggered reveal */}
                    <motion.h2
                      key={`title-${current}-${index}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={current === index ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    >
                      {slide.title}
                    </motion.h2>

                    <motion.p
                      key={`desc-${current}-${index}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={current === index ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="max-w-sm text-sm sm:text-base text-white leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            {/* <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-grey/60 backdrop-blur-md border shadow-lg flex items-center justify-center text-foreground hover:bg-background transition-all hover:scale-110 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-md border shadow-lg flex items-center justify-center text-foreground hover:bg-background transition-all hover:scale-110 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button> */}
          </Carousel>
        </div>

        {/* Smooth Drop Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="relative flex items-center gap-3 bg-white backdrop-blur-md rounded-full px-4 py-2.5 shadow-lg">
            <div className="relative flex items-center h-3">
              {/* Background track dots */}
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className="relative w-2.5 h-2.5 mx-[5px] rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors cursor-pointer"
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}

              {/* Animated active dot */}
              <motion.div
                className="absolute top-0 w-2.5 h-2.5 rounded-full bg-[#FC8D0E] shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"
                animate={{
                  left: current * 22,
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  left: {
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    mass: 1,
                  },
                  scale: {
                    duration: 0.4,
                    ease: "easeInOut",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}