"use client"

import { useState } from "react"
import { PlusIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

const DEFAULT_AMENITIES = [
  "High-speed Wi-Fi",
  "Professional Lighting",
  "Sound System",
  "Air Conditioning",
  "Cyclorama Wall",
  "Makeup Room",
  "Free Parking",
  "Green Screen",
  "Tripods & Stands",
  "Coffee & Refreshments",
]

interface AmenityPickerProps {
  value: string[]
  onChange: (amenities: string[]) => void
}

export function AmenityPicker({ value, onChange }: AmenityPickerProps) {
  const [customAmenity, setCustomAmenity] = useState("")

  const customAmenities = value.filter(
    (amenity) => !DEFAULT_AMENITIES.includes(amenity),
  )

  function toggleAmenity(amenity: string, checked: boolean) {
    if (checked) {
      onChange(value.includes(amenity) ? value : [...value, amenity])
      return
    }

    onChange(value.filter((item) => item !== amenity))
  }

  function addCustomAmenity() {
    const trimmed = customAmenity.trim()
    if (!trimmed || value.includes(trimmed)) return

    onChange([...value, trimmed])
    setCustomAmenity("")
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {DEFAULT_AMENITIES.map((amenity) => (
          <label
            key={amenity}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border/80 bg-background px-3 py-2.5 text-sm transition-colors hover:bg-muted/40"
          >
            <Checkbox
              checked={value.includes(amenity)}
              onCheckedChange={(checked) => toggleAmenity(amenity, checked)}
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      {customAmenities.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {customAmenities.map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {amenity}
              <button
                type="button"
                aria-label={`Remove ${amenity}`}
                onClick={() =>
                  onChange(value.filter((item) => item !== amenity))
                }
                className="rounded-full p-0.5 transition-colors hover:bg-primary/20"
              >
                <XIcon className="size-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex gap-2">
        <Input
          value={customAmenity}
          onChange={(event) => setCustomAmenity(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              addCustomAmenity()
            }
          }}
          placeholder="Add another amenity"
          className="h-10"
        />
        <Button
          type="button"
          variant="outline"
          onClick={addCustomAmenity}
          disabled={!customAmenity.trim()}
        >
          <PlusIcon className="size-4" />
          Add
        </Button>
      </div>
    </div>
  )
}
