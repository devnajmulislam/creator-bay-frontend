"use client"

import { DownloadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { generateBookingInvoice } from "@/lib/pdf-invoice"
import type { Booking } from "@/types/booking"

interface DownloadInvoiceButtonProps {
  booking: Booking
}

export function DownloadInvoiceButton({ booking }: DownloadInvoiceButtonProps) {
  async function handleDownload() {
    try {
      await generateBookingInvoice(booking)
      toast.success("Invoice downloaded successfully")
    } catch (error) {
      console.error("Failed to generate invoice:", error)
      toast.error("Could not download invoice")
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="gap-2"
    >
      <DownloadIcon className="size-4" />
      Download Invoice
    </Button>
  )
}
