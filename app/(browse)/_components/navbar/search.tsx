'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { X, SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Search = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const onClear = () => setValue('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value) return

    const url = qs.stringifyUrl({
      url: '/search',
      query: {term: value}
    }, {
      skipEmptyString: true
    })

    router.push(url)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex items-center w-full lg:w-[400px]"
    >
      <Input
        onChange={e => setValue(e.target.value)}
        value={value}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transponent focus-visible:ring-offset-0"
      />

      {value && (
        <X
          onClick={onClear}
          className="absolute top-2.5 right-14 w-5 h-5 text-muted-foreground cursor-pointer transition hover:opacity-75"
        />
      )}

      <Button
        type="submit"
        size="sm"
        variant="dime"
        className="rounded-l-none"
      >
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </Button>
    </form>
  )
}

export default Search
