import Description from "@/components/home/Description";
import FavoriteTogglebtn from "@/components/home/FavoriteTogglebtn";
import PersianCalender from "@/components/home/PersianCalenser";
import PropertyDetails from "@/components/home/PropertyDetails";
import SharedBtn from "@/components/home/SharedBtn";
import SingleBread from "@/components/home/SingleBread";
import Userinfo from "@/components/home/Userinfo";
import { fetchPropertyDetail } from "@/lib/actions/formAction";
import Image from "next/image";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  const detailProperty = await fetchPropertyDetail(params.id);

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
      <div className="flex items-start justify-between mt-6">
        {/* calender */}
        <div className="">
          <PersianCalender />
        </div>
        {/* more detail */}
        <div className="space-y-4">
          <Userinfo profile={profile} />
          <PropertyDetails detailes={detailes} />
          <Description description={detailProperty.description} />
        </div>
      </div>
    </section>
  );
}

export default page;
