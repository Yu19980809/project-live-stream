import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

const Logo = () => (
  <div className="flex flex-col items-center gap-y-4">
    <div className="p-1 rounded-full bg-white">
      <Image
        src="/spooky.svg"
        alt="Gamehub Logo"
        width={80}
        height={80}
      />
    </div>

    <div className={cn(
      'flex flex-col items-center',
      font.className
    )}>
      <p className="font-semibold text-xl">Gamehub</p>
      <p className="text-sm text-muted-foreground">Let&apos;s play</p>
    </div>
  </div>
)

export default Logo
