import type { ComponentProps } from "react"
import { cn } from "cn"

const containerSizes = {
  default: "max-w-[90rem]",
  narrow: "max-w-4xl",
  wide: "max-w-[100rem]",
} as const

const sectionSpacing = {
  default: "section-y",
  compact: "section-y-sm",
  spacious: "section-y-lg",
} as const

interface ContainerProps extends ComponentProps<"div"> {
  size?: keyof typeof containerSizes
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("page-container", containerSizes[size], className)}
      {...props}
    />
  )
}

interface SectionProps extends ComponentProps<"section"> {
  spacing?: keyof typeof sectionSpacing
}

export function Section({
  className,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionSpacing[spacing], className)} {...props} />
  )
}
