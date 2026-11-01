"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import type { StudioDetail } from "@/types/studio"

const durationOptions = [2, 3, 4, 6, 8] as const

interface BookingDialogProps {
  studio: StudioDetail
}

export function BookingDialog({ studio }: BookingDialogProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState(4)
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState("")

  const subtotal = studio.pricePerHour * duration
  const total = subtotal + studio.securityDeposit

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!date || !startTime) {
      setError("Choose a date and start time to continue.")
      return
    }

const studioBookingData = {
      // studioId: studio.id,
      studioName: studio.name,
      date,
      startTime,
      duration,
      guests,
      subtotal,
      securityDeposit: studio.securityDeposit,
      total,
    }


 const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/my-bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioBookingData),
      },
    );

    const data = await result.json();

    console.log(data)

    // console.log(studioBookingData, "bookingData")



    setError("")
    setOpen(false)
    toast.success("Booking draft ready", {
      description: `A demo request for ${studio.name} on ${date} at ${startTime}. No payment was taken.`,
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) {
          setError("")
        }
      }}
    >
      <DialogTrigger
        render={<Button size="lg" className="h-11 w-full" />}
      >
        <CalendarIcon />
        Book Workspace Now
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <p className="eyebrow text-primary">Book this space</p>
          <DialogTitle className="mt-1 font-heading text-2xl leading-tight">
            {studio.name}
          </DialogTitle>
          <DialogDescription>
            {studio.category} · {studio.location} · ${studio.pricePerHour}/hr
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="booking-date">Date</Label>
              <Input
                id="booking-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="h-10"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="booking-start-time">Start time</Label>
              <Input
                id="booking-start-time"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="h-10"
                required
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="booking-duration">Duration</Label>
              <NativeSelect
                id="booking-duration"
                value={duration.toString()}
                onChange={(event) => setDuration(Number(event.target.value))}
                className="w-full [&_select]:h-10"
              >
                {durationOptions.map((hours) => (
                  <NativeSelectOption key={hours} value={hours.toString()}>
                    {hours} hours
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="booking-guests">Guests</Label>
              <Input
                id="booking-guests"
                type="number"
                min={1}
                max={studio.capacity}
                value={guests}
                onChange={(event) => setGuests(Number(event.target.value))}
                className="h-10"
                required
              />
            </div>
          </div>

          <div className="rounded-lg border border-border/80 bg-muted/35 p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">
                Studio time ({duration} hours)
              </span>
              <span className="font-medium tabular-nums">${subtotal}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">
                Refundable security deposit
              </span>
              <span className="font-medium tabular-nums">
                ${studio.securityDeposit}
              </span>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium">Estimated total</span>
              <span className="font-heading text-2xl leading-none tabular-nums">
                ${total}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              The deposit is returned after the booking, subject to the
              studio&apos;s terms.
            </p>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <p className="text-xs leading-relaxed text-muted-foreground">
            This is a frontend demo. No payment will be taken and no real
            reservation is created.
          </p>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Request booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
