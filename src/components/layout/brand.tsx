import Link from "next/link"
import { ApertureIcon } from "lucide-react"
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
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-foreground text-background transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
        <ApertureIcon className="size-4" strokeWidth={1.75} />
      </span>
      <span className="font-heading text-[1.35rem] leading-none tracking-[-0.02em]">
        CreatorBay
      </span>
    </Link>
  )
}
