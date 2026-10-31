import type { User } from "@/types/user"

const MOCK_CURRENT_USER: User = {
  id: "user-1",
  name: "Elena Vance",
  email: "elena@creatorbay.mock",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  role: "host",
}

export function getMockUser(): User | null {
  if (typeof window === "undefined") return MOCK_CURRENT_USER
  const stored = localStorage.getItem("creatorbay_user")
  if (stored === null) {
    // Default to logged in for seamless demo/preview unless explicitly logged out
    return MOCK_CURRENT_USER
  }
  if (stored === "null") return null
  try {
    return JSON.parse(stored)
  } catch {
    return MOCK_CURRENT_USER
  }
}

export function setMockUser(user: User | null): void {
  if (typeof window === "undefined") return
  localStorage.setItem("creatorbay_user", JSON.stringify(user))
}
