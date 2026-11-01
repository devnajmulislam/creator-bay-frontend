"use client"

import { useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterForm() {
  const [email, setEmail] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim()

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      toast.error("Enter a valid email address")
      return
    }

    toast.success("You're subscribed", {
      description: "We'll send new studio openings and host updates.",
    })
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-sm">
      <label
        htmlFor="newsletter-email"
        className="eyebrow text-muted-foreground"
      >
        Studio dispatch
      </label>
      <div className="mt-3 flex items-center gap-2">
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-10"
          required
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Subscribe to the newsletter"
        >
          <ArrowRightIcon />
        </Button>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        New spaces, host stories, and booking tips. No spam.
      </p>
    </form>
  )
}
