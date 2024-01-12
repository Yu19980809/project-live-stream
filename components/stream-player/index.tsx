'use client'

import { LiveKitRoom } from '@livekit/components-react'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { cn } from '@/lib/utils'
import { Video, VideoSkeleton } from './video'
import { Chat, ChatSkeleton } from './chat'
import { ChatToggle } from './chat-toggle'
import { Header, HeaderSkeleton } from './header'
import { InfoCard } from './info-card'
import { AboutCard } from './about-card'

type CustomStream = {
  id: string
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
  isLive: boolean
  thumbnailUrl: string | null
  name: string
}

type CustomUser = {
  id: string
  username: string
  bio: string | null
  stream: CustomStream | null
  imageUrl: string
  _count: {followedBy: number}
}

interface StreamPlayerProps {
  user: CustomUser
  stream: CustomStream
  isFollowing: boolean
}

export const StreamPlayer = async ({
  user,
  stream,
  isFollowing
}: StreamPlayerProps) => {
  const {token, name, identity} = useViewerToken(user.id)
  const {collapsed} = useChatSidebar()

  if (!token || !name || !identity) {
    return (
      <StreamPlayerSkeleton />
    )
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}

      <LiveKitRoom
        token={token}
        serverUrl='wss://live-stream-x3m757sr.livekit.cloud'
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
        )}
      >
        <div className="col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 space-y-4 pb-10 hidden-scrollbar lg:overflow-y-auto">
          <Video
            hostName={user.username}
            hostIdentity={user.id}
          />

          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />

          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />

          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>

        <div className={cn(
          'cols-span-1',
          collapsed && 'hidden'
        )}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export const StreamPlayerSkeleton = () => (
  <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
    <div className="col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 space-y-4 pb-10 hidden-scrollbar lg:overflow-y-auto">
      <VideoSkeleton />
      <HeaderSkeleton />
    </div>

    <div className="col-span-1 bg-background">
      <ChatSkeleton />
    </div>
  </div>
)