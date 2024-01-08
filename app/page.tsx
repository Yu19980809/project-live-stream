import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="text-4xl">
      <UserButton afterSignOutUrl="/" />
    </main>
  )
}
