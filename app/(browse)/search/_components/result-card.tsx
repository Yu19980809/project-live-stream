import Link from 'next/link'
import { User } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'

import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import { VerifiedMark } from '@/components/verified-mark'

interface ResultCardProps {
  data: {
    user: User,
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
  }
}

export const ResultCard = ({
  data
}: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex space-x-4">
        <div className="relative w-[16rem] h-[9rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            username={data.user.username}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {data.user.username}
            </p>

            <VerifiedMark />
          </div>

          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true
            })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => (
  <div className="w-full h-full space-y-4">
    <div className="relatiive w-[16rem] h-[9rem]">
      <ThumbnailSkeleton />
    </div>

    <div className="space-y-2">
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-24 h-3" />
      <Skeleton className="w-12 h-3" />
    </div>
  </div>
)
