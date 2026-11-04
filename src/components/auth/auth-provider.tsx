"use client"

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react"

import { authClient, useSession } from "@/lib/auth-client"
import type { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  isReady: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, refetch } = useSession()
  const sessionUser = data?.user
  const sessionUserId = sessionUser?.id

  const user: User | null = sessionUser
    ? {
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        avatar: sessionUser.image ?? undefined,
        role: "host",
      }
    : null

  useEffect(() => {
    if (!sessionUserId) return

    fetch("/api/auth-jwt", { credentials: "include" }).catch(() => undefined)
  }, [sessionUserId])

  async function signOut() {
    await authClient.signOut()
    await fetch("/api/auth-jwt", {
      method: "DELETE",
      credentials: "include",
    }).catch(() => undefined)
    await refetch()
  }

  return (
    <AuthContext.Provider value={{ user, isReady: !isPending, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
