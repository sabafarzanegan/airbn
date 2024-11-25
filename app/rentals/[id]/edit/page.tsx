import Editform from "@/components/rentals/Editform";
import ImageContainer from "@/components/rentals/ImageContainer";
import { fetchRentalDetails, getCenter } from "@/lib/actions/formAction";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const property = await fetchRentalDetails(params.id);
  const city = await getCenter();

  const detailPropert = {
    name: property?.name,
    tagline: property?.tagline,
    category: property?.category,
    image: property?.image,
    country: property?.country,
    description: property?.description,
    price: property?.price,
    guests: property?.guests,
    bedrooms: property?.bedrooms,
    beds: property?.beds,
    baths: property?.baths,
    amenities: property?.amenities,
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">صفحه تغییر اطلاعات</h1>
      <ImageContainer image={property?.image} propertyId={property?.id} />
      <Editform city={city} property={detailPropert} id={property?.id} />
    </div>
  );
}

export default page;
