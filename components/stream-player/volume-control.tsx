'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Slider } from '@/components/ui/slider'

interface VolumeControlProps {
  value: number
  onToggle: () => void
  onChange: (value: number) => void
}

export const VolumeControl = ({
  value,
  onToggle,
  onChange
}: VolumeControlProps) => {
  const isMuted = value === 0
  const isAboveHalf = value > 50

  let Icon = Volume1

  if (isMuted) {
    Icon = VolumeX
  } else if (isAboveHalf) {
    Icon = Volume2
  }

  const label = isMuted ? 'Unmute' : 'Mute'

  const handleChange = (values: number[]) => {
    onChange(values[0])
  }

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-white hover:bg-white/10"
        >
          <Icon className="w-6 h-6" />
        </button>
      </Hint>

      <Slider
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
        className="w-[8rem] cursor-pointer"
      />
    </div>
  )
}
