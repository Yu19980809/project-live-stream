import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

const Logo = () => (
  <Link href="/">
    <div className="flex items-center gap-x-2 transition hover:opacity-75">
      <div className="shrink-0 mr-12 p-1 rounded-full bg-white lg:shrink lg:mr-0">
        <Image
          src="/spooky.svg"
          alt="Gamehub Logo"
          width={32}
          height={32}
        />
      </div>

      <div className={cn(
        'hidden lg:block',
        font.className
      )}>
        <p className="font-semibold text-xl">Gamehub</p>
      </div>
    </div>
  </Link>
)

export default Logo
