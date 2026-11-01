"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  ImageIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Container, Section } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/auth-client";

function getRedirectTarget() {
  if (typeof window === "undefined") return "/";
  const target = new URLSearchParams(window.location.search).get("redirect");
  if (!target || !target.startsWith("/") || target.startsWith("//")) return "/";
  return target;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const passwordValid = hasUppercase && hasLowercase && hasMinLength;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!passwordValid) {
      const message =
        "Password must include an uppercase letter, a lowercase letter, and be at least 6 characters.";
      setError(message);
      toast.error("Invalid password", { description: message });
      return;
    }

    setLoading(true);

    const { error: authError } = await signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
    });

    setLoading(false);

    if (authError) {
      const message =
        authError.message || "Unable to create your account. Please try again.";
      setError(message);
      toast.error("Registration failed", { description: message });
      return;
    }

    toast.success("Account created successfully!", {
      description: "Please log in to continue.",
    });
    router.push("/login");
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
        authError.message || "Google sign up failed. Please try again.";
      setError(message);
      toast.error("Registration failed", { description: message });
    }
  }

  return (
    <Section className="flex min-h-[80vh] items-center justify-center">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="eyebrow text-primary">Join CreatorBay</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-2">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Book professional creative spaces or list your own studio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

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
              <Label htmlFor="photoUrl">Photo URL</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="photoUrl"
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="pl-9"
                  placeholder="https://example.com/photo.jpg"
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
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
              <ul className="mt-2 space-y-1 text-xs">
                <li className={hasMinLength ? "text-muted-foreground" : "text-destructive"}>
                  At least 6 characters
                </li>
                <li className={hasUppercase ? "text-muted-foreground" : "text-destructive"}>
                  At least one uppercase letter
                </li>
                <li className={hasLowercase ? "text-muted-foreground" : "text-destructive"}>
                  At least one lowercase letter
                </li>
              </ul>
            </div>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !passwordValid}
            >
              {loading ? "Creating account..." : "Create account"}
              <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Log in
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
