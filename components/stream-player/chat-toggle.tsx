'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { useChatSidebar } from '@/store/use-chat-sidebar'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'

export const ChatToggle = () => {
  const {collapsed, onExpand, onCollapse} = useChatSidebar()
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine
  const label = collapsed ? 'Expand' : 'Collapse'

  const onToggle = () => {
    if (collapsed) {
      onExpand()
    } else {
      onCollapse()
    }
  }

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 bg-transparent hover:bg-white/10 hover:text-primary"
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  )
}
