import { ReceivedChatMessage } from '@livekit/components-react'

import { ChatMessage } from '@/components/stream-player/chat-message'
import { Skeleton } from '@/components/ui/skeleton'

interface ChatListProps {
  messages: ReceivedChatMessage[]
  isHidden: boolean
}

export const ChatList = ({
  messages,
  isHidden
}: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? 'Chat is disabled' : 'Welcome to the chat'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col-reverse flex-1 h-full p-3 overflow-y-auto">
      {messages.map(message => (
        <ChatMessage
          key={message.timestamp}
          data={message}
        />
      ))}
    </div>
  )
}

export const ChatListSkeleton = () => (
  <div className="flex justify-center items-center h-full">
    <Skeleton className="w-1/2 h-6" />
  </div>
)
