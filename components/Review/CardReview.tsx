import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";

export type ReviewType = {
  review: {
    rating: number;
    id: string;
    comment: string;
    profile: {
      profileImage: string;
      lastName: string;
    };
  };
};

function CardReview({ review }: ReviewType) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-x-2 flex-wrap gap-y-1">
          <Image
            src={review.profile.profileImage}
            width={40}
            height={40}
            alt=""
            className="object-cover rounded-full"
          />
          <p>{review.profile.lastName}</p>
          <Rating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="px-2">{review.comment}</p>
      </CardContent>
    </Card>
  );
}

export default CardReview;
