import Image from 'next/image'

import { UserAvatar } from '@/components/user-avatar'
import { LiveBadge } from '@/components/live-badge'
import { Skeleton } from '@/components/ui/skeleton'

interface ThumbnailProps {
  src: string | null
  username: string
  fallback: string
  isLive: boolean
}

export const Thumbnail = ({
  src,
  username,
  fallback,
  isLive
}: ThumbnailProps) => {
  let content

  if (!src) {
    content = (
      <div className="flex flex-col justify-center items-center gap-y-4 w-full h-full rounded-md bg-background transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
        <UserAvatar
          size="lg"
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    )
  } else {
    content = (
      <Image
        src={src}
        alt="Thumbnail"
        fill
        className="rounded-md object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
      />
    )
  }

  return (
    <div className="group relative rounded-md aspect-video cursor-pointer">
      <div className="absolute inset-0 flex justify-center items-center rounded-md bg-blue-600 transition-opacity opacity-0 group-hover:opacity-100" />
      
      {content}

      {isLive && src && (
        <div className="absolute top-2 left-2 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export const ThumbnailSkeleton = () => (
  <div className="group relative rounded-xl aspect-video cursor-pointer">
    <Skeleton className="w-full h-full" />
  </div>
)
