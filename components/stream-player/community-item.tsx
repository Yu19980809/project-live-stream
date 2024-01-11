'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { MinusCircle } from 'lucide-react'

import { cn, stringToColor } from '@/lib/utils'

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
  return (
    <div>
      {participantName}
    </div>
  )
}
