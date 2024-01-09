import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'

const Actions = async () => {
  return (
    <div className="flex justify-end items-center gap-x-2">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-primary"
      >
        <Link href="/">
          <LogOut className="w-5 h-5 mr-2" />
          Exit
        </Link>
      </Button>

      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Actions
