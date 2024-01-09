'use client'

import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'


export const Container = ({
  children
}: {
  children: React.ReactNode
}) => {
  const {collapsed, onExpand, onCollapse} = useCreatorSidebar()
  const matches = useMediaQuery(`(max-width: 1024px)`)

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches])

  return (
    <div className={cn(
      'flex-1',
      collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60'
    )}>
      {children}
    </div>
  )
}
