'use client'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'

const Wrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
  const {collapsed} = useSidebar()

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
