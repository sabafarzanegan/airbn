import { convertToFarsi } from "@/lib/utils";
import { FaStar } from "react-icons/fa";
function PropertyRating({
  propertId,
  inPage,
}: {
  propertId: string;
  inPage: boolean;
}) {
  const rating = 4.7;
  return (
    <span className={`flex items-center ${inPage ? "text-md" : "text-sm"}`}>
      <FaStar className="w-3 h-3" />

      {convertToFarsi(rating)}
    </span>
  );
}

export default PropertyRating;
