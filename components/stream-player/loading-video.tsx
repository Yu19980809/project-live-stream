import { Loader } from 'lucide-react'

export const LoadingVideo = ({
  label
}: {
  label: string
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Loader className="w-10 h-10 text-muted-foreground animate-spin" />

      <p className="text-muted-foreground capitalize">
        {label}
      </p>
    </div>
  )
}