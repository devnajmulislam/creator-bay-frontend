"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import type { StudioDetail } from "@/types/studio";
import { useSession } from "@/lib/auth-client";
import { createBooking } from "@/services/booking-service";
import { Spinner } from "../ui/spinner";

const durationOptions = [2, 3, 4, 6, 8] as const;

interface BookingDialogProps {
  studio: StudioDetail;
}

export function BookingDialog({ studio }: BookingDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(4);
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, isPending } = useSession();

  const subtotal = studio.pricePerHour * duration;
  const total = subtotal + studio.securityDeposit;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!date || !startTime) {
      setError("Choose a date and start time to continue.");
      return;
    }

    if (!session?.user) {
      const redirectPath = pathname || "/studios";

      setOpen(false);
      toast.info("Please log in to continue", {
        description: "You will return to this studio after logging in.",
      });
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
      return;
    }

    const studioBookingData = {
      studioId: studio.id,
      studioName: studio.name,
      studioLocation: studio.location,
      date,
      startTime,
      duration,
      guests,
      subtotal,
      securityDeposit: studio.securityDeposit,
      total,
      name: session.user.name,
      email: session.user.email,
      userEmail: session.user.email,
      photo: session.user.image ?? undefined,
      status: "Pending",
    };

    setIsSubmitting(true);
    setError("");

    try {
      await createBooking(studioBookingData);

      setOpen(false)
      toast.success("Booking request sent", {
        description: `${studio.name} on ${date} at ${startTime}. Status: Pending host approval.`,
      })
      router.push("/my-bookings")
    } catch (submitError: unknown) {
      console.error("Failed to create booking:", submitError)
      const errorMessage =
        submitError instanceof Error
          ? submitError.message
          : "Could not send your booking request. Please try again."
      setError(errorMessage)
      toast.error("Could not send booking request", {
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setError("");
        }
      }}
    >
      <DialogTrigger render={<Button size="lg" className="h-11 w-full" />}>
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
          {/* LOGGED IN user data */}
          <div className="grid gap-2">
            <Label htmlFor="booking-author">Author</Label>
            <Input
              id="booking-author"
              type="text"
              value={session?.user?.name}
              readOnly
              className="h-10"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="booking-email">Author Email</Label>
            <Input
              id="booking-email"
              type="email"
              value={session?.user?.email}
              readOnly
              className="h-10"
            />
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Your reservation is saved as Pending until the host confirms it.
            No payment is taken now.
          </p>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending request..." : "Request booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
