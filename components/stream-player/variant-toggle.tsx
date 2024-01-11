'use client'

import { MessageSquare, Users } from 'lucide-react'

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'

export const VariantToggle = () => {
  const {variant, onChangeVariant} = useChatSidebar()
  const isChat = variant === ChatVariant.CHAT
  const Icon = isChat ? Users : MessageSquare
  const label = isChat ? 'Community' : 'Go back to chat'

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newVariant)
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
