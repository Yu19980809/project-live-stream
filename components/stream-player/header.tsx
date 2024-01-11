'use client'

import {
  useParticipants,
  useRemoteParticipant
} from '@livekit/components-react'
import { UserIcon } from 'lucide-react'

import { VerifiedMark } from '@/components/verified-mark'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'
import { Actions, ActionsSkeleton } from '@/components/stream-player/actions'

interface HeaderProps {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  imageUrl: string
  isFollowing: boolean
  name: string
}

export const Header = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name
}: HeaderProps) => {
  const participants = useParticipants()
  const participant = useRemoteParticipant(hostIdentity)

  const isLive = !!participant
  const participantCount = participants.length - 1

  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-y-4 lg:gap-y-0 px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />

        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="font-semibold text-lg">
              {hostName}
            </h2>

            <VerifiedMark />
          </div>

          <p className="font-semibold text-sm">
            {name}
          </p>

          {isLive ? (
            <div className="flex items-center gap-x-1 font-semibold text-xs text-rose-500">
              <UserIcon className="w-4 h-4" />

              <p>
                {participantCount} {participantCount === 1 ? 'Viewer' : 'Viewers'}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>

      <Actions
        hostIdentity={hostIdentity}
        isFollowing={isFollowing}
        isHost={isHost}
      />
    </div>
  )
}

export const HeaderSkeleton = () => (
  <div className="flex flex-col lg:flex-row justify-between items-start gap-y-4 lg:gap-y-0 px-4">
    <div className="flex items-center gap-x-3">
      <UserAvatarSkeleton size="lg" />

      <div className="space-y-2">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-24 h-6" />
      </div>
    </div>

    <ActionsSkeleton />
  </div>
)
