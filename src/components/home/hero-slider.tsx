"use client"

import "swiper/css"
import "swiper/css/effect-fade"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules"
import type { Swiper as SwiperClass } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { cn } from "cn"

import { Container } from "@/components/shared/container"
import { Button, buttonVariants } from "@/components/ui/button"
import type { HeroSlide } from "@/types/home"

interface HeroSliderProps {
  slides: HeroSlide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className="relative bg-foreground"
      aria-label="Featured creator spaces"
    >
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard]}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
        slidesPerView={1}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        keyboard={{ enabled: true }}
        autoplay={
          shouldReduceMotion
            ? false
            : {
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        className="h-[calc(100svh-4rem)] min-h-[620px] max-h-[820px] sm:h-[calc(100svh-4.5rem)]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div className="relative h-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0",
                  slide.align === "right"
                    ? "bg-gradient-to-l from-black/85 via-black/45 to-black/10"
                    : "bg-gradient-to-r from-black/85 via-black/45 to-black/10",
                )}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
              />

              <Container className="relative z-10 flex h-full flex-col justify-end pb-32 sm:pb-36 lg:pb-40">
                <motion.div
                  key={slide.id}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "max-w-2xl text-white",
                    slide.align === "right" && "ml-auto",
                  )}
                >
                  <p className="eyebrow flex items-center gap-2.5 text-white/70">
                    <span aria-hidden className="h-px w-6 bg-white/50" />
                    {slide.eyebrow}
                  </p>
                  <h1 className="display-xl mt-5 whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                    {slide.description}
                  </p>
                  <p className="mt-6 text-xs font-medium tracking-wide text-white/60">
                    {slide.note}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={slide.primaryCta.href}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "bg-background text-foreground hover:bg-background/90",
                      )}
                    >
                      {slide.primaryCta.label}
                      <ArrowRightIcon />
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "border-white/30 bg-white/5 text-white hover:border-white/50 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  </div>
                </motion.div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <Container className="pointer-events-auto flex items-center justify-between gap-6 border-t border-white/20 py-4 text-white/70">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.7rem] tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1">
              {slides.map((slide, index) => {
                const active = activeIndex === index

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => swiper?.slideToLoop(index)}
                    aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                    aria-current={active ? "true" : undefined}
                    className="group/indicator flex h-6 items-center px-0.5"
                  >
                    <span
                      className={cn(
                        "h-px w-7 bg-white/30 transition-all duration-300 group-hover/indicator:bg-white/60",
                        active && "h-0.5 w-11 bg-white",
                      )}
                    />
                  </button>
                )
              })}
            </div>
            <span className="font-mono text-[0.7rem] tabular-nums">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous slide"
              className="border-white/30 bg-white/5 text-white hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => swiper?.slideNext()}
              aria-label="Next slide"
              className="border-white/30 bg-white/5 text-white hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </div>
    </section>
  )
}
