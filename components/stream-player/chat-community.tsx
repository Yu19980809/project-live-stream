'use client'

import { useState } from 'react'
import { useParticipants } from '@livekit/components-react'
import { useDebounce } from 'usehooks-ts'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommunityItem } from '@/components/stream-player/community-item'

interface ChatCommunityProps {
  viewerName: string
  hostName: string
  isHidden: boolean
}

export const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden
}: ChatCommunityProps) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 500)
  const participants = useParticipants()

  const onChange = (newValue: string) => {
    setValue(newValue)
  }

  if (isHidden) {
    return (
      <div className="flex justify-center items-center flex-1">
        <p className="text-sm text-muted-foreground">
          Community is disabled
        </p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Input
        onChange={e => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />

      <ScrollArea className="mt-4 gap-y-2">
        <p className="hidden last:block p-2 text-center text-sm text-muted-foreground">
          No results
        </p>

        {participants.map(participant => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  )
}
