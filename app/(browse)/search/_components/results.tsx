import { getSearch } from '@/lib/search-service'
import { Skeleton } from '@/components/ui/skeleton'
import { ResultCard, ResultCardSkeleton } from './result-card'

export const Results = async ({
  term
}: {
  term?: string
}) => {
  const data = await getSearch(term)

  return (
    <div>
      <h2 className="mb-4 font-semibold text-lg">
        Results for term &quot;{term}&quot;
      </h2>

      {data.length === 0 && (
        <p className="text-muted-foreground">
          No results found. Try searching for something else.
        </p>
      )}

      <div className="flex fex-col gap-y-4">
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

    <div className="flex flex-col gap-y-4">
      {[...Array(4)].map((_, i) => (
        <ResultCardSkeleton key={i} />
      ))}
    </div>
  </div>
)
