import {
  aboutValues,
  bookingSteps,
  finalCta,
  heroSlides,
  hostGuarantees,
} from "@/data/mock-home"
import type {
  AboutValue,
  BookingStep,
  HeroSlide,
  HomeCtaContent,
  HostGuarantee,
} from "@/types/home"

export function getHeroSlides(): HeroSlide[] {
  return heroSlides
}

export function getBookingSteps(): BookingStep[] {
  return bookingSteps
}

export function getHostGuarantees(): HostGuarantee[] {
  return hostGuarantees
}

export function getAboutValues(): AboutValue[] {
  return aboutValues
}

export function getFinalCta(): HomeCtaContent {
  return finalCta
}
