import dynamic from "next/dynamic";
import {
  fetchBookingByPropertIdUser,
  fetchPropertyDetail,
  findExistingReview,
} from "@/lib/actions/formAction";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import SingleBread from "@/components/home/SingleBread";
import FavoriteTogglebtn from "@/components/home/FavoriteTogglebtn";
import SharedBtn from "@/components/home/SharedBtn";
import Description from "@/components/home/Description";

const BookingWrapper = dynamic(
  () => import("@/components/booking/BookingWraper"),
  { ssr: false }
);
const PropertyReview = dynamic(
  () => import("@/components/Review/PropertyReview")
);
const ReviewContainer = dynamic(
  () => import("@/components/Review/ReviewContainer")
);
const PropertyDetails = dynamic(
  () => import("@/components/home/PropertyDetails")
);
const Userinfo = dynamic(() => import("@/components/home/Userinfo"));
const PropertyRating = dynamic(
  () => import("@/components/home/PropertyRating")
);

async function page({ params }: { params: { id: string } }) {
  const detailProperty = await fetchPropertyDetail(params.id);
  console.log(detailProperty?.bookings);

  let specialBooking;
  let reviewDoesNotExist;

  if (detailProperty) {
    specialBooking = await fetchBookingByPropertIdUser(detailProperty?.id);
  }

  const { userId } = auth();
  const isNotOwner = detailProperty?.profile.clerkId !== userId;

  if (detailProperty) {
    reviewDoesNotExist =
      userId &&
      isNotOwner &&
      !(await findExistingReview(userId, detailProperty?.id));
  }

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
  const bookingData = {
    propertyId: detailProperty.id,
    price: detailProperty.price,
    bookings: detailProperty.bookings,
    checkIn: specialBooking?.checkIn,
    checkOut: specialBooking?.checkOut,
    orderTotal: specialBooking?.orderTotal,
    totalNights: specialBooking?.totalNights,
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
          className="object-cover rounded"
          fill
          sizes="100vw"
          src={detailProperty.image}
        />
      </div>
      {/* calender and more detail */}
      <div className="flex items-start justify-between mt-6 flex-wrap md:flex-nowrap gap-y-16 gap-x-8 ">
        {/* calender */}
        {isNotOwner && (
          <div className="flex-1">
            <BookingWrapper {...bookingData} />
          </div>
        )}

        {/* more detail */}
        <div className="space-y-4 flex-1">
          <PropertyRating propertId={detailProperty.id} inPage={true} />
          <Userinfo profile={profile} />
          <PropertyDetails detailes={detailes} />
          <Description description={detailProperty.description} />
          {reviewDoesNotExist && (
            <PropertyReview propertyId={detailProperty.id} />
          )}
        </div>
      </div>
      <div className="mt-6">
        <ReviewContainer propertyId={detailProperty.id} />
      </div>
    </section>
  );
}

export default page;
