import type { StudioCategorySlug } from "@/types/studio"

export function getStudioCategorySlug(
  categoryName?: string | null,
): StudioCategorySlug {
  const name = (categoryName ?? "").toLowerCase()

  if (name.includes("film") || name.includes("stage")) {
    return "film"
  }

  if (name.includes("podcast") || name.includes("audio")) {
    return "podcast"
  }

  if (name.includes("music")) {
    return "music"
  }

  if (
    name.includes("workshop") ||
    name.includes("art") ||
    name.includes("creative")
  ) {
    return "creative"
  }

  if (name.includes("event") || name.includes("venue")) {
    return "events"
  }

  return "photography"
}
