'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ChatToggle } from './chat-toggle'

export const ChatHeader = () => {
  return (
    <div className="relative p-3 border-b">
      <div className="hidden lg:block absolute top-2 left-2">
        <ChatToggle />
      </div>

      <p className="font-semibold text-center text-primary">
        Stream Chat
      </p>

      {/* TODO: tToggle chat community */}
    </div>
  )
}

export const ChatHeaderSkeleton = () => (
  <div className="hidden md:block relative p-3 border-b">
    <Skeleton className="absolute top-3 left-3 w-6 h-6" />
    <Skeleton className="w-28 h-6 mx-auto" />
  </div>
)
