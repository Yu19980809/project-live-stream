import { Input } from "@/components/ui/input"
import { CopyButton } from "./copy-button"

export const UrlCard = ({
  value
}: {
  value: string | null
}) => {
  return (
    <div className="p-6 rounded-xl bg-muted">
      <div className="flex items-center gap-x-10">
        <p className="shrink-0 font-semibold">
          Server URL
        </p>
  
        <div className="w-full space-y-2">
          <div className="flex items-center gap-x-2 w-full">
            <Input
              disabled
              value={value || ''}
              placeholder="Server URL"
            />
  
            <CopyButton value={value || ''} />
          </div>
        </div>
      </div>
    </div>
  )
}
