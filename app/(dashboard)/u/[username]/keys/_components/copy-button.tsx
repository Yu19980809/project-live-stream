'use client'

import { useState } from 'react'
import { CheckCheck, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const CopyButton = ({
  value
}: {
  value?: string
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const Icon = isCopied ? CheckCheck : Copy

  const onCopy = () => {
    if (!value) return

    setIsCopied(true)
    navigator.clipboard.writeText(value)

    setTimeout(() => setIsCopied(false), 1000)
  }

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="w-4 h-4" />
    </Button>
  )
}
