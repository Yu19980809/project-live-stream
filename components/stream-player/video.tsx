'use client'

import { ConnectionState, Track } from 'livekit-client'
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks
} from '@livekit/components-react'
import { OfflineVideo } from './offline-video'
import { LoadingVideo } from './loading-video'
import { LiveVideo } from './live-video'
import { Skeleton } from '../ui/skeleton'

interface VideoProps {
  hostName: string
  hostIdentity: string
}

export const Video = ({
  hostName,
  hostIdentity
}: VideoProps) => {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone
  ]).filter(track => track.participant.identity === hostIdentity)

  let content

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />
  } else {
    content = <LiveVideo participant={participant} />
  }

  return (
    <div className="border-x border-background aspect-video">
      {content}
    </div>
  )
}

export const  VideoSkeleton = () => (
  <div className="border-x border-background aspect-video">
    <Skeleton className="w-full h-full rounded-none" />
  </div>
)
