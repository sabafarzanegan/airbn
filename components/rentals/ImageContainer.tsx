import Image from "next/image";
import React from "react";
import ChangeImage from "./ChangeImage";

function ImageContainer({
  image,
  propertyId,
}: {
  image: string | undefined;
  propertyId: string | undefined;
}) {
  return (
    <>
      <div className="flex items-center justify-center mb-20 gap-x-4 flex-wrap">
        {/*image */}
        <div>
          <Image
            src={image || ""}
            alt=""
            width={400}
            height={400}
            className="w-64 h-64 rounded-md"
          />
        </div>
        {/* changeImage */}
        <ChangeImage id={propertyId} />
      </div>
    </>
  );
}

export default ImageContainer;