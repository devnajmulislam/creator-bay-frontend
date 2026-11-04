"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronDownIcon,
  SearchXIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

import { StudioCard } from "@/components/studios/studio-card"
import { StudioCardSkeleton } from "@/components/studios/studio-card-skeleton"
import { StudioFilterPanel } from "@/components/studios/studio-filter-panel"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  getAllStudios,
  getAllStudiosAsync,
  getStudioCategoryOptions,
} from "@/services/studio-service"
import type {
  Studio,
  StudioCategorySlug,
  StudioSortOption,
} from "@/types/studio"

const PAGE_SIZE = 6

const CATEGORIES = getStudioCategoryOptions()
const VALID_CATEGORIES = new Set(CATEGORIES.map((category) => category.slug))

const sortOptions: { value: StudioSortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating-desc", label: "Rating: high to low" },
]

function parseCategoryParam(value: string | null): StudioCategorySlug[] {
  if (!value) {
    return []
  }

  return Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter((item): item is StudioCategorySlug =>
          VALID_CATEGORIES.has(item as StudioCategorySlug),
        ),
    ),
  )
}

function sortStudios(studios: Studio[], sort: StudioSortOption) {
  const results = [...studios]

  switch (sort) {
    case "price-asc":
      return results.sort(
        (a, b) => a.pricePerHour - b.pricePerHour || a.name.localeCompare(b.name),
      )
    case "price-desc":
      return results.sort(
        (a, b) => b.pricePerHour - a.pricePerHour || a.name.localeCompare(b.name),
      )
    case "rating-desc":
      return results.sort(
        (a, b) =>
          b.rating - a.rating ||
          b.reviewCount - a.reviewCount ||
          a.name.localeCompare(b.name),
      )
    default:
      return results.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          b.rating - a.rating ||
          b.reviewCount - a.reviewCount ||
          a.pricePerHour - b.pricePerHour,
      )
  }
}

function StudioResultsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading studios"
      className="mt-6 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: PAGE_SIZE }, (_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading studios</span>
    </div>
  )
}

export function StudioExplorer() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const defaultStudios = getAllStudios()
  const defaultPrices = defaultStudios.map((s) => s.pricePerHour)
  const defaultMin = Math.floor(Math.min(...defaultPrices) / 10) * 10
  const defaultMax = Math.ceil(Math.max(...defaultPrices) / 10) * 10

  const [studios, setStudios] = useState<Studio[]>(defaultStudios)
  const [isLoading, setIsLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([defaultMin, defaultMax])
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState<StudioSortOption>("recommended")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    async function loadStudios() {
      try {
        const studios = await getAllStudiosAsync()
        setStudios(studios)

        if (studios.length > 0) {
          const prices = studios.map((studio) => studio.pricePerHour)
          const newMin = Math.floor(Math.min(...prices) / 10) * 10
          const newMax = Math.ceil(Math.max(...prices) / 10) * 10
          setPriceRange([newMin, newMax])
        }
      } catch (err) {
        console.warn("Could not fetch studios, using default", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadStudios()
  }, [])

  const locations = useMemo(() => {
    return Array.from(new Set(studios.map((studio) => studio.location))).sort((a, b) =>
      a.localeCompare(b),
    )
  }, [studios])

  const priceBounds = useMemo(() => {
    if (studios.length === 0) return { min: 50, max: 500 }
    const prices = studios.map((studio) => studio.pricePerHour)
    return {
      min: Math.floor(Math.min(...prices) / 10) * 10,
      max: Math.ceil(Math.max(...prices) / 10) * 10,
    }
  }, [studios])

  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce(
      (counts, category) => {
        counts[category.slug] = studios.filter(
          (studio) => studio.categorySlug === category.slug,
        ).length

        return counts
      },
      {} as Record<StudioCategorySlug, number>,
    )
  }, [studios])

  const categoryParam = searchParams.get("category")
  const selectedCategories = useMemo(
    () => parseCategoryParam(categoryParam),
    [categoryParam],
  )

  const filteredStudios = useMemo(() => {
    const term = search.trim().toLowerCase()
    const categorySet = new Set(selectedCategories)

    return studios.filter((studio) => {
      const matchesSearch =
        !term ||
        studio.name.toLowerCase().includes(term) ||
        studio.location.toLowerCase().includes(term)
      const matchesCategory =
        categorySet.size === 0 || categorySet.has(studio.categorySlug)
      const matchesLocation = location === "all" || studio.location === location
      const matchesPrice =
        studio.pricePerHour >= priceRange[0] &&
        studio.pricePerHour <= priceRange[1]
      const matchesRating = studio.rating >= minRating

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesPrice &&
        matchesRating
      )
    })
  }, [studios, search, selectedCategories, location, priceRange, minRating])

  const sortedStudios = useMemo(
    () => sortStudios(filteredStudios, sort),
    [filteredStudios, sort],
  )

  const visibleStudios = sortedStudios.slice(0, visibleCount)
  const remainingCount = sortedStudios.length - visibleStudios.length
  const hasActiveFilters =
    Boolean(search.trim()) ||
    selectedCategories.length > 0 ||
    location !== "all" ||
    priceRange[0] !== priceBounds.min ||
    priceRange[1] !== priceBounds.max ||
    minRating > 0

  function updateCategoryParam(nextCategories: StudioCategorySlug[]) {
    const params = new URLSearchParams(searchParams.toString())

    if (nextCategories.length > 0) {
      params.set("category", nextCategories.join(","))
    } else {
      params.delete("category")
    }

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }

  function handleToggleCategory(category: StudioCategorySlug) {
    const next = new Set(selectedCategories)

    if (next.has(category)) {
      next.delete(category)
    } else {
      next.add(category)
    }

    updateCategoryParam(Array.from(next))
    setVisibleCount(PAGE_SIZE)
  }

  function handleClearFilters() {
    setSearch("")
    setLocation("all")
    setPriceRange([priceBounds.min, priceBounds.max])
    setMinRating(0)
    setSort("recommended")
    setVisibleCount(PAGE_SIZE)
    updateCategoryParam([])
  }

  return (
    <div>
      <StudioFilterPanel
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setVisibleCount(PAGE_SIZE)
        }}
        categories={CATEGORIES}
        categoryCounts={categoryCounts}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        locations={locations}
        location={location}
        onLocationChange={(value) => {
          setLocation(value)
          setVisibleCount(PAGE_SIZE)
        }}
        priceRange={priceRange}
        priceBounds={priceBounds}
        onPriceRangeChange={(value) => {
          setPriceRange(value)
          setVisibleCount(PAGE_SIZE)
        }}
        minRating={minRating}
        onMinRatingChange={(value) => {
          setMinRating(value)
          setVisibleCount(PAGE_SIZE)
        }}
        onClear={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="mt-8 flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow flex items-center gap-2.5 text-primary">
            <SlidersHorizontalIcon className="size-3.5" />
            The directory
          </p>
          <p
            aria-live="polite"
            className="mt-2 text-sm text-muted-foreground"
          >
            {isLoading
              ? "Loading spaces…"
              : `${sortedStudios.length} ${
                  sortedStudios.length === 1 ? "space" : "spaces"
                } available`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="studio-sort"
            className="text-xs font-medium whitespace-nowrap text-muted-foreground"
          >
            Sort by
          </label>
          <NativeSelect
            id="studio-sort"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as StudioSortOption)
              setVisibleCount(PAGE_SIZE)
            }}
            className="w-full sm:w-44 [&_select]:h-9"
          >
            {sortOptions.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div aria-busy={isLoading}>
        {isLoading ? (
          <StudioResultsSkeleton />
        ) : sortedStudios.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon={SearchXIcon}
              title="No studios match this search"
              description="Try a different studio, neighborhood, category, or price range. Clearing the filters will bring the full directory back."
              action={
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear all filters
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleStudios.map((studio) => (
                <StudioCard key={studio.id} studio={studio} />
              ))}
            </div>

            {remainingCount > 0 ? (
              <div className="mt-10 flex flex-col items-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    setVisibleCount((current) => current + PAGE_SIZE)
                  }
                >
                  Load {Math.min(remainingCount, PAGE_SIZE)} more
                  <ChevronDownIcon />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Showing {visibleStudios.length} of {sortedStudios.length}{" "}
                  spaces
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
