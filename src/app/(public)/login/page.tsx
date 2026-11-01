"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { Container, Section } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";

function getRedirectTarget() {
  if (typeof window === "undefined") return "/";
  const target = new URLSearchParams(window.location.search).get("redirect");
  if (!target || !target.startsWith("/") || target.startsWith("//")) return "/";
  return target;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn.email({ email, password });

    setLoading(false);

    if (authError) {
      const message =
        authError.message || "Unable to log in. Please check your credentials.";
      setError(message);
      toast.error("Login failed", { description: message });
      return;
    }

    toast.success("Logged in successfully!");
    router.push(getRedirectTarget());
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError("");
    setGoogleLoading(true);

    const { error: authError } = await signIn.social({
      provider: "google",
      callbackURL: getRedirectTarget(),
    });

    setGoogleLoading(false);

    if (authError) {
      const message =
        authError.message || "Google sign in failed. Please try again.";
      setError(message);
      toast.error("Login failed", { description: message });
    }
  }

  return (
    <Section className="flex min-h-[80vh] items-center justify-center">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="eyebrow text-primary">Welcome back</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-2">
              Log in to CreatorBay
            </h1>
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
                  autoComplete="email"
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Link
              href={"#"}
              className="block text-right text-sm text-muted-foreground hover:underline"
            >
              Forgot Password?
            </Link>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
              <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Create account
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <small>Or</small>
          </p>
          <Button
            type="button"
            variant={"outline"}
            className="mt-2 w-full cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
