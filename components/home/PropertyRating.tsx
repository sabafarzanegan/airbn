import { fetchPropertyRating } from "@/lib/actions/formAction";
import { convertToFarsi } from "@/lib/utils";
import { FaStar } from "react-icons/fa";
async function PropertyRating({
  propertId,
  inPage,
}: {
  propertId: string;
  inPage: boolean;
}) {
  const { rating, count } = await fetchPropertyRating(propertId);

  if (count === 0) return null;

  const countValue = `(${count}) ${inPage}`;
  console.log(countValue);

  return (
    <span
      className={`flex items-center gap-x-4 ${inPage ? "text-md" : "text-sm"}`}>
      <span>
        <FaStar className="w-3 h-3" />
      </span>
      <span>{convertToFarsi(Number(rating))}</span>
    </span>
  );
}

export default PropertyRating;
