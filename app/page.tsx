import CategoriesList from "@/components/home/CategoryList";
import LoadingCard from "@/components/home/LoadingCard";
import PropertiesContainer from "@/components/home/PropertyContainer";
import { Suspense } from "react";

function page({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <section>
      <CategoriesList
        category={searchParams?.category}
        search={searchParams?.search}
      />
      <Suspense fallback={<LoadingCard />}>
        <PropertiesContainer
          category={searchParams?.category}
          search={searchParams?.search}
        />
      </Suspense>
    </section>
  );
}

export default page;
