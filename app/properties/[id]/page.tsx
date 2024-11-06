import BookingWraper from "@/components/booking/BookingWraper";
import Description from "@/components/home/Description";
import FavoriteTogglebtn from "@/components/home/FavoriteTogglebtn";

import PropertyDetails from "@/components/home/PropertyDetails";
import PropertyRating from "@/components/home/PropertyRating";
import SharedBtn from "@/components/home/SharedBtn";
import SingleBread from "@/components/home/SingleBread";
import Userinfo from "@/components/home/Userinfo";
import PropertyReview from "@/components/Review/PropertyReview";
import ReviewContainer from "@/components/Review/ReviewContainer";
import {
  fetchBookingByPropertIdUser,
  fetchPropertyDetail,
} from "@/lib/actions/formAction";
import Image from "next/image";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  const detailProperty = await fetchPropertyDetail(params.id);

  const specialBooking = await fetchBookingByPropertIdUser(detailProperty?.id);
  console.log(specialBooking);

  if (!detailProperty) redirect("/");
  const detailes = {
    guests: detailProperty.guests,
    bedrooms: detailProperty.bedrooms,
    beds: detailProperty.beds,
    baths: detailProperty.baths,
  };
  const profile = {
    profileImage: detailProperty.profile.profileImage,
    name: detailProperty.profile.firstName,
    lastName: detailProperty.profile.lastName,
  };
  return (
    <section>
      {/* Bread crumbs */}
      <SingleBread name={detailProperty.name} />
      <div className="flex items-center justify-between mt-4">
        {/* tagline */}
        <div className="flex items-center justify-between gap-x-4">
          <p>{detailProperty.tagline}</p>
          <div>
            <SharedBtn
              name={detailProperty.name}
              propertyId={detailProperty.id}
            />
          </div>
        </div>
        {/* toggle favorite btn */}
        <FavoriteTogglebtn propertyId={detailProperty.id} />
      </div>
      {/* image container */}
      <div className=" h-[300px] md:h-[500px] relative mt-8">
        <Image
          alt=""
          priority
          className="object-cover rounded"
          fill
          sizes="100vw"
          src={detailProperty.image}
        />
      </div>
      {/* calender and more detail */}
      <div className="flex items-start justify-between mt-6 flex-wrap md:flex-nowrap gap-y-16 gap-x-8 ">
        {/* calender */}
        <div className="flex-1">
          <BookingWraper
            propertyId={detailProperty.id}
            price={detailProperty.price}
            bookings={detailProperty.bookings}
            checkIn={specialBooking?.checkIn}
            checkOut={specialBooking?.checkOut}
            orderTotal={specialBooking?.orderTotal}
            totalNights={specialBooking?.totalNights}
          />
        </div>
        {/* more detail */}
        <div className="space-y-4 flex-1">
          {/* <PropertyRating propertId={detailProperty.id} inPage={true} /> */}
          <Userinfo profile={profile} />
          <PropertyDetails detailes={detailes} />
          <Description description={detailProperty.description} />
          <PropertyReview propertyId={detailProperty.id} />
        </div>
      </div>
      <div className="mt-6">
        <ReviewContainer propertyId={detailProperty.id} />
      </div>
    </section>
  );
}

export default page;
