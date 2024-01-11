'use client'

import Image from 'next/image'
import { Pencil } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { InfoModal } from './info-modal'

interface InfoCardProps {
  hostIdentity: string
  viewerIdentity: string
  name: string
  thumbnailUrl: string | null
}

export const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  if (!isHost) return null

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="w-auto h-auto p-2 rounded-md bg-blue-600">
            <Pencil className="w-5 h-5" />
          </div>

          <div>
            <h2 className="font-semibold text-sm lg:text-lg capitalize">
              Edit your stream info
            </h2>

            <p className="tex-xs lg:text-sm text-muted-foreground">
              Maximize your visibility
            </p>
          </div>

          <InfoModal
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
          />
        </div>

        <Separator />

        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">
              Name
            </h3>

            <p className="font-semibold text-sm">
              {name}
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">
              Thumbnail
            </h3>

            {thumbnailUrl && (
              <div className="relative w-[200px] rounded-md border border-white/10 aspect-video overflow-hidden">
                <Image
                  src={thumbnailUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
