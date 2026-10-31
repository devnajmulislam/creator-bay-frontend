import {
  CalendarCheckIcon,
  CircleCheckIcon,
  ClockIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/home/section-heading"
import { Container, Section } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { getBookingSteps } from "@/services/home-service"
import type { BookingStepIcon } from "@/types/home"

const stepIcons: Record<BookingStepIcon, LucideIcon> = {
  search: SearchIcon,
  calendar: CalendarCheckIcon,
  check: CircleCheckIcon,
  sparkles: SparklesIcon,
}

export function BookingStepsSection() {
  const steps = getBookingSteps()

  return (
    <Section id="how-it-works" className="scroll-mt-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How booking works"
            title={
              <>
                From saved
                <br className="hidden sm:block" /> to booked.
              </>
            }
            description="Four clear steps between the idea and the room. No back-and-forth, no mystery fees."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = stepIcons[step.icon]

            return (
              <Reveal key={step.number} delay={index * 0.07}>
                <div className="flex h-full flex-col border-t border-border pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow text-primary">{step.number}</span>
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="mt-10 font-heading text-2xl leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-12 inline-flex items-center gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
            <ClockIcon className="size-3.5 text-primary" />
            Most booking requests are confirmed within the hour.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
