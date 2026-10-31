import Image from "next/image"
import { cn } from "cn"

interface StudioImage {
  src: string
  alt: string
}

interface StudioGalleryProps {
  images: StudioImage[]
}

export function StudioGallery({ images }: StudioGalleryProps) {
  if (images.length === 0) {
    return (
      <div
        className="aspect-[4/3] rounded-xl bg-muted grid items-center justify-center"
      >
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden grid">
      {images.map((image, index) => (
        <div
          key={image.src}
          className="relative bg-muted/50 transition-colors hover:bg-muted"
        >
          <Image
            src={image.src}
            alt={image.alt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  )
}