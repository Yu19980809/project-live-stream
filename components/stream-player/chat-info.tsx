'use client'

import { useMemo } from 'react'
import { Info } from 'lucide-react'

import { Hint } from '@/components/hint'

interface ChatInfoProps {
  isDelayed: boolean
  isFollowersOnly: boolean
}

export const ChatInfo = ({
  isDelayed,
  isFollowersOnly
}: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Only followers can chat'
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Messages are delayed by 3 seconds'
    }

    if (isFollowersOnly && isDelayed) {
      return 'Only followers can chat. Messages are delayed by 3 seconds'
    }

    return ''
  }, [isDelayed, isFollowersOnly])

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Followers only'
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Slow mode'
    }

    if (isFollowersOnly && isDelayed) {
      return 'Followers only and slow mode'
    }

    return ''
  }, [isDelayed, isFollowersOnly])

  if (!isDelayed && !isFollowersOnly) return null

  return (
    <div className="flex items-center gap-x-2 w-full p-2 rounded-t-md border border-white/10 bg-white/5 text-muted-foreground">
      <Hint label={hint}>
        <Info className="w-4 h-4" />
      </Hint>

      <p className="font-semibold text-xs">
        {label}
      </p>
    </div>
  )
}
