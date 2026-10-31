import Link from "next/link"
import { SearchXIcon } from "lucide-react"

import { Container, Section } from "@/components/shared/container"
import { EmptyState } from "@/components/shared/empty-state"
import { buttonVariants } from "@/components/ui/button"

export default function StudioNotFound() {
  return (
    <Section spacing="compact">
      <Container size="narrow">
        <EmptyState
          icon={SearchXIcon}
          title="Studio not found"
          description="This studio may have been removed, renamed, or the link might be incorrect. Browse the directory to find another space."
          action={
            <Link href="/studios" className={buttonVariants()}>
              Browse all studios
            </Link>
          }
        />
      </Container>
    </Section>
  )
}
