import { Suspense } from 'react'

import { Results, ResultsSkeleton } from './_components/results'

export default function Home() {
  return (
    <div className="max-w-screen-2xl h-full mx-auto p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  )
}
