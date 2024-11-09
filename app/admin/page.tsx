import ChartContainer from "@/components/admin/ChartContainer";
import LoadingAdmin from "@/components/admin/LoadingAdmin";
import StatsContainer from "@/components/admin/StatsContainer";
import React, { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense fallback={<LoadingAdmin />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<LoadingAdmin />}>
        <ChartContainer />
      </Suspense>
    </>
  );
}

export default page;
