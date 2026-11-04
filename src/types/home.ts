export interface HomeCtaLink {
  label: string
  href: string
}

export interface HeroSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  align: "left" | "right"
  note: string
  primaryCta: HomeCtaLink
  secondaryCta: HomeCtaLink
}

export type BookingStepIcon =
  | "search"
  | "calendar"
  | "check"
  | "sparkles"

export interface BookingStep {
  number: string
  title: string
  description: string
  icon: BookingStepIcon
}

export type HostGuaranteeIcon = "badge" | "shield" | "support"

export interface HostGuarantee {
  title: string
  description: string
  icon: HostGuaranteeIcon
}

export type AboutValueIcon = "sparkles" | "shield" | "users"

export interface AboutValue {
  title: string
  description: string
  icon: AboutValueIcon
}

export interface HomeCtaContent {
  eyebrow: string
  title: string
  description: string
  note: string
  image: string
  imageAlt: string
  primaryCta: HomeCtaLink
  secondaryCta: HomeCtaLink
}
