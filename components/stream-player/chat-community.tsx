'use client'

import { useState, useMemo } from 'react'
import { useDebounce } from 'usehooks-ts'
import { useParticipants } from '@livekit/components-react'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'

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

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`

      if (!acc.some(item => item.identity === hostAsViewer)) {
        acc.push(participant)
      }

      return acc
    }, [] as (RemoteParticipant | LocalParticipant)[])

    const filteredResult = deduped.filter(participant => {
      return participant.name?.toLowerCase().includes(
        debouncedValue.toLowerCase()
      )
    })

    return filteredResult
  }, [participants, debouncedValue])

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

        {filteredParticipants.map(participant => (
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
