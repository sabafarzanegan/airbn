import Deletbtn from "@/components/Review/Deletbtn";
import Rating from "@/components/Review/Rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchReviewByuser } from "@/lib/actions/formAction";
import { Trash } from "lucide-react";
import Image from "next/image";

async function page() {
  const reviews = await fetchReviewByuser();
  console.log(reviews);
  if (!reviews?.length) {
    return (
      <h1 className="font-semibold text-xl text-center">شما نظری ندادید</h1>
    );
  }

  return (
    <div>
      {reviews.map((review) => (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap">
              <div>
                <Image
                  src={review.property.image}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-lg w-24"
                />
              </div>
              <span>{review.property.name.substring(0, 40)}...</span>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <Rating rating={review.rating} />
              <p className="mt-4">{review.comment}</p>
            </div>
            <Deletbtn id={review.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default page;
