import { notFound } from 'next/navigation'

import { getUserByUsername } from '@/lib/user-service'
import { isFollowingUser } from '@/lib/follow-service'
import { isBlockedByUser } from '@/lib/block-service'
import { Actions } from './_components/actions'

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage = async ({
  params
}: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) notFound()

  const isFollowing = await isFollowingUser(user.id)
  const isBlockedByThisUser = await isBlockedByUser(user.id)

  // if (isBlockedByThisUser) notFound()

  return (
    <div className="flex flex-col gap-y-2">
      <p>User: {user.username}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <p>isBlockedByThisUser: {`${isBlockedByThisUser}`}</p>

      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  )
}

export default UserPage
