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
    <>
      <h3 className="mb-2 text-lg">نظرات</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {AllReviews.map((review) => (
          <CardReview review={review} />
        ))}
      </div>
    </>
  );
}

export default ReviewContainer;
