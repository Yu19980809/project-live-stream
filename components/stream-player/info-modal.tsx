'use client'

import {
  ElementRef,
  useRef,
  useState,
  useTransition
} from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'

import { UploadDropzone } from '@/lib/uploadthing'
import { updateStream } from '@/actions/stream'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Hint } from '@/components/hint'
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

interface InfoCardProps {
  initialName: string
  initialThumbnailUrl: string | null
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl
}: InfoCardProps) => {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState(initialName)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success('Stream updated')
          closeRef?.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed')
          setThumbnailUrl('')
          closeRef?.current?.click()
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
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>

            <Input
              onChange={e => setName(e.target.value)}
              disabled={isPending}
              value={name}
              placeholder="Stream name"
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>

            {thumbnailUrl ? (
              <div className="relative rounded-xl border border-white/10 aspect-video overflow-hidden">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" side="left" asChild>
                    <Button
                      onClick={onRemove}
                      type="button"
                      disabled={isPending}
                      className="w-auto h-auto p-1.5"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </Hint>
                </div>

                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {color: '#FFF'},
                    allowedContent: {color: '#FFF'}
                  }}
                  onClientUploadComplete={res => {
                    setThumbnailUrl(res?.[0]?.url)
                    router.refresh()
                    closeRef?.current?.click()
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-x-2">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isPending}
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
