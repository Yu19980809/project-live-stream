'use client'

import { ElementRef, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { updateUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const BioModal = ({
  initialValue
}: {
  initialValue: string | null
}) => {
  const [value, setValue] = useState(initialValue || '')
  const [isPending, startTransition] = useTransition()
  const closeRef = useRef<ElementRef<'button'>>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success('User bio updated')
          closeRef.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            onChange={e => setValue(e.target.value)}
            disabled={isPending}
            value={value}
            placeholder="User bio"
            className="resize-none"
          />

          <div className="flex justify-end gap-x-2">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>

            <Button
              disabled={isPending}
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
