import { Skeleton } from '@/components/skeleton'

export default function ProductLoading() {
  return (
    <div className="grid grid-cols-9 gap-12">
      <Skeleton className="col-span-6 h-[800px]" />
      <div className="flex flex-col items-start justify-center gap-4">
        <Skeleton className="h-8 w-[320px] rounded-full" />
        <Skeleton className="h-4 w-[320px] rounded-full" />
        <Skeleton className="h-4 w-[320px] rounded-full" />
        <Skeleton className="h-12 w-[320px] rounded-full" />
        <Skeleton className="h-12 w-[320px] rounded-full" />
      </div>
    </div>
  )
}
