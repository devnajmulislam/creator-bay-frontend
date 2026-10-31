import { cn } from "cn"
import { useState } from "react"
import { toast } from "sonner"

import { BookingDialog } from "@/components/bookings/booking-dialog"
import { Button } from "@/components/ui/button"

interface BookingCTAProps {
  studio: import("@/types/studio").StudioDetail
}

export function BookingCTA({ studio }: BookingCTAProps) {
  return <BookingDialog studio={studio} />
}