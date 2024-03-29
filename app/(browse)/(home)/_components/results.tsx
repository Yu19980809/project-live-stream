import { Skeleton } from '@/components/ui/skeleton'
import { getStreams } from '@/lib/feed-service'
import { ResultCard, ResultCardSkeleton } from './result-card'

export const Results = async () => {
  const data = await getStreams()

  return (
    <div>
      <h2 className="mb-4 font-semibold text-lg">
        Streams we think you&apos;ll like
      </h2>

      {data.length === 0 && (
        <div className="text-sm text-muted-foreground">
          No streams found.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map(item => (
          <ResultCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export const ResultsSkeleton = () => (
  <div>
    <Skeleton className="w-[290px] h-8 mb-4" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {[...Array(4)].map((_, i) => (
        <ResultCardSkeleton key={i} />
      ))}
    </div>
  </div>
)
