'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface NavItemProps {
  label: string
  href: string
  icon: LucideIcon,
  isActive: boolean
}

export const NavItem = ({
  label,
  href,
  icon: Icon,
  isActive
}: NavItemProps) => {
  const {collapsed} = useCreatorSidebar()

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn(
            'w-4 h-4',
            collapsed ? 'mr-0' : 'mr-2'
          )} />

          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  )
}

export const NavItemSkeleton = () => (
  <li className="flex items-center gap-x-4 px-3 py-2">
    <Skeleton className="min-w-[32px] min-h-[32px] rounded-md" />

    <div className="hidden lg:block flex-1">
      <Skeleton className="h-6" />
    </div>
  </li>
)
