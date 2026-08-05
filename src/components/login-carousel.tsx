"use client"

import { useEffect, useState, useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

import FirstSlide from "@/assets/auth-images/first-slider.png"
import SecondSlide from "@/assets/auth-images/second-slider.png"
import ThirdSlide from "@/assets/auth-images/third-slider.png"

const slides = [
  {
    image:FirstSlide,
    title: "Welcome to 2Morrow Real Estate",
    description: "Find your place where dreams become reality.",
  },
  {
    image:SecondSlide,
    title: "Manage Properties Effortlessly",
    description:
      "Track listings, monitor availability and manage property portfolios from a single platform.",
  },
  {
    image:ThirdSlide,
    title: "Convert More Leads",
    description:
      "Capture, nurture and convert prospects with powerful CRM workflows.",
  },
]

export function LoginCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
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
  <div className="flex h-full items-center justify-center">
    <Carousel
      setApi={setApi}
     opts={{
  loop: true,
  duration: 30,
  align: "center",
}}
      plugins={[autoplay.current]}
      className="w-full"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="flex h-[650px] flex-col items-center justify-center px-12 text-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="mb-10 h-[260px] w-auto object-contain select-none"
                draggable={false}
              />

              <h2 className="mb-4 text-3xl font-semibold text-foreground">
                {slide.title}
              </h2>

              <p className="max-w-md text-muted-foreground leading-relaxed">
                {slide.description}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Fixed Indicators */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
  <div className="relative flex items-center gap-3">
    {slides.map((_, index) => (
      <div
        key={index}
        className="h-2.5 w-2.5 rounded-full bg-slate-300"
      />
    ))}

   <motion.div
  className="absolute h-2.5 w-8 rounded-full bg-primary"
  animate={{
    x: current * 22,
    scaleX: [1, 1.35, 1],
  }}
  transition={{
    x: {
      type: "spring",
      stiffness: 170,
      damping: 18,
    },
    scaleX: {
      duration: 0.45,
      ease: "easeInOut",
    },
  }}
/>
  </div>
</div>
    </Carousel>
  </div>
)
}