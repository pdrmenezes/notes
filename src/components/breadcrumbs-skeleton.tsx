import { ChevronRight } from "lucide-react";

export function BreadCrumbsSkeleton() {
  return (
    <div className="flex w-full items-center gap-2 border-b border-b-neutral-700 pb-4 font-mono text-neutral-500">
      <div className="h-6 w-16 animate-pulse rounded bg-neutral-800" />
      <ChevronRight className="size-4 shrink-0 text-neutral-700" />
      <div className="h-6 w-24 animate-pulse rounded bg-neutral-800" />
    </div>
  );
}
