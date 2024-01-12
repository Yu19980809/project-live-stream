import Link from 'next/link'
import { User } from '@prisma/client'

import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'

interface ResultCardProps {
  data: {
    user: User
    name: string
    thumbnailUrl: string | null
    isLive: boolean
  }
}

export const ResultCard = ({
  data
}: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full h-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          username={data.user.username}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
        />

        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />

          <div className="flex flex-col text-sm overflow-hidden">
            <p className="font-semibold truncate hover:text-blue-500">
              {data.name}
            </p>

            <p className="text-muted-foreground">
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => (
  <div className="w-full h-full space-y-4">
    <ThumbnailSkeleton />

    <div className="flex gap-x-3">
      <UserAvatarSkeleton />

      <div className="flex flex-col gap-y-1">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
  </div>
)
