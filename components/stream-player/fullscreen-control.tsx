'use client'

import { Maximize, Minimize } from 'lucide-react'

import { Hint } from '@/components/hint'

interface FullScreenControlProps {
  isFullScreen: boolean
  onToggle: () => void
}

export const FullScreenControl = ({
  isFullScreen,
  onToggle
}: FullScreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize
  const label = isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'

  return (
    <div className="flex justify-center itemscenter gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-white hover:bg-white/10"
        >
          <Icon className="w-5 h-5" />
        </button>
      </Hint>
    </div>
  )
}
