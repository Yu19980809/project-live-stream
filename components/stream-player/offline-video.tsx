import { WifiOff } from 'lucide-react'

export const OfflineVideo = ({
  username
}: {
  username: string
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <WifiOff className="w-10 h-10 text-muted-foreground" />

      <p className="text-muted-foreground">
        {username} is offline
      </p>
    </div>
  )
}