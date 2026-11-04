"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  HeartIcon,
  LayoutDashboardIcon,
  ListIcon,
  LogOutIcon,
  PlusIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";

import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const initial = user.name.trim().charAt(0).toUpperCase() || "C";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        openOnHover
        delay={100}
        closeDelay={200}
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Open account menu for ${user.name}`}
            className="relative size-9 rounded-full ring-offset-background transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        }
      >
        <Avatar className="size-9">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            {initial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href="/dashboard" />}
            aria-current={isActive("/dashboard") ? "page" : undefined}
            className={cn(
              isActive("/dashboard") && "bg-muted font-medium text-foreground",
            )}
          >
            <LayoutDashboardIcon className="mr-2 size-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href="/add-studio" />}
            aria-current={isActive("/add-studio") ? "page" : undefined}
            className={cn(
              isActive("/add-studio") && "bg-muted font-medium text-foreground",
            )}
          >
            <PlusIcon className="mr-2 size-4" />
            Add New Studio
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href="/my-listings" />}
            aria-current={isActive("/my-listings") ? "page" : undefined}
            className={cn(
              isActive("/my-listings") && "bg-muted font-medium text-foreground",
            )}
          >
            <ListIcon className="mr-2 size-4" />
            My Studio Listings
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href="/my-bookings" />}
            aria-current={isActive("/my-bookings") ? "page" : undefined}
            className={cn(
              isActive("/my-bookings") && "bg-muted font-medium text-foreground",
            )}
          >
            <CalendarDaysIcon className="mr-2 size-4" />
            My Bookings
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href="/saved-studios" />}
            aria-current={isActive("/saved-studios") ? "page" : undefined}
            className={cn(
              isActive("/saved-studios") &&
                "bg-muted font-medium text-foreground",
            )}
          >
            <HeartIcon className="mr-2 size-4" />
            Saved Studios
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleSignOut}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
