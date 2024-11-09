import { deletRental } from "@/lib/actions/formAction";
import DeletRentalbtn from "./DeletRentalbtn";

function Formaction({ propertyId }: { propertyId: string }) {
  const deletHandler = deletRental.bind(null, {
    propertyId,
  });
  return (
    <form action={deletHandler}>
      <DeletRentalbtn />
    </form>
  );
}

export default Formaction;
