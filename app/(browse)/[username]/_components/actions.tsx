'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { onFollow, onUnfollow } from '@/actions/follow'
import { onBlock, onUnblock } from '@/actions/block'
import { Button } from '@/components/ui/button'

interface ActionsProps {
  isFollowing: boolean
  userId: string
}

export const Actions = ({
  isFollowing,
  userId
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(res => toast.success(`You are now following ${res.following.username}.`))
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(res => toast.success(`You have unfollowed ${res.following.username}.`))
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then(res => toast.success(`You are now blocking ${res.blocked.username}.`))
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then(res => toast.success(`You have unblocked ${res.blocked.username}.`))
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  return (
    <>
      <Button
        onClick={onClick}
        disabled={isPending}
        variant="primary"
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    
      <Button
        onClick={handleBlock}
        disabled={isPending}
      >
        Block
      </Button>
    </>
  )
}
