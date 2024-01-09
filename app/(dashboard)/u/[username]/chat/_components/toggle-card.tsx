'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { updateStream } from '@/actions/stream'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
  label: string
  value: boolean
  field: FieldTypes
}

export const ToggleCard = ({
  label,
  value,
  field
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition()

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('Chat settings updated.'))
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  return (
    <div className="p-6 rounded-xl bg-muted">
      <div className="flex justify-between items-center">
        <p className="shrink-0 font-semibold">{label}</p>

        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            disabled={isPending}
            checked={value}
          >
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export const ToggleCardSkeleton = () => (
  <Skeleton className="w-full p-10 rounded-full" />
)
