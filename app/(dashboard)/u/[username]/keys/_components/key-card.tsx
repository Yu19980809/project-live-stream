'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { CopyButton } from './copy-button'
import { Button } from '@/components/ui/button'

export const KeyCard = ({
  value
}: {
  value: string | null
}) => {
  const [show, setShow] = useState(false)

  return (
    <div className="p-6 rounded-xl bg-muted">
      <div className="flex items-start gap-x-10">
        <p className="shrink-0 font-semibold">
          Stream Key
        </p>

        <div className="w-full space-y-2">
          <div className="flex items-center gap-x-2 w-full">
            <Input
              disabled
              type={show ? 'text' : 'password'}
              value={value || ''}
              placeholder="Stream key"
            />

            <CopyButton value={value || ''} />
          </div>

          <Button
            onClick={() => setShow(!show)}
            variant="link"
            size="sm"
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  )
}
