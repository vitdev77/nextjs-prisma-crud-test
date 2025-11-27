import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-between gap-6 min-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="w-25 h-10" />
          <Skeleton className="w-27 h-9" />
        </div>
        <Skeleton className="w-30 h-6" />
      </div>

      <div className="min-w-4xl mx-auto space-y-2">
        <Skeleton className="w-full h-9" />
        {[1, 2].map((_, key) => (
          <Skeleton key={key} className="w-full h-10" />
        ))}
      </div>
    </div>
  );
}
