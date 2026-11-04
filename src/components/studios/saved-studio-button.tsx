"use client"

import { useMemo, useState } from "react"
import { HeartIcon } from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"

import { useSession } from "@/lib/auth-client"
import {
  isStudioSaved,
  toggleSavedStudio,
} from "@/services/wishlist-service"

interface SavedStudioButtonProps {
  studioId: string
  studioName: string
  className?: string
}

export function SavedStudioButton({
  studioId,
  studioName,
  className,
}: SavedStudioButtonProps) {
  const { data: session } = useSession()
  const user = session?.user
  const [refreshKey, setRefreshKey] = useState(0)

  const saved = useMemo(() => {
    void refreshKey
    if (!user?.email) return false
    return isStudioSaved(user.email, studioId)
  }, [user?.email, studioId, refreshKey])

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (!user?.email) {
      toast.error("Log in to save studios", {
        description: "Your wishlist is linked to your account.",
      })
      return
    }

    const nextSaved = toggleSavedStudio(user.email, studioId)
    setRefreshKey((current) => current + 1)
    toast.success(
      nextSaved
        ? `${studioName} saved to your wishlist`
        : `${studioName} removed from your wishlist`,
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? `Remove ${studioName} from wishlist` : `Save ${studioName} to wishlist`}
      aria-pressed={saved}
      className={cn(
        "pointer-events-auto relative z-20 inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/90 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
        saved && "border-primary/30 text-primary",
        className,
      )}
    >
      <HeartIcon className={cn("size-4", saved && "fill-current")} />
    </button>
  )
}
