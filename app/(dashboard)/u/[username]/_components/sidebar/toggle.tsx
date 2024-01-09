'use client'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

export const Toggle = () => {
  const {collapsed, onExpand, onCollapse} = useCreatorSidebar()

  const label = collapsed ? 'Expand' : 'Collpased'

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex justify-center items-center mb-4 pt-4">
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              variant="ghost"
              className="h-auto p-2"
            >
              <ArrowRightFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="hidden lg:flex items-center w-full mb-2 p-3 pl-6">
          <p className="font-semibold text-primary">Dashboard</p>

          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="h-auto ml-auto p-2"
            >
              <ArrowLeftFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
