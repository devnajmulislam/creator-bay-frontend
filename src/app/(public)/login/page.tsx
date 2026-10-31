"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRightIcon, LockIcon, MailIcon } from "lucide-react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth/auth-provider"
import { Container, Section } from "@/components/shared/container"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("elena@creatorbay.mock")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      signIn(email, email.split("@")[0] || "Creator User")
      setLoading(false)
      toast.success("Logged in successfully!")
      router.push("/dashboard")
      router.refresh()
    }, 600)
  }

  return (
    <Section className="flex min-h-[80vh] items-center justify-center">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="eyebrow text-primary">Welcome back</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-2">Log in to CreatorBay</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Access your saved studios, bookings, and studio listings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
              <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
