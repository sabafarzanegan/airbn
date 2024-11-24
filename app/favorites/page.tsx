import PropertCard from "@/components/home/PropertCard";
import { fetchFavorites } from "@/lib/actions/formAction";

async function page() {
  const favorites = await fetchFavorites();
  if (favorites.length === 0) {
    return <h3>موردی وجود ندارد</h3>;
  }

  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold tracking-wide text-gray-600">
        مورد پسندهای شما
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {favorites?.map((item) => (
          <PropertCard property={item} />
        ))}
      </div>
    </main>
  );
}

export default page;
