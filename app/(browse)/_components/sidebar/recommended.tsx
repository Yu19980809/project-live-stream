'use client'

import { User } from '@prisma/client'

import { useSidebar } from '@/store/use-sidebar'
import { UserItem, UserItemSkeleton } from './user-item'

export const Recommended = ({
  data
}: {
  data: User[]
}) => {
  const {collapsed} = useSidebar()

  const showLabel = !collapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className="mb-3 pl-6">
          <p className="text-sm text-muted-foreground">
            Recommended
          </p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map(user => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => (
  <ul className="px-2">
    {[...Array(3)].map((_, i) => (
      <UserItemSkeleton key={i} />
    ))}
  </ul>
)
