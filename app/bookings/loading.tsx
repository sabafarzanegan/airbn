import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
    </div>
  );
}

export default loading;
