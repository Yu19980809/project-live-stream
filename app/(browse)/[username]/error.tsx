'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4 text-muted-foreground">
      <h1 className="text-4xl">404</h1>

      <p>
        Something went wrong.
      </p>

      <Button variant="secondary" asChild>
        <Link href="/">
          Go back home
        </Link>
      </Button>
    </div>
  )
}

export default ErrorPage
