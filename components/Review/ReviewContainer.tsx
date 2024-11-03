import { fetchReviewByProperty } from "@/lib/actions/formAction";
import CardReview from "./CardReview";

async function ReviewContainer({ propertyId }: { propertyId: string }) {
  const AllReviews = await fetchReviewByProperty(propertyId);

  if (!AllReviews?.length) {
    return (
      <h3 className="font-semibold text-lg">
        نظری برای این مکان ثبت نشده است شما اولین نفر باشید
      </h3>
    );
  }

  return (
    <div>
      {AllReviews.map((review) => (
        <CardReview review={review} />
      ))}
    </div>
  );
}

export default ReviewContainer;
