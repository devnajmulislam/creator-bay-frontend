const STORAGE_KEY = "creatorbay_saved_studios"

type SavedStudioMap = Record<string, string[]>

function readAll(): SavedStudioMap {
  if (typeof window === "undefined") return {}

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return {}

    const parsed = JSON.parse(stored)
    return parsed && typeof parsed === "object" ? parsed : {}
  } catch {
    return {}
  }
}

function writeAll(value: SavedStudioMap) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

export function getSavedStudioIds(email: string): string[] {
  if (!email) return []
  return readAll()[email.toLowerCase()] ?? []
}

export function isStudioSaved(email: string, studioId: string): boolean {
  return getSavedStudioIds(email).includes(studioId)
}

export function toggleSavedStudio(email: string, studioId: string): boolean {
  if (!email) return false

  const key = email.toLowerCase()
  const all = readAll()
  const current = all[key] ?? []
  const isSaved = current.includes(studioId)
  const next = isSaved
    ? current.filter((id) => id !== studioId)
    : [...current, studioId]

  all[key] = next
  writeAll(all)

  return !isSaved
}
