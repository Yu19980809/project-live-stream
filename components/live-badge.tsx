import { cn } from '@/lib/utils'

export const LiveBadge = ({
  className
}: {
  className?: string
}) => {
  return (
    <div className={cn(
      'p-0.5 px-1.5 rounded-md border border-background bg-rose-500 font-semibold text-center text-[10px] uppercase tracking-wide',
      className
    )}>
      Live
    </div>
  )
}
