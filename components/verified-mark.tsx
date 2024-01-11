import { Check } from 'lucide-react'

export const VerifiedMark = () => {
  return (
    <div className="flex justify-center items-center w-4 h-4 p-0.5 rounded-full bg-blue-600">
      <Check className="w-[10px] h-[10px] text-primary stroke-[4px]" />
    </div>
  )
}
