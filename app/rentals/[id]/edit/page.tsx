import Editform from "@/components/rentals/Editform";
import { fetchRentalDetails, getCenter } from "@/lib/actions/formAction";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const property = await fetchRentalDetails(params.id);
  const city = await getCenter();
  console.log(property);
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
      <h1>صفحه تغییر اطلاعات</h1>
      <Editform city={city} property={detailPropert} id={property?.id} />
    </div>
  );
}

export default page;