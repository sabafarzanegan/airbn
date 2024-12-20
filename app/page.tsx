import CategoriesList from "@/components/home/CategoryList";
import LoadingCard from "@/components/home/LoadingCard";
import PropertiesContainer from "@/components/home/PropertyContainer";
import NavSearch from "@/components/navbar/NavSearch";
import { Suspense } from "react";

function page({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <section>
      <NavSearch />
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
