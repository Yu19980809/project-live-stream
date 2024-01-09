'use client'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

export const Wrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
  const {collapsed} = useCreatorSidebar()

  return (
    <aside className={cn(
      'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r border-[#2D2E35] bg-background z-50',
      collapsed && 'lg:w-[70px]'
    )}>
      {children}
    </aside>
  )
}
