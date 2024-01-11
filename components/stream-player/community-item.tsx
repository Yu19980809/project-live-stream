'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { MinusCircle } from 'lucide-react'

import { cn, stringToColor } from '@/lib/utils'
import { onBlock } from '@/actions/block'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'

interface CommunityItemProps {
  hostName: string
  viewerName: string
  participantIdentity: string
  participantName?: string
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition()
  const color = stringToColor(participantName || '')
  const isSelf = participantName === viewerName
  const isHost = viewerName === hostName

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error('Somrthing went wrong'))
    })
  }

  return (
    <div className={cn(
      'group flex justify-between items-center w-full p-2 rounded-md text-sm hover:bg-white/5',
      isPending && 'opacity-50 pointer-events-none'
    )}>
      <p style={{ color }}>
        {participantName}
      </p>

      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            onClick={handleBlock}
            disabled={isPending}
            variant="ghost"
            className="w-auto h-auto p-1 opacity-0 group-hover:opacity-100"
          >
            <MinusCircle className="w-4 h-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  )
}
