import Link from "next/link"
import Image from "next/image"
import { cn } from "cn"

interface BrandProps {
  className?: string
}

export function Brand({ className }: BrandProps) {
  return (
    <Link
      href="/"
      aria-label="CreatorBay home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <div className="relative size-8 shrink-0 overflow-hidden rounded-md bg-foreground/10">
        <Image
          src="/images/brand-logo.png"
          alt="CreatorBay logo"
          fill
          className="object-cover"
        />
      </div>
      <span className="font-heading text-[1.35rem] leading-none tracking-[-0.02em]">
        CreatorBay
      </span>
    </Link>
  )
}

