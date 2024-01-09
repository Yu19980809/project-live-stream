import { Skeleton } from '@/components/ui/skeleton'
import { ToggleCardSkeleton } from './_components/toggle-card'

const ChatLoading = () => {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="w-[200px] h-10" />

      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}

export default ChatLoading
