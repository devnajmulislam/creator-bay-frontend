import Link from "next/link"

import { Brand } from "@/components/layout/brand"
import { NewsletterForm } from "@/components/layout/newsletter-form"
import { SocialLinks } from "@/components/layout/social-links"
import { Container } from "@/components/shared/container"
import { Separator } from "@/components/ui/separator"
import { footerNavigation, siteConfig } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/25">
      <Container className="pt-14 pb-10 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <p className="eyebrow mt-6 text-muted-foreground">
              Independent spaces. Exceptional work.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNavigation.map((group) => (
              <div key={group.title}>
                <p className="eyebrow text-foreground">{group.title}</p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <p className="flex flex-wrap items-center gap-x-2">
              <Link
                href="#"
                className="transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
              <span aria-hidden>·</span>
              <Link
                href="#"
                className="transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  )
}
