import { PropertPropsCard } from "@/lib/Type";
import { formatAsToman } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PropertyRating from "./PropertyRating";
import FavoriteTogglebtn from "./FavoriteTogglebtn";

function PropertCard({ property }: { property: PropertPropsCard }) {
  return (
    <article className="group relative">
      <Link href={`/properties/${property.id}`}>
        <div className="relative h-[300px] overflow-hidden rounded-md">
          <Image
            src={property.image}
            fill
            sizes="(max-width:768px) 100vw,50vw"
            alt=""
            className="rounded-md object-cover transform group-hover:scale-110 transition-all duration-300"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <h3 className="text-sm font-semibold mt-1">
            {property.name.substring(0, 60)}
          </h3>
          <PropertyRating inPage={false} propertId={property.id} />
        </div>
        <p className="trxt-sm mt-1">{property.tagline.substring(0, 45)}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm mt-1 flex items-center gap-x-2">
            <span className="font-semibold">
              {formatAsToman(property.price)}
            </span>
            <span>هرشب</span>
          </p>
          <span>{property.country}</span>
        </div>
      </Link>
      <div className="absolute top-5 right-5 z-5">
        <FavoriteTogglebtn propertyId={property.id} />
      </div>
    </article>
  );
}

export default PropertCard;
