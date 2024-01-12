import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { Results, ResultsSkeleton } from './_components/results'

interface SearchPageProps {
  searchParams: {
    term?: string
  }
}

const SearchPage = ({
  searchParams
}: SearchPageProps) => {
  if (!searchParams.term) {
    redirect('/')
  }

  return (
    <div className="amx-w-screen-2xl h-full mx-auto p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  )
}

export default SearchPage
