"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import { getMockUser, setMockUser } from "@/services/auth-service"
import type { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  isReady: boolean
  signIn: (email: string, name?: string) => void
  signOut: () => void
  signUp: (email: string, name: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getMockUser())
  const [isReady] = useState(true)

  function signIn(email: string, name = "Creator User") {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      role: "host",
    }
    setUser(newUser)
    setMockUser(newUser)
  }

  function signUp(email: string, name: string) {
    signIn(email, name)
  }

  function signOut() {
    setUser(null)
    setMockUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isReady, signIn, signOut, signUp }}>
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
