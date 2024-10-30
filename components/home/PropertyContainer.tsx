import { fetchProperties } from "@/lib/actions/formAction";
// import PropertiesList from "./PropertiesList";
// import EmptyList from "./EmptyList";
import type { PropertPropsCard } from "@/lib/Type";
import PropertCard from "./PropertCard";

async function PropertiesContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const properties: PropertPropsCard[] = await fetchProperties({
    category,
    search,
  });
  console.log(search);

  if (properties.length === 0) {
    return <p>موردی وجود ندارد</p>;
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {properties.map((property) => (
        <PropertCard property={property} />
      ))}
    </main>
  );
}
export default PropertiesContainer;
