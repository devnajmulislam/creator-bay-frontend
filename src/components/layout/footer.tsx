import Link from "next/link"

import { Brand } from "@/components/layout/brand"
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
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Peer-to-peer creative spaces, without the friction.</p>
        </div>
      </Container>

      <div aria-hidden className="overflow-hidden">
        <p className="page-container pb-3 font-heading text-[clamp(4.5rem,16vw,13rem)] leading-[0.75] tracking-[-0.05em] whitespace-nowrap text-foreground/[0.04] select-none">
          CreatorBay
        </p>
      </div>
    </footer>
  )
}
