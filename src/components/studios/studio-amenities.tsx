import { CheckIcon } from "lucide-react"

interface StudioAmenitiesProps {
  amenities: string[]
}

export function StudioAmenities({ amenities }: StudioAmenitiesProps) {
  return (
    <section
      aria-labelledby="amenities-heading"
      className="scroll-mt-24 border-t border-border/70 pt-9"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-primary">Included</p>
          <h2
            id="amenities-heading"
            className="mt-3 font-heading text-3xl leading-none"
          >
            Amenities
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {amenities.length} included with your booking
        </p>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <li
            key={amenity}
            className="flex items-center gap-3 rounded-lg border border-border/70 bg-card px-3.5 py-3 text-sm"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <CheckIcon className="size-3.5" />
            </span>
            {amenity}
          </li>
        ))}
      </ul>
    </section>
  )
}
