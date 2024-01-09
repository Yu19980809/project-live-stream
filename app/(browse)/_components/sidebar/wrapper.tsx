'use client'

import { useIsClient } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { ToggleSkeleton } from './toggle'
import { RecommendedSkeleton } from './recommended'
import { FollowingSkeleton } from './following'

const Wrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
  const isClient = useIsClient()
  const {collapsed} = useSidebar()

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r border-[#2D2E35] bg-background z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside className={cn(
      'fixed left-0 flex flex-col w-60 h-full border-r border-[#2D2E35] bg-background z-50',
      collapsed && 'w-[70px]'
    )}>
      {children}
    </aside>
  )
}

export default Wrapper
