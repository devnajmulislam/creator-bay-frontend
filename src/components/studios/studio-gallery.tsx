"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "cn"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import type { StudioImage } from "@/types/studio"

interface StudioGalleryProps {
  images: StudioImage[]
}

export function StudioGallery({ images }: StudioGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync controlled embla state
    setCount(api.scrollSnapList().length)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync controlled embla state
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-xl bg-muted grid items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={`${image.src}-${index}`}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted/50">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                />
                <div className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                  {current} / {count || images.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 ? (
          <>
            <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </>
        ) : null}
      </Carousel>

      {/* Thumbnail Navigation */}
      {images.length > 1 ? (
        <div className="grid grid-flow-col auto-cols-[6rem] gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`thumb-${image.src}-${index}`}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 transition-all",
                current === index + 1
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="6rem"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
