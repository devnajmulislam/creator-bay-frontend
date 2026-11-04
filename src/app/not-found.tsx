import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Container, Section } from "@/components/shared/container"
import { buttonVariants } from "@/components/ui/button"

function StudioIllustration() {
  return (
    <svg
      viewBox="0 0 520 320"
      role="img"
      aria-label="Illustration of an empty photo studio with a camera and lighting"
      className="h-auto w-full max-w-md"
    >
      <rect
        x="28"
        y="38"
        width="464"
        height="244"
        rx="18"
        className="fill-muted stroke-border"
        strokeWidth="2"
      />
      <path
        d="M96 234c0-54 38-98 85-98s85 44 85 98"
        className="fill-primary/10"
      />
      <rect x="88" y="86" width="10" height="148" rx="5" className="fill-border" />
      <rect x="264" y="86" width="10" height="148" rx="5" className="fill-border" />
      <rect x="74" y="74" width="214" height="18" rx="9" className="fill-border" />
      <circle cx="181" cy="120" r="15" className="fill-primary/20 stroke-primary/40" strokeWidth="2" />
      <path d="M181 145v54" className="stroke-primary/40" strokeWidth="4" strokeLinecap="round" />
      <path d="M181 160l-30 20M181 160l30 20" className="stroke-primary/40" strokeWidth="4" strokeLinecap="round" />
      <rect x="322" y="170" width="120" height="78" rx="12" className="fill-card stroke-border" strokeWidth="3" />
      <circle cx="382" cy="209" r="25" className="fill-muted stroke-primary/40" strokeWidth="4" />
      <circle cx="382" cy="209" r="11" className="fill-primary/20" />
      <rect x="342" y="152" width="28" height="20" rx="5" className="fill-border" />
      <path d="M442 170l26-18v96l-26-18" className="fill-muted stroke-border" strokeWidth="3" />
      <path d="M310 112l28-22M470 112l-28-22" className="stroke-primary/30" strokeWidth="3" strokeLinecap="round" />
      <path d="M326 96c22 8 36 24 42 44M454 96c-22 8-36 24-42 44" className="stroke-primary/20" strokeWidth="2" strokeLinecap="round" />
      <circle cx="108" cy="252" r="4" className="fill-primary/40" />
      <circle cx="128" cy="252" r="4" className="fill-primary/30" />
      <circle cx="148" cy="252" r="4" className="fill-primary/20" />
    </svg>
  )
}

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Container className="flex max-w-lg flex-col items-center">
        <StudioIllustration />
        <p className="eyebrow mt-6 text-primary">404 Error</p>
        <h1 className="display-xl mt-3">Page not found</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          The studio or page you are looking for might have been moved, removed,
          or never existed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants()}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to home
          </Link>
          <Link
            href="/studios"
            className={buttonVariants({ variant: "outline" })}
          >
            Explore studios
          </Link>
        </div>
      </Container>
    </Section>
  )
}
