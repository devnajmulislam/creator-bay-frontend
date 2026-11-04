"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  HeartIcon,
  LayoutDashboardIcon,
  ListIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";

import { useAuth } from "@/components/auth/auth-provider";
import { Brand } from "@/components/layout/brand";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { Container } from "@/components/shared/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { publicNavigation } from "@/lib/constants";

function isActive(pathname: string, href: string, activeHash = "") {
  if (href === "/") {
    return pathname === "/";
  }

  const [basePath, hash] = href.split("#");

  if (hash) {
    return pathname === basePath && activeHash === `#${hash}`;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

const mobileAccountLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "My listings", href: "/my-listings", icon: ListIcon },
  { label: "My bookings", href: "/my-bookings", icon: CalendarDaysIcon },
  { label: "Saved studios", href: "/saved-studios", icon: HeartIcon },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isReady, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    function syncHash() {
      setActiveHash(window.location.hash);
    }

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  function closeMobile() {
    setMobileOpen(false);
  }

  async function handleSignOut() {
    await signOut();
    closeMobile();
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        {/* nav left site */}
        <Brand />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {publicNavigation.map((item) => {
            const active = isActive(pathname, item.href, activeHash);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active &&
                    "font-medium text-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle className="hidden sm:inline-flex" />

          {!isReady ? (
            <div
              className="hidden h-9 w-24 animate-pulse rounded-lg bg-muted sm:block"
              aria-hidden
            />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Create account
              </Link>
            </div>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm gap-0 p-0">
              <SheetHeader className="border-b border-border px-5 py-4 pr-14">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse CreatorBay and manage your account.
                </SheetDescription>
                <Brand />
              </SheetHeader>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3">
                <nav aria-label="Mobile navigation" className="grid gap-0.5">
                  {publicNavigation.map((item) => {
                    const active = isActive(pathname, item.href, activeHash);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          active && "bg-muted text-foreground",
                        )}
                      >
                        {item.label}
                        <ArrowUpRightIcon className="size-4 text-muted-foreground/70" />
                      </Link>
                    );
                  })}
                </nav>

                <Separator className="my-4" />

                {!isReady ? (
                  <div className="space-y-2 px-3 py-2" aria-hidden>
                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-40 animate-pulse rounded bg-muted" />
                  </div>
                ) : user ? (
                  <div className="grid gap-0.5">
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-medium">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {mobileAccountLinks.map((item) => {
                      const active = isActive(pathname, item.href, activeHash);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobile}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                            active && "bg-muted font-medium text-foreground",
                          )}
                        >
                          <item.icon className="size-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-1 justify-start gap-2.5 px-3 text-muted-foreground hover:text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOutIcon />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-2 px-3 py-2">
                    <Link
                      href="/login"
                      onClick={closeMobile}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={closeMobile}
                      className={buttonVariants()}
                    >
                      Create account
                    </Link>
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 px-3 pt-6 pb-2">
                  <Link
                    href="/add-studio"
                    onClick={closeMobile}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    <PlusIcon className="size-4" />
                    List your studio
                  </Link>
                  <ThemeToggle showLabel />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
