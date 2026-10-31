import { cn } from "cn"

interface HotelDetailsProps {
  studio: {
    pricePerHour: number
    rating: number
    reviewCount: number
    securityDeposit: number
    capacity: number
    location: string
  }
}

interface PriceDisplayProps {
  pricePerHour: number
  currency?: string
}

export function HotelDetails({ studio }: HotelDetailsProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">/${studio.pricePerHour}/hr</span>
          <span className="text-xs text-muted-foreground">Hourly rate</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">Security deposit</span>
          <span className="font-medium text-primary">${studio.securityDeposit}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border/70">
        <span className="text-muted-foreground">
          Up to {studio.capacity} guests
        </span>
      </div>
    </div>
  )
}