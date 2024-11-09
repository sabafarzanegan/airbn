import React from "react";
import { Skeleton } from "../ui/skeleton";

function LoadingAdmin() {
  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <Skeleton className="h-14 rounded-md" />
        <Skeleton className="h-14 rounded-md" />
        <Skeleton className="h-14 rounded-md" />
      </div>
      <div>
        <Skeleton className="w-full h-48" />
      </div>
    </div>
  );
}

export default LoadingAdmin;
