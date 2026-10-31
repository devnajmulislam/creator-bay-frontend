import type { ReactNode } from "react"
import { cn } from "cn"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-2.5 text-primary">
          <span aria-hidden className="h-px w-6 bg-primary/60" />
          {eyebrow}
        </p>
        <h2 className="display-lg mt-4">{title}</h2>
        {description ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
