import Image from "next/image"
import Link from "next/link"
import { UsersIcon } from "lucide-react"
import { cn } from "cn"

interface HostInfoProps {
  host: {
    name: string
    initials: string
    role: string
    bio: string
    responseTime: string
    hostedSince: number
    listingCount: number
    verified: boolean
  }
}

export function HostInfo({ host }: HostInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Image
          src="/images/placeholder-host.jpg"
          alt={host.name}
          className="size-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-foreground">{host.name}</h3>
          <p className="text-sm text-muted-foreground">{host.role}</p>
          <p className="text-xs text-muted-foreground">
            Member since {host.hostedSince}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{host.bio}</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="size-4 text-muted-foreground" />
          <span>{host.listingCount} listings</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="size-4 text-primary"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0-2c-6.637 0-12 5.363-12 12s5.363 12 12 12S24 18.637 24 12 18.637 2 12 2Zm0-2c-1.657 0-3.063.665-4.234 1.768l-1.975 1.175C10.761 17.52 9.5 19 7.99 19S5.239 17.52 3.766 16.338l-1.129.672c-.578.338-1.047.675-1.43 1.05L3 21l1.665-1.087c.383-.276.76-.613 1.028-1.05l1.129-.672C6.937 15.665 8.344 15 9.734 15S13 14.335 13 13s-6.337-1-6.337-3.338l1.129-.672c.383-.276.76-.613 1.028-1.05l1.129-.672c1.39-.823 2.8 -.158 4.234-1.768l1.975-1.175c.971-.578 1.797-1.392 2.463-2.232l3.124-1.848ZM12 5.333a.586.586 0 0 1 .262.076.586.586 0 0 0 .076.262l.076.262a.586.586 0 0 0 .076.262.586.586 0 0 1-.076.262l-.076.262a.586.586 0 0 0-.262.076.586.586 0 0 0-.076.262l-.076.262A.586.586 0 0 1 12 5.333Zm0 4.667a.586.586 0 0 0 .262.076.586.586 0 0 0 .076.262l.076.262.076-.262a.586.586 0 0 1 .262.076.586.586 0 0 0 .076-.262l.076-.262.076.262a.586.586 0 0 0 .076.262.586.586 0 0 1-.076.262l-.076.262a.586.586 0 0 0-.262.076.586.586 0 0 0-.076-.262l-.076-.262Z"
            />
          </svg>
          <span>{host.listingCount} listings</span>
        </div>
      </div>
    </div>
  )
}