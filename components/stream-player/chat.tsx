'use client'

import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ConnectionState } from 'livekit-client'
import {
  useChat,
  useConnectionState,
  useRemoteParticipant
} from '@livekit/components-react'

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { ChatHeader, ChatHeaderSkeleton } from '@/components/stream-player/chat-header'
import { ChatForm, ChatFormSkeleton } from '@/components/stream-player/chat-form'
import { ChatList, ChatListSkeleton } from '@/components/stream-player/chat-list'
import { ChatCommunity } from '@/components/stream-player/chat-community'

interface ChatProps {
  viewerName: string
  hostName: string
  hostIdentity: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}

export const Chat = ({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly
} : ChatProps) => {
  const [value, setValue] = useState('')
  const matches = useMediaQuery('(max-width: 1024px)')
  const {variant, onExpand} = useChatSidebar()
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const {send, chatMessages: messages} = useChat()

  const isOnline = participant
    && connectionState === ConnectionState.Connected

  const isHidden = !isChatEnabled || !isOnline

  useEffect(() => {
    if (matches) {
      onExpand()
    }
  }, [matches, onExpand])

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])


  const onSubmit = () => {
    if (!send) return

    send(value)
    setValue('')
  }

  const onChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] pt-0 border-l border-b bg-background">
      <ChatHeader />

      {variant === ChatVariant.CHAT && (
        <>
          <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
          />

          <ChatForm
            onSubmit={onSubmit}
            onChange={onChange}
            value={value}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  )
}

export const ChatSkeleton = () => (
  <div className="flex flex-col h-[calc(100vh-80px)] pt-0 border-l border-b border-2">
    <ChatHeaderSkeleton />
    <ChatListSkeleton />
    <ChatFormSkeleton />
  </div>
)
