'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'

import { cn } from '@/lib/utils'
import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface ActionsProps {
  hostIdentity: string
  isFollowing: boolean
  isHost: boolean
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const {userId} = useAuth()

  const toggleFollow = () => {
    if (!userId) return router.push('/sign-in')
    if (isHost) return

    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then(data => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then(data => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <Button
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart className={cn(
        'w-4 h-4 mr-2',
        isFollowing ? 'fill-white' : 'fill-none'
      )} />

      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export const ActionsSkeleton = () => (
  <Skeleton className="w-full h-10 lg:w-24" />
)
