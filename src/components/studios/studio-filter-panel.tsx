"use client"

import { SearchIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Slider } from "@/components/ui/slider"
import type {
  StudioCategory,
  StudioCategorySlug,
} from "@/types/studio"

const ratingOptions = [
  { value: 0, label: "Any rating" },
  { value: 4.5, label: "4.5 & up" },
  { value: 4.8, label: "4.8 & up" },
  { value: 4.9, label: "4.9 & up" },
] as const

interface StudioFilterPanelProps {
  search: string
  onSearchChange: (value: string) => void
  categories: StudioCategory[]
  categoryCounts: Record<StudioCategorySlug, number>
  selectedCategories: StudioCategorySlug[]
  onToggleCategory: (category: StudioCategorySlug) => void
  locations: string[]
  location: string
  onLocationChange: (value: string) => void
  priceRange: [number, number]
  priceBounds: { min: number; max: number }
  onPriceRangeChange: (value: [number, number]) => void
  minRating: number
  onMinRatingChange: (value: number) => void
  onClear: () => void
  hasActiveFilters: boolean
}

export function StudioFilterPanel({
  search,
  onSearchChange,
  categories,
  categoryCounts,
  selectedCategories,
  onToggleCategory,
  locations,
  location,
  onLocationChange,
  priceRange,
  priceBounds,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  onClear,
  hasActiveFilters,
}: StudioFilterPanelProps) {
  function handlePriceChange(next: number | readonly number[]) {
    const values = typeof next === "number" ? [next, next] : next

    onPriceRangeChange([
      values[0] ?? priceBounds.min,
      values[1] ?? values[0] ?? priceBounds.max,
    ])
  }

  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <Label
            htmlFor="studio-search"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Search
          </Label>
          <div className="relative mt-2">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="studio-search"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by studio or location"
              className="h-10 pr-9 pl-9 [&::-webkit-search-cancel-button]:hidden"
            />
            {search ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <XIcon className="size-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[22rem]">
          <div>
            <Label
              htmlFor="studio-location"
              className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
            >
              Location
            </Label>
            <NativeSelect
              id="studio-location"
              value={location}
              onChange={(event) => onLocationChange(event.target.value)}
              className="mt-2 w-full [&_select]:h-10"
            >
              <NativeSelectOption value="all">All locations</NativeSelectOption>
              {locations.map((option) => (
                <NativeSelectOption key={option} value={option}>
                  {option}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <div>
            <Label
              htmlFor="studio-rating"
              className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
            >
              Rating
            </Label>
            <NativeSelect
              id="studio-rating"
              value={minRating.toString()}
              onChange={(event) =>
                onMinRatingChange(Number(event.target.value))
              }
              className="mt-2 w-full [&_select]:h-10"
            >
              {ratingOptions.map((option) => (
                <NativeSelectOption
                  key={option.value}
                  value={option.value.toString()}
                >
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-border/70 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Category
          </p>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={onClear}
            disabled={!hasActiveFilters}
          >
            Clear filters
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => {
            const selected = selectedCategories.includes(category.slug)

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                aria-label={`${category.name}, ${categoryCounts[category.slug]} studios`}
                onClick={() => onToggleCategory(category.slug)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground/25 hover:bg-muted/60",
                )}
              >
                {category.name}
                <span
                  aria-hidden
                  className={cn(
                    "text-[10px] tabular-nums",
                    selected
                      ? "text-background/60"
                      : "text-muted-foreground",
                  )}
                >
                  {categoryCounts[category.slug]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-5 border-t border-border/70 pt-5">
        <div className="flex items-center justify-between gap-4">
          <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Hourly price
          </Label>
          <p className="text-sm font-medium tabular-nums">
            ${priceRange[0]} – ${priceRange[1]}
            <span className="font-normal text-muted-foreground">/hr</span>
          </p>
        </div>
        <Slider
          aria-label="Hourly price range"
          className="mt-4"
          min={priceBounds.min}
          max={priceBounds.max}
          step={5}
          minStepsBetweenValues={1}
          value={priceRange}
          onValueChange={handlePriceChange}
        />
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>${priceBounds.min}</span>
          <span>${priceBounds.max}</span>
        </div>
      </div>
    </div>
  )
}
