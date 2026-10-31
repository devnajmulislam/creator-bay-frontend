"use client"

import { useTheme } from "next-themes"
import { Toaster } from "sonner"

export function AppToaster() {
  const { resolvedTheme } = useTheme()
  const theme =
    resolvedTheme === "dark"
      ? "dark"
      : resolvedTheme === "light"
        ? "light"
        : "system"

  return (
    <Toaster
      theme={theme}
      position="bottom-right"
      closeButton
      richColors
      gap={10}
      offset={20}
      mobileOffset={16}
      toastOptions={{
        classNames: {
          toast: "font-sans",
          description: "text-muted-foreground",
        },
      }}
    />
  )
}
